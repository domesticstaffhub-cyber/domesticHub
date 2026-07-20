"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, RefreshCw, ShieldAlert } from "lucide-react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-[#f7fbff] via-white to-[#dff0ff] px-4 py-10 text-brand-ink sm:px-6">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-soft lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative bg-brand-ink p-6 text-white sm:p-8 lg:p-10">
          <div className="kinetic-strip absolute inset-x-0 top-0 h-4" aria-hidden="true" />
          <div className="mt-8 grid h-20 w-20 place-items-center overflow-hidden rounded-[1.5rem] bg-white shadow-sm">
            <Image
              src="/images/brand/logo.jpeg"
              width={96}
              height={96}
              alt="Domestic Staffing Hub logo"
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-brand-gold">Domestic Staffing Hub</p>
          <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">Something needs attention.</h1>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/75">
            The page did not load properly. Try again, or return home and continue from there.
          </p>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
            <ShieldAlert size={25} />
          </span>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-brand-blue">Website error</p>
          <h2 className="mt-3 text-3xl font-black leading-tight text-brand-ink">Please refresh this page.</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            If the issue continues, use the homepage contact options so the team can still help with your request.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-ink px-6 text-sm font-bold text-white transition hover:bg-brand-navy"
            >
              <RefreshCw size={17} />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brand-ink/10 bg-white px-6 text-sm font-bold text-brand-ink transition hover:border-brand-blue/30 hover:text-brand-blue"
            >
              <Home size={17} />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
