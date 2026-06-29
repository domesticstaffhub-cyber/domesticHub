import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { companyStory, stats, trustSignals } from "@/lib/services";

export const metadata: Metadata = {
  title: "About | Domestic Staffing Hub",
  description: "Learn about Domestic Staffing Hub, a domestic staffing service for homes, families, and businesses."
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader />

      <section className="grid min-h-[86svh] bg-brand-ink text-white lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex items-end px-4 pb-14 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <div className="mx-auto w-full max-w-xl lg:ml-auto">
            <p className="section-kicker text-brand-saffron">About</p>
            <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Domestic service with a human standard.</h1>
            <p className="mt-6 text-base leading-8 text-white/75">{companyStory.intro}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center gap-2 border border-brand-saffron bg-brand-saffron px-5 text-sm font-black text-brand-ink transition hover:bg-white"
            >
              Request Staff
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <div className="relative min-h-[28rem] overflow-hidden border-t border-white/10 bg-white px-5 py-8 text-brand-ink sm:px-8 lg:border-l lg:border-t-0">
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(160deg,transparent_20%,rgba(20,149,211,.16)_21%,rgba(20,149,211,.16)_34%,transparent_35%),linear-gradient(170deg,transparent_42%,rgba(8,46,138,.14)_43%,rgba(8,46,138,.14)_56%,transparent_57%)]" />
          <div className="absolute right-6 top-6 text-right text-2xl font-black leading-none text-brand-saffron">
            Domestic
            <br />
            <span className="text-brand-ink">Staffing</span>
            <span className="ml-1 bg-brand-ink px-1.5 py-0.5 text-xl text-white">HUB</span>
          </div>

          <div className="relative mx-auto grid h-full max-w-3xl content-center gap-10 pt-20">
            <div>
              <h2 className="relative inline-block text-3xl font-light leading-none text-brand-saffron sm:text-4xl">
                Our Mission
                <span className="absolute -bottom-3 left-1/3 h-2 w-2/3 -rotate-6 bg-brand-saffron/35" />
              </h2>
              <p className="mt-7 max-w-2xl text-base font-semibold leading-7 text-brand-coal sm:text-lg">
                {companyStory.mission}
              </p>
            </div>

            <div className="ml-auto max-w-2xl text-right">
              <h2 className="relative inline-block text-3xl font-light leading-none text-brand-ink sm:text-4xl">
                Our Vision
                <span className="absolute -bottom-3 left-1/3 h-2 w-2/3 -rotate-6 bg-brand-saffron/35" />
              </h2>
              <p className="mt-7 text-base font-semibold leading-7 text-brand-coal sm:text-lg">
                {companyStory.vision}
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-3 kinetic-strip" />
        </div>
      </section>

      <section className="surface-grid px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="border border-brand-ink bg-brand-bone p-5 shadow-soft">
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-stone-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-bone px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <article className="border border-brand-ink bg-white p-6 shadow-soft sm:p-8">
            <Sparkles size={28} className="text-brand-clay" />
            <p className="mt-8 section-kicker">Mission</p>
            <h2 className="mt-3 text-2xl font-black leading-snug">{companyStory.mission}</h2>
          </article>
          <article className="border border-brand-ink bg-brand-ink p-6 text-white shadow-soft sm:p-8">
            <ShieldCheck size={28} className="text-brand-saffron" />
            <p className="mt-8 section-kicker text-brand-saffron">Vision</p>
            <h2 className="mt-3 text-2xl font-black leading-snug">{companyStory.vision}</h2>
          </article>
        </div>
      </section>

      <section className="bg-brand-paper px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="section-kicker">Standards</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">What the brand should feel like.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {trustSignals.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="border border-brand-line bg-brand-bone p-5">
                  <Icon size={24} className="text-brand-teal" />
                  <h3 className="mt-5 text-lg font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-bone px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
          {companyStory.values.map((value) => (
            <div key={value} className="flex items-center gap-3 border border-brand-ink bg-white p-5">
              <CheckCircle2 size={18} className="shrink-0 text-brand-teal" />
              <span className="text-sm font-black uppercase tracking-[0.13em]">{value}</span>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
