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

const colorBlocks = [
  "bg-brand-clay",
  "bg-brand-indigo",
  "bg-brand-teal",
  "bg-brand-leaf",
  "bg-brand-saffron"
] as const;

const serviceLabels = ["Chef", "Driver", "Home Tutor", "Caregiver", "Hospitality"];

export function GalleryShowcase({ mode = "home" }: GalleryShowcaseProps) {
  const limit = mode === "home" ? 4 : 60;
  const [items, setItems] = useState<GalleryDisplayItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    let active = true;

    async function loadGallery() {
      try {
        const response = await fetch(`/api/gallery?limit=${limit}`, { cache: "no-store" });
        const result = await response.json();

        if (active) {
          setItems(Array.isArray(result.items) ? result.items : []);
        }
      } catch {
        if (active) {
          setItems([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadGallery();

    return () => {
      active = false;
    };
  }, [limit]);

  if (!loading && !items.length) {
    return <GalleryEmptyState />;
  }

  if (loading && !items.length) {
    return (
      <section className="bg-brand-paper px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl place-items-center border border-brand-line bg-brand-bone p-10 text-center shadow-soft">
          <Clock3 size={28} className="animate-pulse text-brand-teal" />
          <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-stone-500">Checking gallery updates</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-brand-paper px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Gallery</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
              Recent service moments from Domestic Staffing Hub.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-stone-600 md:text-right">
            A closer look at verified updates shared by the team.
          </p>
        </div>

        <div className={`grid gap-4 sm:grid-cols-2 ${mode === "home" ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {items.map((item, index) => (
            <motion.figure
              key={item.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: (index % 4) * 0.05 }}
              className={`group border border-brand-ink bg-white shadow-soft ${mode === "home" && index % 2 === 1 ? "lg:mt-10" : ""}`}
            >
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="relative block min-h-[18rem] w-full overflow-hidden border-b border-brand-ink bg-brand-bone text-left"
              >
                <img
                  src={item.imageData}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className={`absolute left-0 top-0 h-2 w-full ${colorBlocks[index % colorBlocks.length]}`} />
                <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center border border-white/30 bg-brand-ink/80 text-white backdrop-blur transition group-hover:bg-brand-saffron group-hover:text-brand-ink">
                  <Maximize2 size={17} />
                </span>
              </button>
              <figcaption className="flex min-h-16 items-center justify-between gap-3 p-4">
                <span>
                  <span className="block text-xs font-black uppercase tracking-[0.16em] text-brand-clay">
                    {item.category}
                  </span>
                  <span className="mt-1 block text-sm font-black">{item.title}</span>
                </span>
                <Camera size={18} className="shrink-0 text-brand-teal" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      {activeItem ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-brand-ink/80 px-4 py-6 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-auto border border-brand-ink bg-white shadow-hard">
            <div className="flex items-start justify-between gap-4 border-b border-brand-line p-4 sm:p-5">
              <div>
                <p className="section-kicker">{activeItem.category}</p>
                <h3 className="mt-1 text-xl font-black leading-tight">{activeItem.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveIndex(null)}
                className="grid h-10 w-10 shrink-0 place-items-center border border-brand-line transition hover:border-brand-ink"
                aria-label="Close gallery preview"
              >
                <X size={19} />
              </button>
            </div>
            <div className="relative bg-brand-bone">
              <img src={activeItem.imageData} alt={activeItem.title} className="max-h-[68vh] w-full object-contain" />
              {items.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((value) => (value === null ? 0 : (value - 1 + items.length) % items.length))}
                    className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/40 bg-brand-ink/80 text-white backdrop-blur transition hover:bg-brand-saffron hover:text-brand-ink"
                    aria-label="Previous gallery image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((value) => (value === null ? 0 : (value + 1) % items.length))}
                    className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center border border-white/40 bg-brand-ink/80 text-white backdrop-blur transition hover:bg-brand-saffron hover:text-brand-ink"
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
    <section className="bg-brand-paper px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 border border-brand-ink bg-brand-bone p-6 shadow-hard lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:p-8">
        <div>
          <p className="section-kicker">Gallery</p>
          <h2 className="mt-3 max-w-xl text-3xl font-black leading-tight sm:text-4xl">
            Gallery updates will soon be available.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600">
            Domestic Staffing Hub is preparing real service photos and verified updates for this space.
          </p>
        </div>

        <div className="relative min-h-[22rem] overflow-hidden border border-brand-ink bg-brand-ink p-5 text-white">
          <div className="absolute left-0 top-0 h-3 w-full kinetic-strip" />
          <motion.div
            className="absolute right-5 top-5 grid h-14 w-14 place-items-center border border-white/20 bg-white/10"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={24} className="text-brand-saffron" />
          </motion.div>

          <div className="grid h-full content-end gap-4 pt-14">
            {serviceLabels.map((label, index) => (
              <motion.div
                key={label}
                className="grid grid-cols-[auto_1fr] items-center gap-3 border border-white/10 bg-white/5 p-3"
                initial={{ opacity: 0.25, x: 18 }}
                animate={{ opacity: [0.35, 1, 0.35], x: [18, 0, 18] }}
                transition={{ duration: 2.8, delay: index * 0.18, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className={`h-9 w-9 ${colorBlocks[index % colorBlocks.length]}`} />
                <span>
                  <span className="block h-2 w-20 bg-white/70" />
                  <span className="mt-2 block text-xs font-black uppercase tracking-[0.16em] text-white/50">{label}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
