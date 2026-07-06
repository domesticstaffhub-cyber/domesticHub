import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GalleryShowcase } from "@/components/GalleryShowcase";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Gallery | Domestic Staffing Hub",
  description: "View live service pictures from Domestic Staffing Hub."
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#f7fbff] text-brand-ink">
      <SiteHeader />

      <section className="bg-mesh-light px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-blue">Gallery</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-brand-ink sm:text-4xl">
              Real service moments will live here.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              Domestic Staffing Hub will share approved gallery photos here as the admin team adds them.
            </p>
          </div>
          <Link
            href="/#request"
            className="inline-flex h-11 w-fit items-center gap-2 rounded-full bg-brand-ink px-4 text-sm font-bold text-white transition hover:bg-brand-navy"
          >
            Request Staff
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <GalleryShowcase mode="page" />

      <SiteFooter />
    </main>
  );
}
