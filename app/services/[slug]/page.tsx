import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { getServiceBySlug, services } from "@/lib/services";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

  const Icon = service.icon;

  return (
    <main className="min-h-screen bg-[#f7fbff] text-brand-ink">
      <section className="relative overflow-hidden bg-brand-ink px-4 py-6 text-white sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(73,183,245,.24),transparent_30%),radial-gradient(circle_at_12%_80%,rgba(244,182,63,.2),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl">
          <nav className="flex items-center justify-between py-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/brand/logo.jpeg"
                width={48}
                height={48}
                alt="Domestic Staffing Hub logo"
                className="h-12 w-12 rounded-2xl object-cover"
                priority
              />
              <span className="text-sm font-bold uppercase tracking-[0.18em]">Domestic Staffing Hub</span>
            </Link>
            <Link
              href="/#services"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
            >
              <ArrowLeft size={17} />
              Services
            </Link>
          </nav>

          <div className="grid gap-10 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
                <Icon size={16} />
                {service.shortTitle}
              </span>
              <h1 className="text-5xl font-black leading-tight sm:text-6xl">{service.title}</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/78">{service.detail}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/#request"
                  className="inline-flex h-[52px] items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-brand-ink transition hover:bg-brand-gold"
                >
                  Request Service
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  <MessageCircle size={18} />
                  Contact
                </Link>
              </div>
            </div>
            <div className="relative min-h-[460px] overflow-hidden rounded-[2rem] shadow-glow">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="object-cover object-top"
                style={{ objectPosition: service.imagePosition }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8">
        <div className="rounded-[2rem] bg-white p-6 shadow-soft">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-blue/10 px-4 py-2 text-sm font-bold text-brand-navy">
            <ShieldCheck size={16} />
            What You Can Request
          </span>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {service.services.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-brand-ink">
                <CheckCircle2 size={18} className="shrink-0 text-brand-mint" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-brand-ink p-6 text-white shadow-soft">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-brand-gold">
            Why Clients Choose Us
          </span>
          <div className="mt-6 grid gap-4">
            {service.highlights.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-base font-bold">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-white/70">
            Every request is handled with care, discretion, and attention to the exact support you need.
          </p>
        </div>
      </section>
    </main>
  );
}
