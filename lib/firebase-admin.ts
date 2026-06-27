import { cert, getApps, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

export function isFirebaseConfigured() {
  return Boolean(projectId && clientEmail && privateKey);
}

export function getAdminDb() {
  if (!isFirebaseConfigured()) {
    return null;
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey
      })
    });
  }

  return getFirestore();
}

export async function saveLead(collection: "serviceRequests" | "jobApplications", data: Record<string, unknown>) {
  const db = getAdminDb();

  if (!db) {
    return { id: "demo-mode", configured: false };
  }

  const doc = await db.collection(collection).add({
    ...data,
    status: "new",
    createdAt: FieldValue.serverTimestamp(),
    source: "website"
  });

  return { id: doc.id, configured: true };
}
