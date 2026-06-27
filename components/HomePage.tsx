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
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppModal } from "@/components/WhatsAppModal";
import { companyStory, services, stats } from "@/lib/services";

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
      <SiteHeader onChat={() => openChat()} />

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
                <Image
                  src={service.image}
                  alt=""
                  fill
                  sizes="34vw"
                  className="object-cover"
                  style={{ objectPosition: service.imagePosition }}
                  priority={index < 2}
                />
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
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur sm:text-sm">
              <Sparkles size={14} />
              Domestic staffing for homes and businesses
            </span>
            <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              Domestic Staffing Hub
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
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
              <p className={`${stat.label ? "text-3xl" : "text-2xl"} font-black text-brand-navy`}>{stat.value}</p>
              {stat.label ? <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p> : null}
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
                  <div className="relative min-h-[22rem] overflow-hidden rounded-[1.5rem] lg:min-h-72">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 38vw, 92vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                      style={{ objectPosition: service.imagePosition }}
                    />
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

      <section id="about" className="relative overflow-hidden bg-brand-ink px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/services/mission_vision.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/90 to-brand-navy/75" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles size={16} />
              About the company
            </span>
            <h2 className="mt-5 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              Built around trust, careful matching, and peace of mind.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75">{companyStory.intro}</p>
            <Link
              href="#about"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-brand-ink transition hover:bg-brand-gold"
            >
              View mission and vision
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-bold text-brand-gold">Mission</p>
              <p className="mt-3 text-sm leading-6 text-white/75">{companyStory.mission}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-bold text-brand-mint">Vision</p>
              <p className="mt-3 text-sm leading-6 text-white/75">{companyStory.vision}</p>
            </div>
          </div>
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

      <SiteFooter />

      <WhatsAppModal open={chatOpen} onClose={() => setChatOpen(false)} initialService={chatService} />
    </main>
  );
}
