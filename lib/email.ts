import nodemailer from "nodemailer";

type EmailPayload = {
  subject: string;
  text: string;
};

export function isEmailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_APP_PASSWORD &&
      process.env.CONTACT_EMAIL
  );
}

export async function sendNotificationEmail(payload: EmailPayload) {
  if (!isEmailConfigured()) {
    return { sent: false, reason: "Email environment variables are not configured." };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_APP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: `"Domestic Staffing Hub" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: process.env.SMTP_USER,
    subject: payload.subject,
    text: payload.text
  });

  return { sent: true };
}
