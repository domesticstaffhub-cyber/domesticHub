"use client";

import { FormEvent, useEffect, useState } from "react";
import { BriefcaseBusiness, Send } from "lucide-react";
import { contact, createWhatsAppLink } from "@/lib/contact";
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
      email: "",
      phone: "",
      serviceType: String(formData.get("serviceType") || ""),
      experience: "",
      companyWebsite: String(formData.get("companyWebsite") || "")
    };

    const parsed = jobInterestSchema.safeParse(payload);

    if (!parsed.success) {
      setErrors(flattenZodErrors(parsed.error));
      setFormState({ status: "error", message: "Please fix the highlighted fields." });
      return;
    }

    setErrors({});
    setFormState(initialState);
    const category = seekerCategories.find((item) => item.value === parsed.data.serviceType);
    const message = [
      "Hello Domestic Staffing Hub,",
      "",
      "I need a job.",
      "",
      `Name: ${parsed.data.name}`,
      `Service I can do: ${category?.label || parsed.data.serviceType}`,
      "",
      "Please let me know the next step."
    ].join("\n");

    window.open(createWhatsAppLink(contact.whatsappNumber, message), "_blank", "noopener,noreferrer");
    form.reset();
    setFormState({
      status: "success",
      message: "Your job request message is ready on WhatsApp. Please send it to continue."
    });
  }

  return (
    <form onSubmit={handleSubmit} className="border border-brand-ink bg-brand-bone p-4 shadow-hard sm:p-6">
      <div className="mb-6 flex items-start gap-3 border-b border-brand-line pb-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center border border-brand-ink bg-brand-saffron text-brand-ink">
          <BriefcaseBusiness size={22} />
        </span>
        <div>
          <h2 className="text-2xl font-black leading-tight text-brand-ink">I Need a Job</h2>
          <p className="mt-1 text-sm leading-6 text-stone-600">Enter your name and the service you can provide.</p>
        </div>
      </div>

      <input name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4">
        <Field label="Name" error={errors.name}>
          <input name="name" autoComplete="name" placeholder="Your full name" className="field-input" />
        </Field>

        <Field label="Service You Can Do" error={errors.serviceType}>
          <select name="serviceType" defaultValue="" className="field-input">
            <option value="" disabled>
              Select service
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
          className={`mt-4 border px-4 py-3 text-sm font-bold ${
            formState.status === "success"
              ? "border-brand-teal/30 bg-brand-teal/10 text-brand-teal"
              : "border-brand-saffron/40 bg-brand-saffron/15 text-brand-ink"
          }`}
        >
          {formState.message}
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 border border-brand-ink bg-brand-ink px-6 text-sm font-black text-brand-bone transition hover:bg-brand-clay disabled:opacity-70"
      >
        <Send size={18} />
        Continue on WhatsApp
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
    <label className="grid gap-2 text-sm font-black text-brand-ink">
      {label}
      {children}
      {error ? <span className="text-xs font-bold text-brand-clay">{error}</span> : null}
    </label>
  );
}
