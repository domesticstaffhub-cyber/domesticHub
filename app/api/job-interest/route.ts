import { NextRequest, NextResponse } from "next/server";
import { contact, createWhatsAppLink, isDemoValue } from "@/lib/contact";
import { sendNotificationEmail } from "@/lib/email";
import { saveLead } from "@/lib/firebase-admin";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { seekerCategories } from "@/lib/services";
import { jobInterestSchema, flattenZodErrors, sanitizeText } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(`job:${ip}`)) {
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

  const parsed = jobInterestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", errors: flattenZodErrors(parsed.error) },
      { status: 400 }
    );
  }

  const category = seekerCategories.find((item) => item.value === parsed.data.serviceType);
  const data = {
    name: sanitizeText(parsed.data.name),
    email: sanitizeText(parsed.data.email).toLowerCase(),
    phone: sanitizeText(parsed.data.phone),
    serviceType: parsed.data.serviceType,
    serviceLabel: category?.label || parsed.data.serviceType,
    experience: sanitizeText(parsed.data.experience),
    ip
  };

  try {
    const saved = await saveLead("jobApplications", data);

    if (saved.configured) {
      await sendNotificationEmail({
        subject: `New work interest: ${data.serviceLabel}`,
        text: [
          "A potential staff member submitted interest.",
          "",
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          `Work Category: ${data.serviceLabel}`,
          `Experience: ${data.experience || "Not provided"}`,
          `Lead ID: ${saved.id}`
        ].join("\n")
      });
    }

    const whatsappMessage = `Hello, my name is ${data.name}. I am interested in working with Domestic Staffing Hub under ${data.serviceLabel}. My email is ${data.email} and my phone number is ${data.phone}.`;

    return NextResponse.json({
      ok: true,
      demo: !saved.configured || isDemoValue(contact.whatsappNumber),
      whatsappUrl: createWhatsAppLink(contact.whatsappNumber, whatsappMessage),
      message: saved.configured
        ? "Details received. Continue to WhatsApp to complete the work interest conversation."
        : "Demo mode: details validated, but Firestore is not configured yet."
    });
  } catch (error) {
    console.error("Job interest failed", error);
    return NextResponse.json(
      { ok: false, message: "We could not submit your details right now. Please try again." },
      { status: 500 }
    );
  }
}
