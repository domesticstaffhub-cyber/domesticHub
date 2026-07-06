"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Menu, MessageCircle, X } from "lucide-react";
import { navLinks } from "@/lib/services";

type SiteHeaderProps = {
  onChat?: () => void;
  tone?: "light" | "dark";
};

export function SiteHeader({ onChat, tone = "light" }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isDark = tone === "dark";
  const galleryLink = navLinks.find((link) => !link.href.startsWith("#"));
  const sectionLinks = navLinks.filter((link) => link.href.startsWith("#"));

  function hrefFor(href: string) {
    return href.startsWith("#") ? `/${href}` : href;
  }

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    const header = document.querySelector("header");
    const nav = header?.querySelector("nav");

    if (!element) return;

    const headerHeight = nav instanceof HTMLElement ? nav.offsetHeight : header instanceof HTMLElement ? header.offsetHeight : 72;
    const top = element.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    window.history.replaceState(null, "", `/#${id}`);
  }

  function handleSectionClick(href: string, event: MouseEvent<HTMLAnchorElement>) {
    if (!href.startsWith("#")) return;

    if (window.location.pathname === "/") {
      event.preventDefault();
      setMenuOpen(false);
      scrollToSection(href.slice(1));
    }
  }

  const shellClass = isDark
    ? "border-white/10 bg-brand-ink/90 text-white"
    : "border-brand-ink/10 bg-brand-bone/90 text-brand-ink";
  const mutedClass = isDark ? "text-white/70 hover:text-white" : "text-brand-ink/70 hover:text-brand-ink";

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className={`fixed left-0 right-0 top-0 z-40 border-b backdrop-blur-xl ${shellClass}`}>
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/brand/logo.jpeg"
            width={48}
            height={48}
            alt="Domestic Staffing Hub logo"
            className="h-10 w-10 shrink-0 border border-current/20 object-cover"
            priority
          />
          <span className="truncate text-sm font-black uppercase tracking-[0.16em]">Domestic Staffing Hub</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-bold transition ${
                isActive(link.href)
                  ? isDark
                    ? "bg-white text-brand-ink"
                    : "bg-brand-ink text-brand-bone"
                  : mutedClass
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {onChat ? (
            <button
              type="button"
              onClick={onChat}
              className={`hidden h-11 items-center gap-2 border px-4 text-sm font-black transition sm:inline-flex ${
                isDark
                  ? "border-white bg-white text-brand-ink hover:bg-brand-saffron"
                  : "border-brand-ink bg-brand-ink text-brand-bone hover:bg-brand-clay"
              }`}
            >
              <MessageCircle size={17} />
              Chat
            </button>
          ) : (
            <Link
              href="/contact"
              className={`hidden h-11 items-center gap-2 border px-4 text-sm font-black transition sm:inline-flex ${
                isDark
                  ? "border-white bg-white text-brand-ink hover:bg-brand-saffron"
                  : "border-brand-ink bg-brand-ink text-brand-bone hover:bg-brand-clay"
              }`}
            >
              Request
              <ArrowRight size={17} />
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className={`grid h-11 w-11 place-items-center border transition lg:hidden ${
              isDark
                ? "border-white/20 text-white hover:bg-white/10"
                : "border-brand-ink/20 text-brand-ink hover:bg-brand-ink/5"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          className={`border-t px-4 py-4 shadow-lift lg:hidden ${
            isDark ? "border-white/10 bg-brand-ink" : "border-brand-ink/10 bg-brand-bone"
          }`}
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border px-4 py-3 text-sm font-black ${
                  isActive(link.href)
                    ? isDark
                      ? "border-white bg-white text-brand-ink"
                      : "border-brand-ink bg-brand-ink text-brand-bone"
                    : isDark
                      ? "border-white/10 text-white/70"
                      : "border-brand-ink/10 text-brand-ink/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {onChat ? (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onChat();
                }}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 border border-brand-saffron bg-brand-saffron px-4 text-sm font-black text-brand-ink"
              >
                <MessageCircle size={17} />
                Chat on WhatsApp
              </button>
            ) : (
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 border border-brand-saffron bg-brand-saffron px-4 text-sm font-black text-brand-ink"
              >
                Request staff
                <ArrowRight size={17} />
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
