import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { addGalleryItem, listGalleryItems } from "@/lib/gallery";
import { sanitizeText } from "@/lib/validation";

export const runtime = "nodejs";

const maxImageDataLength = 850_000;

function isValidImageData(value: string) {
  return /^data:image\/(jpeg|jpg|png|webp);base64,/.test(value) && value.length <= maxImageDataLength;
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const result = await listGalleryItems(60);

    return NextResponse.json({
      ok: result.configured,
      configured: result.configured,
      items: result.items,
      message: result.configured ? "" : "Gallery CMS needs Firebase database settings before it can be used."
    });
  } catch (error) {
    console.error("CMS gallery list failed", error);
    return NextResponse.json({ ok: false, message: "Unable to load gallery." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  let payload: { title?: string; category?: string; imageData?: string };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const title = sanitizeText(payload.title || "");
  const category = sanitizeText(payload.category || "");
  const imageData = String(payload.imageData || "");

  if (title.length < 2 || title.length > 80) {
    return NextResponse.json({ ok: false, message: "Enter a short gallery title." }, { status: 400 });
  }

  if (category.length < 2 || category.length > 40) {
    return NextResponse.json({ ok: false, message: "Enter a short gallery category." }, { status: 400 });
  }

  if (!isValidImageData(imageData)) {
    return NextResponse.json({ ok: false, message: "Upload a compressed JPG, PNG, or WebP image under 850KB." }, { status: 400 });
  }

  try {
    const result = await addGalleryItem({ title, category, imageData });

    if (!result.configured || !result.item) {
      return NextResponse.json(
        { ok: false, message: "Gallery CMS needs Firebase database settings before it can be used." },
        { status: 503 }
      );
    }

    return NextResponse.json({ ok: true, item: result.item });
  } catch (error) {
    console.error("CMS gallery add failed", error);
    return NextResponse.json({ ok: false, message: "Unable to add gallery image." }, { status: 500 });
  }
}
