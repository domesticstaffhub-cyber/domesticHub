"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { WorkWithUsForm } from "@/components/WorkWithUsForm";

export function WorkWithUsPage() {
  return (
    <main className="min-h-dvh overflow-hidden bg-[#f7fbff] text-brand-ink">
      <SiteHeader tone="dark" />

      <section className="relative flex min-h-dvh items-center overflow-hidden bg-brand-ink px-4 pb-5 pt-20 text-white sm:px-6 sm:pt-24 lg:px-8">
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

        <div className="relative mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <div className="mb-6 flex items-center gap-2">
              <Link
                href="/"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 text-xs font-bold text-white backdrop-blur transition hover:bg-white/20 sm:px-4 sm:text-sm"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
                <span className="hidden sm:inline">to homepage</span>
              </Link>
              <span className="hidden h-11 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 text-sm font-bold backdrop-blur sm:inline-flex">
                <BriefcaseBusiness size={16} />
                I Need a Job
              </span>
            </div>
            <h1 className="max-w-2xl text-3xl font-black leading-tight sm:text-6xl">I Need a Job</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:mt-5 sm:text-base sm:leading-8">
              For applicants who want to work with Domestic Staffing Hub as chefs, drivers, home tutors, caregivers, or domestic support staff.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:justify-self-stretch"
          >
            <WorkWithUsForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
