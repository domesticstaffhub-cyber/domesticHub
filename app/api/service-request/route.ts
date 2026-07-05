import { NextRequest, NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/email";
import { buildNotificationEmail } from "@/lib/email-template";
import { saveLead } from "@/lib/firebase-admin";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { serviceOptions } from "@/lib/services";
import { serviceRequestSchema, flattenZodErrors, sanitizeText } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(`service:${ip}`)) {
    return NextResponse.json(
      { ok: false, message: "Too many requests. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = serviceRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", errors: flattenZodErrors(parsed.error) },
      { status: 400 }
    );
  }

  const service = serviceOptions.find((item) => item.value === parsed.data.serviceType);
  const data = {
    name: sanitizeText(parsed.data.name),
    email: sanitizeText(parsed.data.email).toLowerCase(),
    phone: sanitizeText(parsed.data.phone),
    serviceType: parsed.data.serviceType,
    serviceLabel: service?.label || parsed.data.serviceType,
    message: sanitizeText(parsed.data.message),
    ip
  };

  try {
    const saved = await saveLead("serviceRequests", data);
    let emailSent = false;

    try {
      const email = await sendNotificationEmail({
        subject: `New service request: ${data.serviceLabel}`,
        replyTo: data.email,
        html: buildNotificationEmail({
          eyebrow: "Service request",
          title: `New service request: ${data.serviceLabel}`,
          intro: "A new customer request has been submitted from the website. Review the details below and follow up with the client.",
          summaryLabel: "Service needed",
          summaryValue: data.serviceLabel,
          replyEmail: data.email,
          phone: data.phone,
          leadId: saved.id,
          details: [
            { label: "Name", value: data.name },
            { label: "Email", value: data.email },
            { label: "Phone", value: data.phone || "Not provided" },
            { label: "Service", value: data.serviceLabel }
          ],
          message: data.message || "Not provided"
        }),
        text: [
          "A new customer service request was submitted.",
          "",
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone || "Not provided"}`,
          `Service: ${data.serviceLabel}`,
          `Message: ${data.message || "Not provided"}`,
          `Lead ID: ${saved.id}`
        ].join("\n")
      });
      emailSent = email.sent;
    } catch (emailError) {
      console.error("Service request email notification failed", emailError);
    }

    const liveDelivery = saved.configured || emailSent;

    return NextResponse.json({
      ok: true,
      demo: !liveDelivery,
      message: liveDelivery
        ? "Request received. Our team will contact you shortly."
        : "Demo mode: request checked successfully. Add live contact settings before launch."
    });
  } catch (error) {
    console.error("Service request failed", error);
    return NextResponse.json(
      { ok: false, message: "We could not submit your request right now. Please try again." },
      { status: 500 }
    );
  }
}
