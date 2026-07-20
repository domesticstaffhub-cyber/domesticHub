import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home, MessageCircle, RefreshCw, ShieldAlert } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Service Temporarily Unavailable | Domestic Staffing Hub",
  description: "Domestic Staffing Hub is temporarily unavailable. Please try again shortly or contact the team."
};

export default function ServiceUnavailablePage() {
  return (
    <main className="min-h-screen bg-[#f7fbff] text-brand-ink">
      <SiteHeader />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#f7fbff] via-white to-[#dff0ff] px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-20 bg-brand-ink" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[70vh] max-w-7xl items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-[2rem] bg-white/80 p-6 shadow-soft backdrop-blur sm:p-8 lg:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-brand-blue">
              <ShieldAlert size={15} />
              Service status
            </span>
            <h1 className="mt-5 text-4xl font-black leading-tight text-brand-ink sm:text-5xl">We will be right back.</h1>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">
              The website is temporarily unavailable. Please try again shortly, or contact Domestic Staffing Hub directly for urgent service requests.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-ink px-6 text-sm font-bold text-white transition hover:bg-brand-navy"
              >
                <ArrowLeft size={17} />
                Back to Home
              </Link>
              <Link
                href="/#contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brand-ink/10 bg-white px-6 text-sm font-bold text-brand-ink transition hover:border-brand-blue/30 hover:text-brand-blue"
              >
                <MessageCircle size={17} />
                Contact Team
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-brand-ink p-4 text-white shadow-soft sm:p-5">
            <div className="kinetic-strip h-4 rounded-full" />
            <div className="mt-5 grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/10 p-5 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="text-7xl font-black leading-none text-white sm:text-8xl">503</span>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand-blue">
                  <RefreshCw size={25} />
                </span>
              </div>
              <div className="grid gap-3">
                {["Checking connection", "Protecting requests", "Restoring access"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-sm font-black">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-white/85">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/"
                className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-brand-gold transition hover:text-white"
              >
                <Home size={16} />
                Return to Domestic Staffing Hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
