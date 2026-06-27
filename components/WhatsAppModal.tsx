"use client";

import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { contact, createWhatsAppLink, isDemoValue } from "@/lib/contact";
import { serviceOptions } from "@/lib/services";
import { flattenZodErrors, whatsappIntentSchema } from "@/lib/validation";
import { DemoDialog } from "./DemoDialog";

type WhatsAppModalProps = {
  open: boolean;
  onClose: () => void;
  initialService?: string;
};

export function WhatsAppModal({ open, onClose, initialService }: WhatsAppModalProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [demoOpen, setDemoOpen] = useState(false);
  const selectedService = useMemo(
    () => serviceOptions.find((service) => service.value === initialService)?.value || serviceOptions[0].value,
    [initialService]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || ""),
      serviceType: String(formData.get("serviceType") || "")
    };

    const parsed = whatsappIntentSchema.safeParse(payload);

    if (!parsed.success) {
      setErrors(flattenZodErrors(parsed.error));
      return;
    }

    setErrors({});

    const service = serviceOptions.find((item) => item.value === parsed.data.serviceType);
    const message = `Hello, my name is ${parsed.data.name}. I would like to chat about ${service?.label || "a service"} from Domestic Staffing Hub.`;

    if (isDemoValue(contact.whatsappNumber)) {
      setDemoOpen(true);
      return;
    }

    window.open(createWhatsAppLink(contact.whatsappNumber, message), "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 grid place-items-center bg-brand-ink/55 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-soft"
              initial={{ y: 28, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-mint/15 text-brand-mint">
                    <MessageCircle size={23} />
                  </span>
                  <h2 className="text-2xl font-semibold text-brand-ink">Start a WhatsApp chat</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Share your name and the service you need so the team can continue the conversation properly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-brand-ink"
                  aria-label="Close WhatsApp form"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-medium text-brand-ink">
                  Name
                  <input
                    name="name"
                    autoComplete="name"
                    className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-brand-ink outline-none transition focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-sky/15"
                    placeholder="Your name"
                  />
                  {errors.name ? <span className="text-xs font-medium text-red-600">{errors.name}</span> : null}
                </label>

                <label className="grid gap-2 text-sm font-medium text-brand-ink">
                  Service
                  <select
                    name="serviceType"
                    defaultValue={selectedService}
                    className="h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-brand-ink outline-none transition focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-sky/15"
                  >
                    {serviceOptions.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType ? (
                    <span className="text-xs font-medium text-red-600">{errors.serviceType}</span>
                  ) : null}
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-mint px-5 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                <Send size={17} />
                Continue to WhatsApp
              </button>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <DemoDialog
        open={demoOpen}
        title="Demo WhatsApp Number"
        message="This WhatsApp number is a placeholder for preview. Kindly update NEXT_PUBLIC_WHATSAPP_NUMBER before launch so customers are redirected to the correct support line."
        onClose={() => setDemoOpen(false)}
      />
    </>
  );
}
