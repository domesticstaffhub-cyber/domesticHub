"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { ServiceRequestForm } from "@/components/ServiceRequestForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppModal } from "@/components/WhatsAppModal";
import { companyStory, processSteps, services, stats, trustSignals } from "@/lib/services";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const colorBlocks = [
  "bg-brand-clay",
  "bg-brand-indigo",
  "bg-brand-teal",
  "bg-brand-leaf",
  "bg-brand-saffron"
] as const;

export function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatService, setChatService] = useState<string | undefined>();

  function openChat(service?: string) {
    setChatService(service);
    setChatOpen(true);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-brand-paper text-brand-ink">
      <SiteHeader onChat={() => openChat()} tone="dark" />

      <section className="relative min-h-[92svh] overflow-hidden bg-brand-ink text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/services/maid_nanny_caregiver.jpg"
            alt="Domestic staff support"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 24%" }}
            priority
          />
          <div className="absolute inset-0 hero-shade" />
          <div className="absolute bottom-0 left-0 right-0 h-3 kinetic-strip" />
        </div>

        <div className="relative mx-auto grid min-h-[92svh] max-w-7xl content-end px-4 pb-14 pt-28 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7 }}
            className="max-w-5xl"
          >
            <span className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur">
              <Sparkles size={15} />
              Domestic staffing for homes and business
            </span>
            <h1 className="mt-6 max-w-5xl text-4xl font-black leading-tight text-white sm:text-5xl">
              Trusted staff for the way your home works.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
              Chefs, drivers, tutors, maids, nannies, caregivers, and custom domestic support with careful follow-up.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-[52px] items-center gap-2 border border-brand-saffron bg-brand-saffron px-5 text-sm font-black text-brand-ink transition hover:bg-white"
              >
                Request Staff
                <ArrowRight size={18} />
              </Link>
              <button
                type="button"
                onClick={() => openChat()}
                className="inline-flex h-[52px] items-center gap-2 border border-white/25 bg-white/10 px-5 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-brand-ink"
              >
                <MessageCircle size={18} />
                WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-brand-ink bg-brand-ink py-4 text-brand-bone">
        <div className="marquee-track flex w-max items-center gap-5 whitespace-nowrap">
          {[...services, ...services].map((service, index) => (
            <span key={`${service.slug}-${index}`} className="flex items-center gap-5 text-sm font-black uppercase tracking-[0.18em] text-white/75">
              {service.title}
              <span className="h-2 w-2 bg-brand-saffron" />
            </span>
          ))}
        </div>
      </section>

      <section className="surface-grid border-b border-brand-line bg-brand-paper px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5 }}
              className="border border-brand-ink bg-brand-bone p-5 shadow-soft"
            >
              <p className="text-3xl font-black text-brand-ink">{stat.value}</p>
              <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-stone-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-brand-bone px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.8fr_1fr] lg:items-end">
            <div>
              <p className="section-kicker">Services</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
                Practical help, matched to real household routines.
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-stone-600 lg:justify-self-end">
              Choose the support you need, then request staff or speak with the team for guidance.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.article
                  key={service.slug}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.05 }}
                  className="group flex min-h-[28rem] flex-col border border-brand-ink bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-hard"
                >
                  <div className="relative min-h-48 overflow-hidden border-b border-brand-ink">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 768px) 45vw, 92vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                      style={{ objectPosition: service.imagePosition }}
                    />
                    <div className={`absolute left-0 top-0 h-2 w-full ${colorBlocks[index % colorBlocks.length]}`} />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className={`grid h-11 w-11 place-items-center border border-brand-ink text-white ${colorBlocks[index % colorBlocks.length]}`}>
                      <Icon size={21} />
                    </span>
                    <h3 className="mt-5 text-lg font-black leading-tight">{service.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-stone-600">{service.summary}</p>
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-brand-line pt-4">
                      <button
                        type="button"
                        onClick={() => openChat(service.slug)}
                        className="grid h-10 w-10 place-items-center border border-brand-line text-brand-ink transition hover:border-brand-ink"
                        aria-label={`Chat about ${service.title}`}
                      >
                        <MessageCircle size={17} />
                      </button>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-black text-brand-ink transition hover:text-brand-clay"
                      >
                        Details
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-ink px-4 py-16 text-brand-bone sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-kicker text-brand-saffron">Why clients call</p>
            <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl">
              Calm homes need dependable people.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">{companyStory.intro}</p>
            <Link
              href="/about"
              className="mt-7 inline-flex h-12 items-center gap-2 border border-white/20 px-5 text-sm font-black text-white transition hover:border-brand-saffron hover:text-brand-saffron"
            >
              About the company
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {trustSignals.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="border border-white/10 bg-white/5 p-5"
                >
                  <Icon size={24} className="text-brand-saffron" />
                  <h3 className="mt-5 text-lg font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-paper px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="section-kicker">How it works</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Simple request, careful follow-up.</h2>
            <p className="mt-5 text-sm leading-7 text-stone-600">
              Start with the need. The team helps you move toward the right support.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.06 }}
                  className="border border-brand-ink bg-brand-bone p-5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <Icon size={25} className="text-brand-clay" />
                    <span className="text-sm font-black text-stone-400">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-black">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{step.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid bg-brand-bone lg:grid-cols-2">
        <div className="relative min-h-[32rem] border-y border-brand-ink lg:border-r">
          <Image
            src="/images/services/chef.jpg"
            alt="Chef service"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: "center 38%" }}
          />
          <div className="absolute left-0 top-0 h-3 w-full kinetic-strip" />
        </div>
        <div className="border-y border-brand-ink px-4 py-14 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-xl">
            <p className="section-kicker">Start here</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Tell us who you need.</h2>
            <p className="mt-5 text-sm leading-7 text-stone-600">
              Share the role, location, schedule, and preferences. A short request is enough to begin.
            </p>
            <div className="mt-8">
              <ServiceRequestForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-paper px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
          {companyStory.values.map((value) => (
            <div key={value} className="flex items-center gap-3 border border-brand-line bg-brand-bone p-4">
              <CheckCircle2 size={18} className="shrink-0 text-brand-teal" />
              <span className="text-sm font-black uppercase tracking-[0.13em]">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-clay px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/80">
              <Clock3 size={15} />
              Ready when you are
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight">Need staff for your home or business?</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center gap-2 border border-white bg-white px-5 text-sm font-black text-brand-ink transition hover:bg-brand-saffron"
            >
              Request Staff
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center gap-2 border border-white/30 px-5 text-sm font-black text-white transition hover:bg-white hover:text-brand-ink"
            >
              View Services
              <BadgeCheck size={17} />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />

      <WhatsAppModal open={chatOpen} onClose={() => setChatOpen(false)} initialService={chatService} />
    </main>
  );
}
