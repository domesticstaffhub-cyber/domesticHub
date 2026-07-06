import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { ContactActions } from "@/components/ContactActions";
import { jobSeekerFeature } from "@/lib/services";

export function SiteFooter() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-white via-[#f4fbff] to-[#d8edff] px-4 py-10 text-brand-ink sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] border border-white bg-white/70 p-5 shadow-soft backdrop-blur md:grid-cols-[1fr_0.9fr] lg:items-center lg:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-[1.5rem] bg-white shadow-sm sm:h-32 sm:w-32">
            <Image
              src="/images/services/full_logo.jpeg"
              width={180}
              height={240}
              alt="Domestic Staffing Hub full logo"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div>
            <h2 className="text-2xl font-black sm:text-3xl">Domestic Staffing Hub</h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">
              Quality people, trusted service, and peace of mind for homes, families, and businesses.
            </p>
            <Link
              href="/#about"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-navy transition hover:text-brand-blue"
            >
              Learn about the company
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="rounded-[1.5rem] bg-brand-ink p-5 text-white">
          <ContactActions />
          <div className="mt-5 flex gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-white/75">
            <MapPin size={18} className="mt-1 shrink-0 text-brand-gold" />
            <span>17/103, Enerhen Road, Adjacent Faith Victory Church, Warri</span>
          </div>
          <Link
            href="/work-with-us"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold transition hover:text-white"
          >
            {jobSeekerFeature.title}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
