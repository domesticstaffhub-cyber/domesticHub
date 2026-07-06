import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin, setAdminCookie } from "@/lib/admin-auth";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(`cms-login:${ip}`)) {
    return NextResponse.json({ ok: false, message: "Too many attempts. Please wait and try again." }, { status: 429 });
  }

  let payload: { username?: string; password?: string };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const result = await authenticateAdmin(String(payload.username || ""), String(payload.password || ""));

  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  setAdminCookie(response);

  return response;
}
