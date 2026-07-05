"use client";

import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import { contact, createEmailLink, createPhoneLink, createWhatsAppLink, isDemoValue } from "@/lib/contact";

export function ContactActions() {
  const hasPhone = Boolean(contact.phone && !isDemoValue(contact.phone));
  const hasEmail = Boolean(contact.email && !isDemoValue(contact.email));
  const hasLinkedIn = Boolean(contact.socials.linkedin && !isDemoValue(contact.socials.linkedin));
  const phoneHref = createPhoneLink(contact.phone);
  const emailHref = createEmailLink(contact.email);
  const whatsappHref = createWhatsAppLink(contact.whatsappNumber, "Hello, I would like to make an enquiry from Domestic Staffing Hub.");

  return (
    <div className="flex flex-wrap items-center gap-2">
      {hasPhone && phoneHref ? (
        <a
          href={phoneHref}
          aria-label={`Call Domestic Staffing Hub on ${contact.phone}`}
          className="inline-flex h-11 items-center gap-2 border border-white/20 bg-white/10 px-3 text-sm font-black text-white transition hover:border-brand-saffron hover:text-brand-saffron"
        >
          <Phone size={17} />
          Call
        </a>
      ) : null}
      {!isDemoValue(contact.whatsappNumber) ? (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center gap-2 border border-white/20 bg-white/10 px-3 text-sm font-black text-white transition hover:border-brand-saffron hover:text-brand-saffron"
        >
          <MessageCircle size={17} />
          WhatsApp
        </a>
      ) : null}
      {hasEmail ? (
        <a
          href={emailHref}
          aria-label={`Email Domestic Staffing Hub at ${contact.email}`}
          className="inline-flex h-11 items-center gap-2 border border-white/20 bg-white/10 px-3 text-sm font-black text-white transition hover:border-brand-saffron hover:text-brand-saffron"
        >
          <Mail size={17} />
          Email
        </a>
      ) : null}
      {!isDemoValue(contact.socials.instagram) ? (
        <a
          href={contact.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-11 w-11 place-items-center border border-white/20 bg-white/10 text-white transition hover:border-brand-saffron hover:text-brand-saffron"
          aria-label="Instagram"
        >
          <Instagram size={18} />
        </a>
      ) : null}
      {!isDemoValue(contact.socials.facebook) ? (
        <a
          href={contact.socials.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-11 w-11 place-items-center border border-white/20 bg-white/10 text-white transition hover:border-brand-saffron hover:text-brand-saffron"
          aria-label="Facebook"
        >
          <Facebook size={18} />
        </a>
      ) : null}
      {hasLinkedIn ? (
        <a
          href={contact.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-11 w-11 place-items-center border border-white/20 bg-white/10 text-white transition hover:border-brand-saffron hover:text-brand-saffron"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
      ) : null}
    </div>
  );
}
