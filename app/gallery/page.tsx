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
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader />

      <section className="bg-brand-ink px-4 pb-12 pt-28 text-white sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker text-brand-saffron">Gallery</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
              Real moments from domestic staffing support.
            </h1>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-11 w-fit items-center gap-2 border border-white bg-white px-4 text-sm font-black text-brand-ink transition hover:bg-brand-saffron"
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
