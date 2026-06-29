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
            className="fixed inset-0 z-50 grid place-items-center bg-brand-ink/70 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="w-full max-w-lg border border-brand-ink bg-brand-bone p-5 shadow-hard sm:p-6"
              initial={{ y: 28, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 18, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              <div className="mb-6 flex items-start justify-between gap-4 border-b border-brand-line pb-5">
                <div>
                  <span className="mb-3 grid h-12 w-12 place-items-center border border-brand-ink bg-brand-teal text-white">
                    <MessageCircle size={23} />
                  </span>
                  <h2 className="text-2xl font-black text-brand-ink">Start a WhatsApp chat</h2>
                  <p className="mt-2 text-sm leading-6 text-stone-600">Share your name and the service you need.</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-10 w-10 place-items-center border border-brand-line text-brand-ink transition hover:border-brand-ink"
                  aria-label="Close WhatsApp form"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="grid gap-4">
                <label className="grid gap-2 text-sm font-black text-brand-ink">
                  Name
                  <input name="name" autoComplete="name" className="field-input" placeholder="Your name" />
                  {errors.name ? <span className="text-xs font-bold text-brand-clay">{errors.name}</span> : null}
                </label>

                <label className="grid gap-2 text-sm font-black text-brand-ink">
                  Service
                  <select name="serviceType" defaultValue={selectedService} className="field-input">
                    {serviceOptions.map((service) => (
                      <option key={service.value} value={service.value}>
                        {service.label}
                      </option>
                    ))}
                  </select>
                  {errors.serviceType ? (
                    <span className="text-xs font-bold text-brand-clay">{errors.serviceType}</span>
                  ) : null}
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 border border-brand-ink bg-brand-ink px-5 text-sm font-black text-brand-bone transition hover:bg-brand-teal"
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
        message="This WhatsApp number is a demo placeholder. Kindly update it with the official support line before launch."
        onClose={() => setDemoOpen(false)}
      />
    </>
  );
}
