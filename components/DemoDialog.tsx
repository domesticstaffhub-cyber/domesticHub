"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

type DemoDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

export function DemoDialog({ open, title, message, onClose }: DemoDialogProps) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-brand-ink/50 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-soft"
            initial={{ y: 24, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-gold/20 text-brand-ink">
                  <AlertTriangle size={21} />
                </span>
                <h2 className="text-xl font-semibold text-brand-ink">{title}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full text-brand-ink/60 transition hover:bg-slate-100 hover:text-brand-ink"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>
            <p className="text-sm leading-6 text-slate-600">{message}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy"
            >
              Got it
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
