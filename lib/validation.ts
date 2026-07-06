import { z } from "zod";
import { seekerCategories, serviceOptions } from "./services";

const nameRegex = /^[\p{L}' .-]+$/u;
const phoneRegex = /^[+\d][\d\s().-]{6,20}$/;

const serviceValues = serviceOptions.map((service) => service.value) as [string, ...string[]];
const seekerValues = seekerCategories.map((service) => service.value) as [string, ...string[]];

export const serviceRequestSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(70, "Name is too long.")
      .regex(nameRegex, "Name can only contain letters, spaces, apostrophes, dots, and hyphens."),
    email: z.string().trim().email("Enter a valid email address.").max(120, "Email is too long."),
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
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(70, "Name is too long.")
      .regex(nameRegex, "Name can only contain letters, spaces, apostrophes, dots, and hyphens."),
    serviceType: z.enum(serviceValues, {
      errorMap: () => ({ message: "Select a valid service." })
    })
  })
  .strict();

export const jobInterestSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(70, "Name is too long.")
      .regex(nameRegex, "Name can only contain letters, spaces, apostrophes, dots, and hyphens."),
    email: z.string().trim().email("Enter a valid email address.").max(120, "Email is too long.").optional().or(z.literal("")),
    phone: z
      .string()
      .trim()
      .max(24, "Phone number is too long.")
      .optional()
      .or(z.literal(""))
      .refine((value) => !value || phoneRegex.test(value), "Enter a valid phone number."),
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
