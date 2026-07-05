"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness } from "lucide-react";
import { WorkWithUsForm } from "@/components/WorkWithUsForm";

export function WorkWithUsPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <section className="grid min-h-screen bg-brand-bone lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative hidden border-r border-brand-ink lg:block">
          <Image
            src="/images/services/full_logo.jpeg"
            alt="Domestic Staffing Hub logo"
            fill
            sizes="48vw"
            className="object-cover object-top"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 h-3 kinetic-strip" />
        </div>

        <div className="flex min-h-screen items-center px-4 py-10 sm:px-6 lg:px-10">
          <div className="mx-auto w-full max-w-xl">
            <Link
              href="/"
              className="mb-8 flex w-fit items-center gap-2 text-sm font-black text-brand-ink transition hover:text-brand-clay"
            >
              <ArrowLeft size={16} />
              Main website
            </Link>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Image
                src="/images/services/full_logo.jpeg"
                width={96}
                height={120}
                alt="Domestic Staffing Hub logo"
                className="h-24 w-20 border border-brand-line object-cover object-top shadow-soft"
                priority
              />
              <div className="grid gap-3">
                <p className="section-kicker">Domestic Staffing Hub</p>
                <span className="flex w-fit items-center gap-2 border border-brand-ink bg-brand-saffron px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-brand-ink">
                  <BriefcaseBusiness size={15} />
                  I Need a Job
                </span>
              </div>
            </div>
            <h1 className="mt-5 max-w-lg text-4xl font-black leading-tight sm:text-5xl">I Need a Job.</h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-stone-600">
              Fill this short form with your name and the domestic service you can provide.
            </p>

            <div className="mt-8">
              <WorkWithUsForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
