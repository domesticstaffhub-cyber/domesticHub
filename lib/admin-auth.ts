import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

const ADMIN_DOC_ID = "primaryAdmin";
const ADMIN_COLLECTION = "adminSettings";
const SESSION_HOURS = 8;

export const adminRoute = "/admin-center";
export const adminCookieName = "dsh_admin_session";
export const defaultAdminUsername = process.env.ADMIN_DEFAULT_USERNAME || "Admin";
export const defaultAdminPassword = process.env.ADMIN_DEFAULT_PASSWORD || "DomStaffHub!2026";

type AdminRecord = {
  username?: string;
  passwordHash?: string;
  passwordSalt?: string;
};

type SessionPayload = {
  username: string;
  exp: number;
};

function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}

function getSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET || "domestic-staffing-hub-local-session-secret";
}

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex");
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function verifyPassword(password: string, record: AdminRecord) {
  if (!record.passwordHash || !record.passwordSalt) {
    return false;
  }

  return safeCompare(hashPassword(password, record.passwordSalt), record.passwordHash);
}

function createPasswordRecord(password: string) {
  const passwordSalt = randomBytes(16).toString("hex");

  return {
    passwordHash: hashPassword(password, passwordSalt),
    passwordSalt
  };
}

async function getAdminRef() {
  const db = getAdminDb();

  if (!db) {
    return null;
  }

  return db.collection(ADMIN_COLLECTION).doc(ADMIN_DOC_ID);
}

export async function authenticateAdmin(username: string, password: string) {
  if (normalizeUsername(username) !== normalizeUsername(defaultAdminUsername)) {
    return { ok: false, message: "Invalid username or password." };
  }

  const adminRef = await getAdminRef();

  if (!adminRef) {
    return { ok: false, message: "Admin CMS needs Firebase database settings before it can be used." };
  }

  const snapshot = await adminRef.get();

  if (!snapshot.exists) {
    if (password !== defaultAdminPassword) {
      return { ok: false, message: "Invalid username or password." };
    }

    await adminRef.set({
      username: defaultAdminUsername,
      ...createPasswordRecord(defaultAdminPassword),
      usingDefaultPassword: true,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp()
    });

    return { ok: true };
  }

  const record = snapshot.data() as AdminRecord;

  if (normalizeUsername(record.username || "") !== normalizeUsername(defaultAdminUsername)) {
    return { ok: false, message: "Invalid username or password." };
  }

  if (!verifyPassword(password, record)) {
    return { ok: false, message: "Invalid username or password." };
  }

  return { ok: true };
}

export async function changeAdminPassword(currentPassword: string, nextPassword: string) {
  const adminRef = await getAdminRef();

  if (!adminRef) {
    return { ok: false, message: "Admin CMS needs Firebase database settings before it can be used." };
  }

  const snapshot = await adminRef.get();

  if (!snapshot.exists) {
    return { ok: false, message: "Login once with the default password before changing it." };
  }

  const record = snapshot.data() as AdminRecord;

  if (!verifyPassword(currentPassword, record)) {
    return { ok: false, message: "Current password is incorrect." };
  }

  await adminRef.set(
    {
      username: defaultAdminUsername,
      ...createPasswordRecord(nextPassword),
      usingDefaultPassword: false,
      updatedAt: FieldValue.serverTimestamp()
    },
    { merge: true }
  );

  return { ok: true };
}

export function createAdminSession() {
  const payload: SessionPayload = {
    username: defaultAdminUsername,
    exp: Date.now() + SESSION_HOURS * 60 * 60 * 1000
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signature = createHmac("sha256", getSessionSecret()).update(encodedPayload).digest("base64url");

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSession(token?: string) {
  if (!token) {
    return false;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return false;
  }

  const expectedSignature = createHmac("sha256", getSessionSecret()).update(encodedPayload).digest("base64url");

  if (!safeCompare(signature, expectedSignature)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as SessionPayload;

    return normalizeUsername(payload.username || "") === normalizeUsername(defaultAdminUsername) && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export function isAdminRequest(request: NextRequest) {
  return verifyAdminSession(request.cookies.get(adminCookieName)?.value);
}

export function setAdminCookie(response: NextResponse) {
  response.cookies.set(adminCookieName, createAdminSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_HOURS * 60 * 60
  });
}

export function clearAdminCookie(response: NextResponse) {
  response.cookies.set(adminCookieName, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
}
