import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getServiceBySlug, services } from "@/lib/services";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const colorBlocks = [
  "bg-brand-clay",
  "bg-brand-indigo",
  "bg-brand-teal",
  "bg-brand-leaf",
  "bg-brand-saffron"
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
  const accent = colorBlocks[Math.max(serviceIndex, 0) % colorBlocks.length];
  const Icon = service.icon;
  const otherServices = services.filter((item) => item.slug !== service.slug);

  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader />

      <section className="grid bg-brand-bone pt-[72px] lg:min-h-[90svh] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex items-end px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-xl lg:ml-auto">
            <Link
              href="/services"
              className="mb-7 flex w-fit items-center gap-2 text-sm font-black text-brand-ink transition hover:text-brand-clay"
            >
              <ArrowLeft size={16} />
              Services
            </Link>
            <span className={`inline-flex items-center gap-2 border border-brand-ink px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-white ${accent}`}>
              <Icon size={15} />
              {service.shortTitle}
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">{service.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600">{service.detail}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 border border-brand-ink bg-brand-ink px-5 text-sm font-black text-brand-bone transition hover:bg-brand-clay"
              >
                Request this service
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 border border-brand-line bg-white px-5 text-sm font-black text-brand-ink transition hover:border-brand-ink"
              >
                <MessageCircle size={17} />
                Contact team
              </Link>
            </div>
          </div>
        </div>

        <div className="relative min-h-[28rem] border-t border-brand-ink lg:border-l lg:border-t-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 54vw, 100vw"
            className="object-cover"
            style={{ objectPosition: service.imagePosition }}
            priority
          />
          <div className={`absolute left-0 top-0 h-3 w-full ${accent}`} />
        </div>
      </section>

      <section className="surface-grid px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          <article className="border border-brand-ink bg-brand-bone p-6 shadow-soft">
            <p className="section-kicker">Best for</p>
            <p className="mt-4 text-lg font-black leading-7">{service.audience}</p>
          </article>
          <article className="border border-brand-ink bg-brand-ink p-6 text-white shadow-soft">
            <p className="section-kicker text-brand-saffron">Approach</p>
            <p className="mt-4 text-sm leading-7 text-white/75">{service.process}</p>
          </article>
          <article className="border border-brand-ink bg-white p-6 shadow-soft">
            <p className="section-kicker">Assurance</p>
            <p className="mt-4 text-sm leading-7 text-stone-600">{service.assurance}</p>
          </article>
        </div>
      </section>

      <section className="bg-brand-bone px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="section-kicker">What you can request</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">Service options for this need.</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {service.services.map((item) => (
                <div key={item} className="flex min-h-20 items-center gap-3 border border-brand-line bg-white p-4 text-sm font-bold">
                  <CheckCircle2 size={18} className="shrink-0 text-brand-teal" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <aside className="border border-brand-ink bg-brand-ink p-6 text-white shadow-hard sm:p-7">
            <Sparkles size={25} className="text-brand-saffron" />
            <h2 className="mt-5 text-2xl font-black leading-tight">Why clients choose this service</h2>
            <div className="mt-6 grid gap-3">
              {service.highlights.map((item) => (
                <div key={item} className="border border-white/10 bg-white/5 p-4">
                  <p className="font-black">{item}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-white/70">
              Share the details once and the team will guide the most suitable next step.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-brand-paper px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Explore more</p>
              <h2 className="mt-2 text-2xl font-black">Other services</h2>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-black text-brand-ink hover:text-brand-clay">
              Request staff
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
                  className="group border border-brand-line bg-brand-bone p-5 transition hover:border-brand-ink hover:bg-white"
                >
                  <OtherIcon size={23} className="text-brand-clay" />
                  <h3 className="mt-5 text-base font-black">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-600">{item.summary}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-teal px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={24} className="text-brand-saffron" />
            <h2 className="text-2xl font-black leading-tight">Ready to begin?</h2>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-12 w-fit items-center gap-2 border border-white bg-white px-5 text-sm font-black text-brand-ink transition hover:bg-brand-saffron"
          >
            Request Staff
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
