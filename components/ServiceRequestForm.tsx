"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send, ShieldCheck } from "lucide-react";
import { serviceOptions } from "@/lib/services";
import { flattenZodErrors, serviceRequestSchema } from "@/lib/validation";

type FormState = {
  message: string;
  status: "idle" | "success" | "error";
};

const initialState: FormState = {
  message: "",
  status: "idle"
};

export function ServiceRequestForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      serviceType: String(formData.get("serviceType") || ""),
      message: String(formData.get("message") || ""),
      companyWebsite: String(formData.get("companyWebsite") || "")
    };

    const parsed = serviceRequestSchema.safeParse(payload);

    if (!parsed.success) {
      setErrors(flattenZodErrors(parsed.error));
      setFormState({ status: "error", message: "Please fix the highlighted fields." });
      return;
    }

    setErrors({});
    setFormState(initialState);
    setLoading(true);

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data)
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setErrors(result.errors || {});
        setFormState({ status: "error", message: result.message || "Unable to submit request." });
        return;
      }

      form.reset();
      setFormState({
        status: result.demo ? "error" : "success",
        message: result.message
      });
    } catch {
      setFormState({ status: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-brand-ink bg-brand-bone p-4 shadow-hard sm:p-6">
      <div className="mb-6 flex items-start gap-3 border-b border-brand-line pb-5">
        <span className="grid h-11 w-11 shrink-0 place-items-center border border-brand-ink bg-brand-saffron text-brand-ink">
          <ShieldCheck size={22} />
        </span>
        <div>
          <h2 className="text-2xl font-black leading-tight text-brand-ink">Request trusted staff</h2>
          <p className="mt-1 text-sm leading-6 text-stone-600">Tell us what you need and the team will follow up.</p>
        </div>
      </div>

      <input name="companyWebsite" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input name="name" autoComplete="name" placeholder="Your full name" className="field-input" />
        </Field>

        <Field label="Email" error={errors.email}>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="field-input" />
        </Field>

        <Field label="Phone" error={errors.phone}>
          <input name="phone" autoComplete="tel" placeholder="+234 800 000 0000" className="field-input" />
        </Field>

        <Field label="Service" error={errors.serviceType}>
          <select name="serviceType" defaultValue="" className="field-input">
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Request Details" error={errors.message} wide>
          <textarea
            name="message"
            rows={4}
            placeholder="Role, location, schedule, living arrangement, and any special requirement."
            className="field-input min-h-32 resize-none py-3"
          />
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
        disabled={loading}
        className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 border border-brand-ink bg-brand-ink px-6 text-sm font-black text-brand-bone transition hover:bg-brand-clay disabled:opacity-70"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        Submit Request
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
  wide = false
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={`grid gap-2 text-sm font-black text-brand-ink ${wide ? "sm:col-span-2" : ""}`}>
      {label}
      {children}
      {error ? <span className="text-xs font-bold text-brand-clay">{error}</span> : null}
    </label>
  );
}
