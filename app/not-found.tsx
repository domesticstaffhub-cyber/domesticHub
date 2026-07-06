import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f7fbff] text-brand-ink">
      <SiteHeader />

      <section className="grid min-h-[72vh] place-items-center bg-mesh-light px-4 pb-16 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-white bg-white/80 p-6 text-center shadow-soft backdrop-blur md:p-10">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-blue/10 text-brand-blue">
            <Home size={26} />
          </span>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-brand-blue">Page not found</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
            This page is not available.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
            The page may have moved, or the link may be incorrect. Return home to continue with Domestic Staffing Hub.
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-ink px-6 text-sm font-bold text-white transition hover:bg-brand-navy"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
