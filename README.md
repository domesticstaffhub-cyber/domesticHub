# Domestic Staffing Hub

A Next.js service platform for Domestic Staffing Hub with customer requests, WhatsApp intent capture, separate staff interest intake, Firestore storage, and email notifications.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Fill the local `.env` file with the real private values.

3. Run locally:

```bash
npm run dev
```

## Vercel + Firestore

Deploy the Next.js app on Vercel and use Firestore only for the database.

The app writes leads through server API routes, so Firestore can stay in Production mode with direct browser reads/writes denied.

## Firestore Setup

The database collections are created automatically when the first real service request or staff interest is submitted.

If you want the collections to show immediately in Firebase Console, run:

```bash
npm run db:init
```

This creates lightweight `_schema` documents in:

- `serviceRequests`
- `jobApplications`

To deploy Firestore rules from this project:

```bash
npm install -g firebase-tools
firebase login
firebase use domesticstaff-de3cd
firebase deploy --only firestore
```

## Environment Variables

- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_PHONE`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `CONTACT_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_APP_PASSWORD`
- `FIREBASE_PROJECT_ID`

- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Firestore is required for live lead storage. Add the same variables in Vercel Project Settings before deploying live.
