import { NextRequest, NextResponse } from "next/server";
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
    serviceType: parsed.data.serviceType,
    serviceLabel: category?.label || parsed.data.serviceType,
    ip
  };

  try {
    const saved = await saveLead("jobApplications", data);

    return NextResponse.json({
      ok: true,
      demo: !saved.configured,
      message: saved.configured
        ? "Details received. Please continue on WhatsApp."
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
