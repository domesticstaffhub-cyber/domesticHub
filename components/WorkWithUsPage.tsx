"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { WorkWithUsForm } from "@/components/WorkWithUsForm";
import { jobSeekerFeature } from "@/lib/services";

const staffNotes = [
  "Share your service category and experience",
  "Continue to WhatsApp for direct follow-up",
  "Keep customer service requests separate"
] as const;

export function WorkWithUsPage() {
  const Icon = jobSeekerFeature.icon;

  return (
    <main className="min-h-screen bg-[#f7fbff] text-brand-ink">
      <SiteHeader tone="dark" />

      <section className="relative overflow-hidden bg-brand-ink px-4 pb-12 pt-28 text-white sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src="/images/services/mission_vision.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-ink/95 to-brand-navy/80" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
            >
              <ArrowLeft size={16} />
              Back to homepage
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
              <BriefcaseBusiness size={16} />
              Staff Network
            </span>
            <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight sm:text-6xl">Work With Us</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/75">
              For professionals who want to offer reliable domestic staffing services through Domestic Staffing Hub.
            </p>

            <div className="mt-8 grid gap-3">
              {staffNotes.map((note) => (
                <div key={note} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <CheckCircle2 size={18} className="shrink-0 text-brand-mint" />
                  <span className="text-sm font-semibold text-white/80">{note}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="grid gap-5 xl:grid-cols-[0.72fr_1fr] xl:items-stretch"
          >
            <div className="grid gap-5">
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <Icon size={25} className="text-brand-gold" />
                <h2 className="mt-5 text-xl font-black">{jobSeekerFeature.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/70">{jobSeekerFeature.description}</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-brand-gold/15 p-5 backdrop-blur">
                <LockKeyhole size={25} className="text-brand-gold" />
                <h2 className="mt-5 text-xl font-black">Private Staff Path</h2>
                <p className="mt-3 text-sm leading-7 text-white/70">
                  Staff interests are handled here so customers stay focused on requesting services.
                </p>
              </div>
              <div className="hidden rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur xl:block">
                <ShieldCheck size={25} className="text-brand-mint" />
                <p className="mt-5 text-sm leading-7 text-white/70">
                  Details are checked before submission, then sent through the dedicated staff-interest flow.
                </p>
              </div>
            </div>

            <WorkWithUsForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
