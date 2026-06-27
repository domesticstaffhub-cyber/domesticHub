"use client";

import { FormEvent, useState } from "react";
import { BriefcaseBusiness, Loader2, Send } from "lucide-react";
import { DemoDialog } from "@/components/DemoDialog";
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
  const [loading, setLoading] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoMessage, setDemoMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      serviceType: String(formData.get("serviceType") || ""),
      experience: String(formData.get("experience") || ""),
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
    setLoading(true);

    try {
      const response = await fetch("/api/job-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data)
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setErrors(result.errors || {});
        setFormState({ status: "error", message: result.message || "Unable to submit details." });
        return;
      }

      form.reset();

      if (result.demo) {
        setDemoMessage(
          "This is using demo contact settings. Add the real WhatsApp number and Firestore credentials in Vercel before accepting live job interest submissions."
        );
        setDemoOpen(true);
      } else {
        window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
      }

      setFormState({ status: result.demo ? "error" : "success", message: result.message });
    } catch {
      setFormState({ status: "error", message: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-5 shadow-soft md:p-7">
        <div className="mb-6 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gold/20 text-brand-ink">
            <BriefcaseBusiness size={22} />
          </span>
          <div>
            <h2 className="text-2xl font-semibold text-brand-ink">Staff interest intake</h2>
            <p className="text-sm text-slate-500">This path is separated from the customer service request flow.</p>
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

          <Field label="Work Category" error={errors.serviceType}>
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

          <Field label="Experience" error={errors.experience} wide>
            <textarea
              name="experience"
              rows={4}
              placeholder="Briefly share your experience, availability, and preferred role."
              className="field-input min-h-32 resize-none py-3"
            />
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
          disabled={loading}
          className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-6 text-sm font-semibold text-white transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          Continue to WhatsApp
        </button>
      </form>
      <DemoDialog
        open={demoOpen}
        title="Demo Submission Path"
        message={demoMessage}
        onClose={() => setDemoOpen(false)}
      />
    </>
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
    <label className={`grid gap-2 text-sm font-medium text-brand-ink ${wide ? "sm:col-span-2" : ""}`}>
      {label}
      {children}
      {error ? <span className="text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
}
