"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, Clock3, Maximize2, Sparkles, X } from "lucide-react";

type GalleryDisplayItem = {
  id: string;
  title: string;
  category: string;
  imageData: string;
};

type GalleryShowcaseProps = {
  mode?: "home" | "page";
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 }
};

const serviceLabels = ["Chef", "Driver", "Home Tutor", "Caregiver", "Hospitality"];

const serviceDots = ["bg-brand-blue", "bg-brand-gold", "bg-brand-sky", "bg-brand-mint", "bg-brand-navy"] as const;

export function GalleryShowcase({ mode = "home" }: GalleryShowcaseProps) {
  const limit = mode === "home" ? 4 : 60;
  const refreshMs = mode === "home" ? 45_000 : 30_000;
  const [items, setItems] = useState<GalleryDisplayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    let active = true;

    async function loadGallery(showLoading = false) {
      if (showLoading && active) {
        setLoading(true);
      }

      try {
        const response = await fetch(`/api/gallery?limit=${limit}`, { cache: "no-store" });
        const result = await response.json();

        if (active) {
          setItems(Array.isArray(result.items) ? result.items : []);
        }
      } catch {
        if (active && showLoading) {
          setItems([]);
        }
      } finally {
        if (active && showLoading) {
          setLoading(false);
        }
      }
    }

    loadGallery(true);

    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        loadGallery();
      }
    }, refreshMs);

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [limit, refreshMs]);

  if (!loading && !items.length) {
    return <GalleryEmptyState />;
  }

  if (loading && !items.length) {
    return (
      <section className="bg-[#f7fbff] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl place-items-center rounded-[2rem] border border-white bg-white/85 p-10 text-center shadow-soft backdrop-blur">
          <Clock3 size={28} className="animate-pulse text-brand-blue" />
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Checking gallery updates</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f7fbff] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-blue">Gallery</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight text-brand-ink sm:text-4xl">
              Recent service moments from Domestic Staffing Hub.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 md:text-right">
            A closer look at verified updates shared by the team.
          </p>
        </div>

        <div className={`grid gap-5 sm:grid-cols-2 ${mode === "home" ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {items.map((item, index) => (
            <motion.figure
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: (index % 4) * 0.05 }}
              className={`group overflow-hidden rounded-[2rem] border border-white bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-glow ${
                mode === "home" && index % 2 === 1 ? "lg:mt-8" : ""
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="relative block aspect-[4/3] w-full overflow-hidden bg-slate-100 text-left"
              >
                <img
                  src={item.imageData}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-brand-ink shadow-soft backdrop-blur transition group-hover:bg-brand-gold">
                  <Maximize2 size={17} />
                </span>
              </button>
              <figcaption className="flex min-h-16 items-center justify-between gap-3 p-4">
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">
                    {item.category}
                  </span>
                  <span className="mt-1 block text-sm font-black text-brand-ink">{item.title}</span>
                </span>
                <Camera size={18} className="shrink-0 text-brand-gold" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {activeItem ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-brand-ink/75 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-auto rounded-[2rem] bg-white shadow-soft">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-4 sm:p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-blue">{activeItem.category}</p>
                <h3 className="mt-1 text-xl font-black leading-tight text-brand-ink">{activeItem.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-brand-blue/10 hover:text-brand-navy"
                aria-label="Close gallery preview"
              >
                <X size={19} />
              </button>
            </div>
            <div className="relative bg-slate-50">
              <img src={activeItem.imageData} alt={activeItem.title} className="max-h-[68vh] w-full object-contain" />
              {items.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((value) => (value === null ? 0 : (value - 1 + items.length) % items.length))}
                    className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-ink shadow-soft backdrop-blur transition hover:bg-brand-gold"
                    aria-label="Previous gallery image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((value) => (value === null ? 0 : (value + 1) % items.length))}
                    className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-ink shadow-soft backdrop-blur transition hover:bg-brand-gold"
                    aria-label="Next gallery image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function GalleryEmptyState() {
  return (
    <section className="bg-[#f7fbff] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 overflow-hidden rounded-[2rem] border border-white bg-white/85 p-6 shadow-soft backdrop-blur lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-blue">Gallery</p>
          <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight text-brand-ink sm:text-4xl">
            Gallery updates will soon be available.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
            Domestic Staffing Hub is preparing real service photos and verified updates for this space.
          </p>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-brand-ink p-5 text-white shadow-glow">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-ink via-brand-ink/92 to-brand-navy/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_16%,rgba(244,182,63,.24),transparent_26%),radial-gradient(circle_at_14%_86%,rgba(73,183,245,.22),transparent_30%)]" />
          <motion.div
            className="absolute right-5 top-5 grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-brand-gold backdrop-blur"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={24} />
          </motion.div>

          <div className="relative grid h-full content-center gap-4 pt-14">
            {serviceLabels.map((label, index) => (
              <motion.div
                key={label}
                className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-2xl border border-white/10 bg-white/8 p-3 backdrop-blur"
                initial={{ opacity: 0.35, x: 18 }}
                animate={{ opacity: [0.45, 1, 0.45], x: [18, 0, 18] }}
                transition={{ duration: 2.8, delay: index * 0.18, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className={`h-9 w-9 rounded-xl ${serviceDots[index % serviceDots.length]}`} />
                <span>
                  <span className="block h-2 w-20 rounded-full bg-white/65" />
                  <span className="mt-2 block text-xs font-bold uppercase tracking-[0.16em] text-white/60">{label}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
