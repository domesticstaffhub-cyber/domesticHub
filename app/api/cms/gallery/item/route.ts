import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { deleteGalleryItem, updateGalleryItem } from "@/lib/gallery";
import { sanitizeText } from "@/lib/validation";

export const runtime = "nodejs";

function isValidId(id: string) {
  return /^[\w-]{8,}$/.test(id);
}

async function readPayload(request: NextRequest) {
  try {
    return (await request.json()) as { id?: string; title?: string; category?: string };
  } catch {
    return null;
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const payload = await readPayload(request);
  const id = sanitizeText(payload?.id || "");

  if (!isValidId(id)) {
    return NextResponse.json({ ok: false, message: "Invalid gallery item." }, { status: 400 });
  }

  try {
    const result = await deleteGalleryItem(id);

    if (!result.configured) {
      return NextResponse.json(
        { ok: false, message: "Gallery CMS needs Firebase database settings before it can be used." },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("CMS gallery delete failed", error);
    return NextResponse.json({ ok: false, message: "Unable to delete gallery image." }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const payload = await readPayload(request);
  const id = sanitizeText(payload?.id || "");
  const title = sanitizeText(payload?.title || "");
  const category = sanitizeText(payload?.category || "");

  if (!isValidId(id)) {
    return NextResponse.json({ ok: false, message: "Invalid gallery item." }, { status: 400 });
  }

  if (title.length < 2 || title.length > 80) {
    return NextResponse.json({ ok: false, message: "Enter a short gallery title." }, { status: 400 });
  }

  if (category.length < 2 || category.length > 40) {
    return NextResponse.json({ ok: false, message: "Enter a short gallery category." }, { status: 400 });
  }

  try {
    const result = await updateGalleryItem(id, { title, category });

    if (!result.configured || !result.item) {
      return NextResponse.json(
        { ok: false, message: "Gallery CMS needs Firebase database settings before it can be used." },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true, item: result.item });
  } catch (error) {
    console.error("CMS gallery update failed", error);
    return NextResponse.json({ ok: false, message: "Unable to update gallery image." }, { status: 500 });
  }
}
