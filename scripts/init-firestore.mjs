import admin from "firebase-admin";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  console.error(
    "Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, or FIREBASE_PRIVATE_KEY. Fill .env or set the variables before running npm run db:init."
  );
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey
    })
  });
}

const db = admin.firestore();
const now = admin.firestore.FieldValue.serverTimestamp();

const setupDocs = [
  {
    ref: db.collection("serviceRequests").doc("_schema"),
    data: {
      collection: "serviceRequests",
      purpose: "Customer service requests from the website.",
      fields: ["name", "email", "phone", "serviceType", "message", "status", "createdAt", "source"],
      status: "schema",
      createdAt: now
    }
  },
  {
    ref: db.collection("jobApplications").doc("_schema"),
    data: {
      collection: "jobApplications",
      purpose: "Staff interest submissions from the work-with-us page.",
      fields: ["name", "email", "phone", "serviceType", "experience", "status", "createdAt", "source"],
      status: "schema",
      createdAt: now
    }
  },
  {
    ref: db.collection("_system").doc("setup"),
    data: {
      app: "Domestic Staffing Hub",
      initializedAt: now,
      collections: ["serviceRequests", "jobApplications"]
    }
  }
];

const batch = db.batch();

for (const item of setupDocs) {
  batch.set(item.ref, item.data, { merge: true });
}

await batch.commit();

console.log("Firestore initialized: serviceRequests, jobApplications, and _system/setup are ready.");
