# Domestic Staffing Hub

A Next.js service platform for Domestic Staffing Hub with customer requests, WhatsApp intent capture, separate staff interest intake, Firestore storage, and email notifications.

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

## Firebase App Hosting

This project is configured for Firebase project `domesticstaff-de3cd`.

Use Firebase App Hosting for the Next.js site because the app uses API routes for request handling and email notifications.

1. Install Firebase CLI if needed:

```bash
npm install -g firebase-tools
```

2. Sign in and select the project:

```bash
firebase login
firebase use domesticstaff-de3cd
```

3. In Firebase Console, enable Firestore.

4. Deploy Firestore rules:

```bash
firebase deploy --only firestore
```

5. Connect the GitHub repo to Firebase App Hosting, then set the live environment values/secrets in Firebase App Hosting.

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

Only use these service-account values for local development if needed. Firebase App Hosting can use Google application credentials automatically:

- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

Firestore is required for live lead storage. Without Firebase credentials, the app stays in demo mode and warns through the UI/API response.
