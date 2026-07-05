"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Images, Maximize2, X } from "lucide-react";
import { services } from "@/lib/services";

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

function fallbackItems(limit: number): GalleryDisplayItem[] {
  return services.slice(0, limit).map((service) => ({
    id: service.slug,
    title: service.title,
    category: "Service moment",
    imageData: service.image
  }));
}

export function GalleryShowcase({ mode = "home" }: GalleryShowcaseProps) {
  const limit = mode === "home" ? 4 : 60;
  const fallback = useMemo(() => fallbackItems(mode === "home" ? 4 : services.length), [mode]);
  const [items, setItems] = useState<GalleryDisplayItem[]>(fallback);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeItem = activeIndex === null ? null : items[activeIndex];

  useEffect(() => {
    let active = true;

    async function loadGallery() {
      try {
        const response = await fetch(`/api/gallery?limit=${limit}`, { cache: "no-store" });
        const result = await response.json();

        if (active && Array.isArray(result.items) && result.items.length) {
          setItems(result.items);
        }
      } catch {
        if (active) {
          setItems(fallback);
        }
      }
    }

    loadGallery();

    return () => {
      active = false;
    };
  }, [fallback, limit]);

  return (
    <section className="bg-brand-paper px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Gallery</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
              Live pictures from service moments.
            </h2>
          </div>
          <div className="grid gap-4 md:justify-items-end">
            <p className="max-w-xl text-sm leading-7 text-stone-600">
              A closer look at the kind of domestic, hospitality, learning, and care support clients request.
            </p>
            {mode === "home" ? (
              <Link
                href="/gallery"
                className="inline-flex h-11 w-fit items-center gap-2 border border-brand-ink bg-brand-bone px-4 text-sm font-black text-brand-ink transition hover:bg-brand-ink hover:text-white"
              >
                View Gallery
                <ArrowRight size={16} />
              </Link>
            ) : null}
          </div>
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
                <Images size={18} className="shrink-0 text-brand-teal" />
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
