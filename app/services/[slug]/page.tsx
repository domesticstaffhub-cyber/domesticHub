import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getServiceBySlug, services } from "@/lib/services";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const pageThemes = [
  {
    shell: "from-[#fff8e8] via-white to-[#dff2ff]",
    dark: "from-brand-ink to-brand-navy",
    badge: "bg-brand-gold/20 text-brand-ink",
    ring: "ring-brand-gold/30"
  },
  {
    shell: "from-[#eaf6ff] via-white to-[#e2faef]",
    dark: "from-brand-navy to-brand-ink",
    badge: "bg-brand-blue/10 text-brand-navy",
    ring: "ring-brand-sky/30"
  },
  {
    shell: "from-[#e8fbf3] via-white to-[#fff5df]",
    dark: "from-emerald-950 to-brand-ink",
    badge: "bg-brand-mint/10 text-emerald-800",
    ring: "ring-brand-mint/30"
  }
] as const;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service | Domestic Staffing Hub"
    };
  }

  return {
    title: `${service.title} | Domestic Staffing Hub`,
    description: service.summary,
    openGraph: {
      title: `${service.title} | Domestic Staffing Hub`,
      description: service.summary,
      images: [service.image]
    }
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceIndex = services.findIndex((item) => item.slug === service.slug);
  const theme = pageThemes[Math.max(serviceIndex, 0) % pageThemes.length];
  const Icon = service.icon;
  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <main className={`min-h-screen bg-gradient-to-br ${theme.shell} text-brand-ink`}>
      <SiteHeader tone="light" />

      <section className="relative overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-[38rem] bg-white/45" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <Link
              href="/#services"
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-navy shadow-sm transition hover:text-brand-blue"
            >
              <ChevronRight size={16} className="rotate-180" />
              Back to services
            </Link>
            <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold ${theme.badge}`}>
              <Icon size={16} />
              {service.shortTitle}
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-6xl">{service.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">{service.detail}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/#request"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-ink px-5 text-sm font-bold text-white transition hover:bg-brand-navy"
              >
                Request this service
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className={`absolute -inset-3 rounded-[2.3rem] bg-gradient-to-br ${theme.dark} opacity-[0.12] blur-2xl`} />
            <div className={`relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-glow ring-8 ${theme.ring}`}>
              <div className="relative min-h-[22rem] overflow-hidden rounded-[1.55rem] sm:min-h-[31rem]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 48vw, 92vw"
                  className="object-cover"
                  style={{ objectPosition: service.imagePosition }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <article className="rounded-[1.6rem] bg-white p-6 shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-blue">Best for</p>
          <p className="mt-4 text-lg font-black leading-7">{service.audience}</p>
        </article>
        <article className="rounded-[1.6rem] bg-brand-ink p-6 text-white shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-gold">How we guide</p>
          <p className="mt-4 text-sm leading-7 text-white/75">{service.process}</p>
        </article>
        <article className="rounded-[1.6rem] bg-white p-6 shadow-soft">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-emerald-700">Assurance</p>
          <p className="mt-4 text-sm leading-7 text-slate-600">{service.assurance}</p>
        </article>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-2 text-sm font-bold text-brand-navy">
              <ShieldCheck size={16} />
              What you can request
            </span>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.services.map((item) => (
                <div
                  key={item}
                  className="flex min-h-20 items-center gap-3 rounded-[1.2rem] border border-slate-100 bg-[#f7fbff] p-4 text-sm font-semibold text-brand-ink"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-brand-mint" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <aside className={`rounded-[2rem] bg-gradient-to-br ${theme.dark} p-6 text-white shadow-soft sm:p-7`}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-brand-gold">
              <Sparkles size={16} />
              Why clients choose this
            </span>
            <div className="mt-6 grid gap-4">
              {service.highlights.map((item) => (
                <div key={item} className="rounded-[1.2rem] border border-white/10 bg-white/10 p-4">
                  <p className="font-bold">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-white/70">
              Share your exact need once. The team uses that context to follow up clearly and help you choose the most suitable support.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.14em] text-brand-navy">Explore more</p>
            <h2 className="mt-2 text-3xl font-black">Other service paths</h2>
          </div>
          <Link href="/#request" className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-blue">
            Ready to request staff
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {otherServices.map((item) => {
            const OtherIcon = item.icon;

            return (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group rounded-[1.35rem] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-blue/10 text-brand-navy">
                  <OtherIcon size={21} />
                </span>
                <h3 className="mt-5 text-base font-black">{item.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{item.summary}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
