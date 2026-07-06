import { NextRequest, NextResponse } from "next/server";
import { clearAdminCookie } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(_request: NextRequest) {
  const response = NextResponse.json({ ok: true });
  clearAdminCookie(response);

  return response;
}
