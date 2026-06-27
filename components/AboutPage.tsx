import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { companyStory, services } from "@/lib/services";

export function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7fbff] text-brand-ink">
      <SiteHeader tone="dark" />

      <section className="relative overflow-hidden bg-brand-ink px-4 pb-16 pt-28 text-white sm:px-6 sm:pb-20 sm:pt-32 lg:px-8">
        <div className="absolute inset-0">
          <Image
            src="/images/services/mission_vision.jpeg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-ink/90 to-brand-navy/70" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
              <Sparkles size={16} />
              About Domestic Staffing Hub
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">
              Trusted domestic support, handled with care.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75">{companyStory.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/#request"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-brand-ink transition hover:bg-brand-gold"
              >
                Request Staff
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/#services"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                View Services
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {companyStory.values.map((value, index) => (
              <div
                key={value}
                className={`rounded-[1.5rem] border border-white/10 p-5 backdrop-blur ${
                  index % 2 === 0 ? "bg-white/10" : "bg-brand-gold/15"
                }`}
              >
                <BadgeCheck className={index % 2 === 0 ? "text-brand-mint" : "text-brand-gold"} size={23} />
                <p className="mt-4 text-lg font-black">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <article className="rounded-[2rem] bg-white p-6 shadow-soft sm:p-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-mint/10 text-brand-mint">
            <HeartHandshake size={24} />
          </span>
          <h2 className="mt-6 text-3xl font-black">Our Mission</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">{companyStory.mission}</p>
        </article>

        <article className="rounded-[2rem] bg-brand-ink p-6 text-white shadow-soft sm:p-8">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-gold">
            <ShieldCheck size={24} />
          </span>
          <h2 className="mt-6 text-3xl font-black">Our Vision</h2>
          <p className="mt-4 text-sm leading-7 text-white/70">{companyStory.vision}</p>
        </article>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-2 text-sm font-bold text-brand-navy">
                Service Focus
              </span>
              <h2 className="mt-4 text-3xl font-black sm:text-4xl">What we help clients arrange</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              The platform keeps the client experience simple while giving each request a clear path for follow-up.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group rounded-[1.35rem] border border-slate-100 bg-[#f7fbff] p-5 transition hover:-translate-y-1 hover:border-brand-sky/40 hover:shadow-soft"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-brand-navy shadow-sm">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-base font-black">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{service.summary}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
