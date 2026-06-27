"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BriefcaseBusiness, LockKeyhole } from "lucide-react";
import { WorkWithUsForm } from "@/components/WorkWithUsForm";
import { jobSeekerFeature } from "@/lib/services";

export function WorkWithUsPage() {
  const Icon = jobSeekerFeature.icon;

  return (
    <main className="min-h-screen bg-mesh-light text-brand-ink">
      <section className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-[820px] bg-brand-ink lg:h-[760px]" />
        <div className="relative mx-auto max-w-7xl">
          <nav className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3 text-white">
              <Image
                src="/images/brand/logo.jpeg"
                width={50}
                height={50}
                alt="Domestic Staffing Hub logo"
                className="h-12 w-12 rounded-2xl object-cover"
                priority
              />
              <span className="text-sm font-bold uppercase tracking-[0.18em]">Domestic Staffing Hub</span>
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              <ArrowLeft size={17} />
              Home
            </Link>
          </nav>

          <div className="grid gap-8 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="text-white"
            >
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
                <BriefcaseBusiness size={16} />
                Staff Network
              </span>
              <h1 className="text-5xl font-black leading-tight sm:text-6xl">Work With Us</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/76">
                A separate intake page for people who want to offer professional domestic staffing services through the
                company.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <Icon size={24} className="text-brand-gold" />
                  <h2 className="mt-4 text-lg font-bold">{jobSeekerFeature.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/70">{jobSeekerFeature.description}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <LockKeyhole size={24} className="text-brand-mint" />
                  <h2 className="mt-4 text-lg font-bold">Separate From Customers</h2>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    The main website remains focused on customer service requests while staff interests continue through
                    WhatsApp.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              <WorkWithUsForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
