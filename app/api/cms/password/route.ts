import { NextRequest, NextResponse } from "next/server";
import { changeAdminPassword, isAdminRequest, setAdminCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  let payload: { currentPassword?: string; nextPassword?: string };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const currentPassword = String(payload.currentPassword || "");
  const nextPassword = String(payload.nextPassword || "");

  if (nextPassword.length < 10) {
    return NextResponse.json({ ok: false, message: "New password must be at least 10 characters." }, { status: 400 });
  }

  if (nextPassword === currentPassword) {
    return NextResponse.json({ ok: false, message: "Choose a different new password." }, { status: 400 });
  }

  const result = await changeAdminPassword(currentPassword, nextPassword);

  if (!result.ok) {
    return NextResponse.json({ ok: false, message: result.message }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true, message: "Password changed. The default password no longer works." });
  setAdminCookie(response);

  return response;
}
