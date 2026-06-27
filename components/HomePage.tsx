"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  ChevronRight,
  Clock,
  MessageCircle,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { ContactActions } from "@/components/ContactActions";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { WhatsAppModal } from "@/components/WhatsAppModal";
import { jobSeekerFeature, navLinks, services, stats } from "@/lib/services";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

export function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatService, setChatService] = useState<string | undefined>();

  function openChat(service?: string) {
    setChatService(service);
    setChatOpen(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7fbff] text-brand-ink">
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/25 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/brand/logo.jpeg"
              width={52}
              height={52}
              alt="Domestic Staffing Hub logo"
              className="h-12 w-12 rounded-2xl object-cover"
              priority
            />
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-brand-navy sm:text-base">
              Domestic Staffing Hub
            </span>
          </Link>
          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-semibold text-slate-600 transition hover:text-brand-blue">
                {link.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => openChat()}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-ink px-4 text-sm font-semibold text-white transition hover:bg-brand-navy"
          >
            <MessageCircle size={17} />
            Chat
          </button>
        </nav>
      </header>

      <section className="relative min-h-[88svh] overflow-hidden bg-brand-ink pt-20 text-white">
        <div className="absolute inset-0">
          <div className="hero-collage">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                className="relative overflow-hidden rounded-[2rem]"
                initial={{ opacity: 0, scale: 1.05, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.09 }}
              >
                <Image src={service.image} alt="" fill sizes="34vw" className="object-cover" priority={index < 2} />
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-ink/88 to-brand-navy/58" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(244,182,63,.24),transparent_30%),radial-gradient(circle_at_22%_86%,rgba(43,191,138,.22),transparent_28%)]" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(88svh-5rem)] max-w-7xl content-center px-4 py-14 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              <Sparkles size={16} />
              Verified domestic staffing for homes and businesses
            </span>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Domestic Staffing Hub
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl">
              Quality people, trusted service, and peace of mind for homes, families, and businesses.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#request"
                className="inline-flex h-[52px] items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-brand-ink transition hover:bg-brand-gold"
              >
                Request Staff
                <ArrowRight size={18} />
              </a>
              <button
                type="button"
                onClick={() => openChat()}
                className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="-mt-8 relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-glow md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="border-b border-slate-100 p-6 md:border-b-0 md:border-r last:md:border-r-0">
              <p className="text-3xl font-black text-brand-navy">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-2 text-sm font-bold text-brand-navy">
              <BadgeCheck size={16} />
              Services
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-brand-ink sm:text-4xl">
              Choose the support you need
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Explore the main service areas, then request staff or chat with the team for quick guidance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                className={`group overflow-hidden rounded-[2rem] bg-gradient-to-br ${service.accent} p-4 shadow-soft`}
              >
                <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-72 overflow-hidden rounded-[1.5rem]">
                    <Image src={service.image} alt={service.title} fill sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col justify-between gap-5 p-2">
                    <div>
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand-navy shadow-sm">
                        <Icon size={23} />
                      </span>
                      <h3 className="mt-5 text-2xl font-black text-brand-ink">{service.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>
                    </div>
                    <div className="grid gap-2">
                      {service.promise.slice(0, 2).map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm font-semibold text-brand-ink">
                          <ShieldCheck size={16} className="text-brand-mint" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => openChat(service.slug)}
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-brand-ink px-4 text-sm font-semibold text-white transition hover:bg-brand-navy"
                      >
                        <MessageCircle size={16} />
                        Chat
                      </button>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-brand-ink transition hover:bg-brand-gold"
                      >
                        Details
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-mint/10 px-4 py-2 text-sm font-bold text-emerald-700">
              <Clock size={16} />
              Process
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-brand-ink sm:text-4xl">Simple request, careful handling</h2>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              Tell us what you need, and the team will guide the next step with care and discretion.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Choose a service", "Share your details", "Speak with the team"].map((item, index) => (
              <div key={item} className="rounded-[1.5rem] border border-slate-100 bg-[#f7fbff] p-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-ink text-sm font-black text-white">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold text-brand-ink">{item}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {index === 0
                    ? "Pick the category that best matches your need."
                    : index === 1
                      ? "Send the basics so we can understand the request."
                      : "Get a prompt follow-up or continue on WhatsApp."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="request" className="bg-mesh-light px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-navy shadow-sm">
              <ShieldCheck size={16} />
              Secure Intake
            </span>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-brand-ink sm:text-4xl">
              Request dependable staff
            </h2>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              Share the service, location, schedule, and any special preference. The team will follow up from there.
            </p>
          </div>
          <ServiceRequestForm />
        </div>
      </section>

      <footer id="contact" className="bg-brand-ink px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[360px_1fr] lg:items-center">
          <div className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-white p-3 shadow-glow lg:mx-0">
            <Image
              src="/images/services/full_logo.jpeg"
              width={460}
              height={620}
              alt="Domestic Staffing Hub logo"
              className="h-[420px] w-full rounded-[1.5rem] object-cover object-top"
            />
          </div>
          <div>
            <h2 className="mt-5 text-3xl font-black">Domestic Staffing Hub</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
              Quality people, trusted service, peace of mind.
            </p>
            <div className="mt-6 grid gap-5">
              <ContactActions />
              <Link
                href="/work-with-us"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-gold transition hover:text-white"
              >
                {jobSeekerFeature.title}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppModal open={chatOpen} onClose={() => setChatOpen(false)} initialService={chatService} />
    </main>
  );
}
