"use client";

import { FormEvent, useEffect, useState } from "react";
import { Send } from "lucide-react";
import { contact, createWhatsAppLink, isDemoValue } from "@/lib/contact";
import { seekerCategories } from "@/lib/services";
import { flattenZodErrors, jobInterestSchema } from "@/lib/validation";

type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialState: FormState = {
  status: "idle",
  message: ""
};

export function WorkWithUsForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (!formState.message) return;

    const timer = window.setTimeout(() => {
      setFormState(initialState);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [formState.message]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      serviceType: String(formData.get("serviceType") || ""),
      companyWebsite: String(formData.get("companyWebsite") || "")
    };

    const parsed = jobInterestSchema.safeParse(payload);

    if (!parsed.success) {
      setErrors(flattenZodErrors(parsed.error));
      setFormState({ status: "error", message: "Please fix the highlighted fields." });
      return;
    }

    const category = seekerCategories.find((item) => item.value === parsed.data.serviceType);
    const categoryLabel = category?.label || "domestic staffing";

    if (isDemoValue(contact.whatsappNumber)) {
      setFormState({ status: "error", message: "WhatsApp number is not ready yet." });
      return;
    }

    const whatsappMessage = [
      "Hello Domestic Staffing Hub,",
      "",
      `My name is ${parsed.data.name}, and I need a job with Domestic Staffing Hub. I can provide ${categoryLabel} services.`,
      "",
      "Thank you."
    ].join("\n");

    setErrors({});
    form.reset();
    window.open(createWhatsAppLink(contact.whatsappNumber, whatsappMessage), "_blank", "noopener,noreferrer");
    setFormState({ status: "success", message: "WhatsApp has opened with your details. Please send the message there to continue." });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-5 shadow-soft md:p-7">
      <p className="mb-6 text-sm leading-6 text-slate-500">Enter your name and choose the service you can do.</p>

      <input name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input name="name" autoComplete="name" placeholder="Your full name" className="field-input" />
        </Field>

        <Field label="Service You Can Do" error={errors.serviceType}>
          <select name="serviceType" defaultValue="" className="field-input">
            <option value="" disabled>
              Select category
            </option>
            {seekerCategories.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {formState.message ? (
        <p
          className={`mt-4 rounded-2xl px-4 py-3 text-sm font-medium ${
            formState.status === "success" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-800"
          }`}
        >
          {formState.message}
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-6 text-sm font-semibold text-white transition hover:bg-brand-navy"
      >
        <Send size={18} />
        Send Job Request
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-brand-ink">
      {label}
      {children}
      {error ? <span className="text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
}
