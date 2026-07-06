import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { processSteps, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services | Domestic Staffing Hub",
  description: "Explore chef, driver, tutor, maid, nanny, caregiver, and domestic staffing services."
};

const colorBlocks = [
  "bg-brand-clay",
  "bg-brand-indigo",
  "bg-brand-teal",
  "bg-brand-leaf",
  "bg-brand-saffron"
] as const;

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader />

      <section className="bg-brand-paper px-4 pb-10 pt-24 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-7xl border-b border-brand-line pb-10">
          <div className="max-w-3xl">
            <p className="section-kicker">Services</p>
            <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Reliable domestic staff for everyday home and business needs.
            </h1>
            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Choose from chefs, drivers, tutors, caregivers, and general domestic support. Each request is handled with care, privacy, and clear follow-up.
            </p>
          </div>
        </div>
      </section>

      <section id="service-list" className="bg-brand-bone px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.slug}
                className="grid border border-brand-ink bg-white shadow-soft transition hover:shadow-hard lg:grid-cols-[0.72fr_1.28fr]"
              >
                <div className="relative min-h-[18rem] border-b border-brand-ink lg:border-b-0 lg:border-r">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: service.imagePosition }}
                  />
                  <div className={`absolute left-0 top-0 h-3 w-full ${colorBlocks[index % colorBlocks.length]}`} />
                </div>

                <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_0.72fr]">
                  <div>
                    <span className={`grid h-12 w-12 place-items-center border border-brand-ink text-white ${colorBlocks[index % colorBlocks.length]}`}>
                      <Icon size={23} />
                    </span>
                    <h2 className="mt-5 text-2xl font-black leading-tight">{service.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">{service.detail}</p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="mt-6 inline-flex h-11 items-center gap-2 border border-brand-ink px-4 text-sm font-black transition hover:bg-brand-ink hover:text-brand-bone"
                    >
                      View service
                      <ChevronRight size={16} />
                    </Link>
                  </div>

                  <div className="border-t border-brand-line pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-clay">Popular requests</p>
                    <div className="mt-4 grid gap-3">
                      {service.promise.map((item) => (
                        <div key={item} className="flex items-center gap-3 text-sm font-bold text-brand-ink">
                          <CheckCircle2 size={17} className="shrink-0 text-brand-teal" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-brand-ink px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker text-brand-saffron">How requests move</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">Clear from the first message.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <Icon size={24} className="text-brand-saffron" />
                    <span className="text-sm font-black text-white/50">0{index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-black">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/70">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-clay px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-2xl text-3xl font-black leading-tight">Ready to request staff?</h2>
          <Link
            href="/contact"
            className="inline-flex h-12 w-fit items-center gap-2 border border-white bg-white px-5 text-sm font-black text-brand-ink transition hover:bg-brand-saffron"
          >
            Start Request
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
