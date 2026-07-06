import { NextRequest, NextResponse } from "next/server";
import { listGalleryItems } from "@/lib/gallery";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const limitParam = Number(request.nextUrl.searchParams.get("limit") || "12");
  const limit = Number.isFinite(limitParam) ? limitParam : 12;

  try {
    const result = await listGalleryItems(limit);

    return NextResponse.json({
      ok: true,
      configured: result.configured,
      items: result.items
    });
  } catch (error) {
    console.error("Public gallery list failed", error);
    return NextResponse.json({ ok: true, configured: false, items: [] });
  }
}
