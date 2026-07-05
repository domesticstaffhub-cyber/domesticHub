import nodemailer from "nodemailer";

type EmailPayload = {
  subject: string;
  text: string;
  replyTo?: string;
};

function getEmailConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD || process.env.SMTP_APP_PASSWORD;
  const to = process.env.NOTIFICATION_EMAIL || process.env.CONTACT_EMAIL || user;
  const secure =
    process.env.SMTP_SECURE === "true" || (!process.env.SMTP_SECURE && port === 465);

  if (!host || !Number.isFinite(port) || !user || !password || !to) {
    return null;
  }

  return { host, port, user, password, to, secure };
}

export function isEmailConfigured() {
  return Boolean(getEmailConfig());
}

export async function sendNotificationEmail(payload: EmailPayload) {
  const config = getEmailConfig();

  if (!config) {
    return { sent: false, reason: "Email environment variables are not configured." };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.password
    }
  });

  await transporter.sendMail({
    from: `"Domestic Staffing Hub" <${config.user}>`,
    to: config.to,
    replyTo: payload.replyTo || config.user,
    subject: payload.subject,
    text: payload.text
  });

  return { sent: true };
}
