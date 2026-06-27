# Domestic Staffing Hub

A Next.js service platform for Domestic Staffing Hub with validated customer requests, WhatsApp intent capture, separate job-seeker intake, Firestore storage, and email notifications.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in the real values.

3. Run locally:

```bash
npm run dev
```

## Vercel Environment Variables

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

Firestore is required for live lead storage. Without Firebase Admin credentials, the app stays in demo mode and warns through the UI/API response.
