import { z } from "zod";
import { seekerCategories, serviceOptions } from "./services";

const nameRegex = /^[\p{L}' .-]+$/u;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRegex = /^[+\d][\d\s().-]{6,20}$/;

const serviceValues = serviceOptions.map((service) => service.value) as [string, ...string[]];
const seekerValues = seekerCategories.map((service) => service.value) as [string, ...string[]];

const fullNameSchema = z
  .string()
  .trim()
  .min(5, "Enter your first and last name.")
  .max(70, "Name is too long.")
  .regex(nameRegex, "Name can only contain letters, spaces, apostrophes, dots, and hyphens.")
  .refine((value) => {
    const parts = value.split(/\s+/).filter(Boolean);
    if (parts.length < 2) return false;

    return parts.slice(0, 2).every((part) => (part.match(/\p{L}/gu) || []).length >= 2);
  }, "Enter your first and last name.");

const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address.")
  .max(120, "Email is too long.")
  .refine((value) => {
    const normalized = value.toLowerCase();
    const [local, domain] = normalized.split("@");

    return (
      emailRegex.test(normalized) &&
      Boolean(local) &&
      Boolean(domain) &&
      !normalized.includes("..") &&
      domain.includes(".") &&
      !domain.startsWith(".") &&
      !domain.endsWith(".")
    );
  }, "Enter a valid email address.");

export const serviceRequestSchema = z
  .object({
    name: fullNameSchema,
    email: emailSchema,
    phone: z
      .string()
      .trim()
      .optional()
      .or(z.literal(""))
      .refine((value) => !value || phoneRegex.test(value), "Enter a valid phone number."),
    serviceType: z.enum(serviceValues, {
      errorMap: () => ({ message: "Select a valid service." })
    }),
    message: z.string().trim().max(500, "Message must be 500 characters or less.").optional().or(z.literal("")),
    companyWebsite: z.string().max(0, "Spam protection triggered.").optional().or(z.literal(""))
  })
  .strict();

export const whatsappIntentSchema = z
  .object({
    name: fullNameSchema,
    serviceType: z.enum(serviceValues, {
      errorMap: () => ({ message: "Select a valid service." })
    })
  })
  .strict();

export const jobInterestSchema = z
  .object({
    name: fullNameSchema,
    serviceType: z.enum(seekerValues, {
      errorMap: () => ({ message: "Select a valid work category." })
    }),
    companyWebsite: z.string().max(0, "Spam protection triggered.").optional().or(z.literal(""))
  })
  .strict();

export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;
export type WhatsappIntentInput = z.infer<typeof whatsappIntentSchema>;
export type JobInterestInput = z.infer<typeof jobInterestSchema>;

export function sanitizeText(value?: string) {
  if (!value) return "";
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}

export function flattenZodErrors(error: z.ZodError) {
  return error.issues.reduce<Record<string, string>>((acc, issue) => {
    const key = issue.path.join(".") || "form";
    acc[key] = issue.message;
    return acc;
  }, {});
}
