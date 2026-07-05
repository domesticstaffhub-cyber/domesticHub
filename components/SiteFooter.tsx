import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { ContactActions } from "@/components/ContactActions";
import { contact } from "@/lib/contact";
import { jobSeekerFeature, navLinks, services } from "@/lib/services";

export function SiteFooter() {
  return (
    <footer className="bg-brand-ink px-4 py-12 text-brand-bone sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr_0.7fr]">
        <div>
          <div className="flex items-center gap-4">
            <Image
              src="/images/services/full_logo.jpeg"
              width={96}
              height={120}
              alt="Domestic Staffing Hub full logo"
              className="h-24 w-20 border border-white/10 object-cover object-top"
            />
            <div>
              <p className="section-kicker text-brand-saffron">Domestic Staffing Hub</p>
              <h2 className="mt-2 max-w-md text-2xl font-black leading-tight text-white">
                Quality people, trusted service, and peace of mind.
              </h2>
            </div>
          </div>

          <p className="mt-6 max-w-xl text-sm leading-7 text-white/70">
            Dependable domestic staffing for homes, families, restaurants, hotels, and businesses that need trusted hands.
          </p>

          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 border border-white/20 px-4 py-3 text-sm font-black text-white transition hover:border-brand-saffron hover:text-brand-saffron"
          >
            Read the company story
            <ArrowRight size={16} />
          </Link>
        </div>

        <div>
          <p className="section-kicker text-brand-saffron">Contact</p>
          <div className="mt-5">
            <ContactActions />
          </div>
          <a
            href={`mailto:${contact.email}`}
            className="mt-5 flex gap-3 border border-white/10 bg-white/5 p-4 text-sm font-bold leading-6 text-white/80 transition hover:border-brand-saffron hover:text-brand-saffron"
          >
            <Mail size={18} className="mt-1 shrink-0" />
            <span>{contact.email}</span>
          </a>
          <div className="mt-5 flex gap-3 border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/70">
            <MapPin size={18} className="mt-1 shrink-0 text-brand-saffron" />
            <span>17/103, Enerhen Road, Adjacent Faith Victory Church, Warri</span>
          </div>
          <Link
            href="/work-with-us"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-black text-brand-saffron transition hover:text-white"
          >
            {jobSeekerFeature.title}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <p className="section-kicker text-brand-saffron">Pages</p>
            <div className="mt-4 grid gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-bold text-white/70 transition hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="section-kicker text-brand-saffron">Services</p>
            <div className="mt-4 grid gap-2">
              {services.slice(0, 4).map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="text-sm font-bold text-white/70 transition hover:text-white"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
