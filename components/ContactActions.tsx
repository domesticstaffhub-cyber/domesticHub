"use client";

import { useState } from "react";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { contact, isDemoValue } from "@/lib/contact";
import { DemoDialog } from "./DemoDialog";

type DemoState = {
  open: boolean;
  title: string;
  message: string;
};

const initialDemoState: DemoState = {
  open: false,
  title: "",
  message: ""
};

export function ContactActions() {
  const [demo, setDemo] = useState(initialDemoState);

  function showDemo(label: string) {
    setDemo({
      open: true,
      title: `Demo ${label}`,
      message: `This ${label.toLowerCase()} is a demo placeholder. Kindly update it with the official ${label.toLowerCase()} before launch.`
    });
  }

  function handleContact(label: string, value: string, href: string) {
    if (isDemoValue(value)) {
      showDemo(label);
      return;
    }

    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => handleContact("Phone Number", contact.phone, `tel:${contact.phone}`)}
          className="inline-flex h-11 items-center gap-2 border border-white/20 bg-white/10 px-3 text-sm font-black text-white transition hover:border-brand-saffron hover:text-brand-saffron"
        >
          <Phone size={17} />
          Call
        </button>
        <button
          type="button"
          onClick={() => handleContact("Email", contact.email, `mailto:${contact.email}`)}
          className="inline-flex h-11 items-center gap-2 border border-white/20 bg-white/10 px-3 text-sm font-black text-white transition hover:border-brand-saffron hover:text-brand-saffron"
        >
          <Mail size={17} />
          Email
        </button>
        <button
          type="button"
          onClick={() => handleContact("Instagram", contact.socials.instagram, contact.socials.instagram)}
          className="grid h-11 w-11 place-items-center border border-white/20 bg-white/10 text-white transition hover:border-brand-saffron hover:text-brand-saffron"
          aria-label="Instagram"
        >
          <Instagram size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleContact("Facebook", contact.socials.facebook, contact.socials.facebook)}
          className="grid h-11 w-11 place-items-center border border-white/20 bg-white/10 text-white transition hover:border-brand-saffron hover:text-brand-saffron"
          aria-label="Facebook"
        >
          <Facebook size={18} />
        </button>
        <button
          type="button"
          onClick={() => handleContact("LinkedIn", contact.socials.linkedin, contact.socials.linkedin)}
          className="grid h-11 w-11 place-items-center border border-white/20 bg-white/10 text-white transition hover:border-brand-saffron hover:text-brand-saffron"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </button>
      </div>
      <DemoDialog
        open={demo.open}
        title={demo.title}
        message={demo.message}
        onClose={() => setDemo(initialDemoState)}
      />
    </>
  );
}
