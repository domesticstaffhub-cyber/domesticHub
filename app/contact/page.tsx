import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactActions } from "@/components/ContactActions";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact | Domestic Staffing Hub",
  description: "Contact Domestic Staffing Hub or request domestic staff for your home or business."
};

const contactPoints = [
  {
    title: "Call",
    text: "Speak with the team about your request.",
    icon: Phone
  },
  {
    title: "Email",
    text: "Send service details or follow-up questions.",
    icon: Mail
  },
  {
    title: "WhatsApp",
    text: "Continue a quick service conversation.",
    icon: MessageCircle
  }
] as const;

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader />

      <section className="grid bg-brand-bone pt-[72px] lg:min-h-[92svh] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[24rem] border-b border-brand-ink lg:min-h-0 lg:border-b-0 lg:border-r">
          <Image
            src="/images/services/driver_chauffeur.jpg"
            alt="Driver and chauffeur service"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "center 36%" }}
            priority
          />
          <div className="absolute inset-0 bg-brand-ink/20" />
          <div className="absolute bottom-0 left-0 right-0 h-3 kinetic-strip" />
        </div>

        <div className="px-4 py-12 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-2xl">
            <p className="section-kicker">Contact</p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Tell us what you need.</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-600">
              Request staff for a home, family, restaurant, hotel, office, or custom domestic need.
            </p>

            <div className="mt-8">
              <ServiceRequestForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-ink px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="section-kicker text-brand-saffron">Reach us</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Use the contact option that works best.</h2>
            <div className="mt-6">
              <ContactActions />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {contactPoints.map((point) => {
              const Icon = point.icon;

              return (
                <div key={point.title} className="border border-white/10 bg-white/5 p-5">
                  <Icon size={24} className="text-brand-saffron" />
                  <h3 className="mt-5 text-lg font-black">{point.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">{point.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-paper px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-start gap-4 border border-brand-ink bg-brand-bone p-5 shadow-soft">
          <MapPin size={22} className="mt-1 shrink-0 text-brand-clay" />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brand-clay">Office</p>
            <p className="mt-2 text-lg font-black leading-7">17/103, Enerhen Road, Adjacent Faith Victory Church, Warri</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
