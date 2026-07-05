import { NextRequest, NextResponse } from "next/server";
import { sendNotificationEmail } from "@/lib/email";
import { buildNotificationEmail } from "@/lib/email-template";
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
    email: sanitizeText(parsed.data.email) || "Not provided",
    phone: sanitizeText(parsed.data.phone) || "Not provided",
    serviceType: parsed.data.serviceType,
    serviceLabel: category?.label || parsed.data.serviceType,
    experience: sanitizeText(parsed.data.experience),
    ip
  };

  try {
    const saved = await saveLead("jobApplications", data);

    if (saved.configured) {
      try {
        await sendNotificationEmail({
          subject: `New work interest: ${data.serviceLabel}`,
          html: buildNotificationEmail({
            eyebrow: "Work interest",
            title: `New work interest: ${data.serviceLabel}`,
            intro: "A potential staff member submitted interest from the website. Review the profile below and continue the screening process.",
            summaryLabel: "Work category",
            summaryValue: data.serviceLabel,
            details: [
              { label: "Name", value: data.name },
              { label: "Email", value: data.email },
              { label: "Phone", value: data.phone },
              { label: "Category", value: data.serviceLabel }
            ],
            message: data.experience || "Not provided"
          }),
          text: [
            "A potential staff member submitted interest.",
            "",
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Phone: ${data.phone}`,
            `Work Category: ${data.serviceLabel}`,
            `Experience: ${data.experience || "Not provided"}`
          ].join("\n")
        });
      } catch (emailError) {
        console.error("Job interest email notification failed", emailError);
      }
    }

    return NextResponse.json({
      ok: true,
      demo: !saved.configured,
      message: saved.configured
        ? "Details received. Thank you."
        : "Demo mode: details checked successfully. Add live database settings before launch."
    });
  } catch (error) {
    console.error("Job interest failed", error);
    return NextResponse.json(
      { ok: false, message: "We could not submit your details right now. Please try again." },
      { status: 500 }
    );
  }
}
