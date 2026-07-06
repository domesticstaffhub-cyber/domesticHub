import { DocumentSnapshot, FieldValue, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";

export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  imageData: string;
  createdAt?: number;
};

type GalleryInput = {
  title: string;
  category: string;
  imageData: string;
};

type GalleryUpdateInput = {
  title: string;
  category: string;
};

const collectionName = "galleryItems";

function toMillis(value: unknown) {
  if (value && typeof value === "object" && "toMillis" in value && typeof value.toMillis === "function") {
    return value.toMillis();
  }

  return undefined;
}

function mapGalleryDoc(doc: QueryDocumentSnapshot | DocumentSnapshot): GalleryItem {
  const data = doc.data() as Partial<GalleryItem> & { createdAt?: unknown };

  return {
    id: doc.id,
    title: data.title || "Gallery photo",
    category: data.category || "Gallery",
    imageData: data.imageData || "",
    createdAt: toMillis(data.createdAt)
  };
}

export async function listGalleryItems(limit = 24) {
  const db = getAdminDb();

  if (!db) {
    return { configured: false, items: [] as GalleryItem[] };
  }

  const snapshot = await db
    .collection(collectionName)
    .orderBy("createdAt", "desc")
    .limit(Math.min(Math.max(limit, 1), 60))
    .get();

  return {
    configured: true,
    items: snapshot.docs.map(mapGalleryDoc).filter((item) => Boolean(item.imageData))
  };
}

export async function addGalleryItem(input: GalleryInput) {
  const db = getAdminDb();

  if (!db) {
    return { configured: false, item: null };
  }

  const doc = await db.collection(collectionName).add({
    title: input.title,
    category: input.category,
    imageData: input.imageData,
    createdAt: FieldValue.serverTimestamp()
  });
  const snapshot = await doc.get();

  return { configured: true, item: mapGalleryDoc(snapshot) };
}

export async function deleteGalleryItem(id: string) {
  const db = getAdminDb();

  if (!db) {
    return { configured: false };
  }

  await db.collection(collectionName).doc(id).delete();

  return { configured: true };
}

export async function updateGalleryItem(id: string, input: GalleryUpdateInput) {
  const db = getAdminDb();

  if (!db) {
    return { configured: false, item: null };
  }

  const ref = db.collection(collectionName).doc(id);
  await ref.set(
    {
      title: input.title,
      category: input.category,
      updatedAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );
  const snapshot = await ref.get();

  return { configured: true, item: mapGalleryDoc(snapshot) };
}
