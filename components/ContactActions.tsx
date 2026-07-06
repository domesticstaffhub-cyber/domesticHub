"use client";

import { Facebook, Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { contact, createEmailLink, createPhoneLink, createWhatsAppLink } from "@/lib/contact";

const clientWhatsAppMessage =
  "Hello Domestic Staffing Hub,\n\nMy name is [your name], and I would like to enquire about your domestic staffing services.\n\nThank you.";

const contactButtonClass =
  "inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20";

const iconButtonClass =
  "grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20";

export function ContactActions() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={createPhoneLink(contact.phone)} className={contactButtonClass} aria-label={`Call ${contact.phone}`}>
        <Phone size={17} />
        Call
      </a>
      <a
        href={createWhatsAppLink(contact.whatsappNumber, clientWhatsAppMessage)}
        target="_blank"
        rel="noreferrer"
        className={contactButtonClass}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={17} />
        WhatsApp
      </a>
      <a href={createEmailLink(contact.email)} className={contactButtonClass} aria-label={`Email ${contact.email}`}>
        <Mail size={17} />
        Email
      </a>
      <a
        href={contact.socials.instagram}
        target="_blank"
        rel="noreferrer"
        className={iconButtonClass}
        aria-label="Instagram"
      >
        <Instagram size={18} />
      </a>
      <a
        href={contact.socials.facebook}
        target="_blank"
        rel="noreferrer"
        className={iconButtonClass}
        aria-label="Facebook"
      >
        <Facebook size={18} />
      </a>
    </div>
  );
}
