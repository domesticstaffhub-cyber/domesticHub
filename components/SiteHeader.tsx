"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { navLinks } from "@/lib/services";

type SiteHeaderProps = {
  onChat?: () => void;
  tone?: "light" | "dark";
};

export function SiteHeader({ onChat, tone = "light" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-30 border-b backdrop-blur-xl ${
        isDark ? "border-white/10 bg-brand-ink/75" : "border-white/40 bg-white/80"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className={`flex min-w-0 items-center gap-2.5 ${isDark ? "text-white" : "text-brand-navy"}`}>
          <Image
            src="/images/brand/logo.jpeg"
            width={52}
            height={52}
            alt="Domestic Staffing Hub logo"
            className="h-10 w-10 shrink-0 rounded-2xl object-cover sm:h-12 sm:w-12"
            priority
          />
          <span className="truncate text-[0.68rem] font-black uppercase tracking-[0.1em] sm:text-sm lg:text-base">
            Domestic Staffing Hub
          </span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {sectionLinks.map((link) => (
            <Link
              key={link.href}
              href={hrefFor(link.href)}
              onClick={(event) => handleSectionClick(link.href, event)}
              className={`text-sm font-semibold transition ${
                isDark ? "text-white/70 hover:text-white" : "text-slate-600 hover:text-brand-blue"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {galleryLink ? (
            <Link
              href={galleryLink.href}
              className={`hidden h-10 items-center gap-1.5 rounded-full px-4 text-sm font-bold transition lg:inline-flex ${
                isDark
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "bg-brand-blue/10 text-brand-navy hover:bg-brand-blue/15"
              }`}
            >
              {galleryLink.label}
              <ArrowUpRight size={14} />
            </Link>
          ) : null}

          {onChat ? (
            <button
              type="button"
              onClick={onChat}
              className={`inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-bold transition sm:h-11 sm:px-4 ${
                isDark ? "bg-white text-brand-ink hover:bg-brand-gold" : "bg-brand-ink text-white hover:bg-brand-navy"
              }`}
            >
              <MessageCircle size={17} />
              <span className="hidden sm:inline">Chat</span>
            </button>
          ) : (
            <Link
              href="/#request"
              className={`inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-bold transition sm:h-11 sm:px-4 ${
                isDark ? "bg-white text-brand-ink hover:bg-brand-gold" : "bg-brand-ink text-white hover:bg-brand-navy"
              }`}
            >
              Request
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className={`grid h-10 w-10 place-items-center rounded-full border transition lg:hidden ${
              isDark
                ? "border-white/15 bg-white/10 text-white hover:bg-white/20"
                : "border-slate-200 bg-white text-brand-ink hover:bg-slate-50"
            }`}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          className={`border-t px-3 pb-4 pt-2 shadow-soft lg:hidden ${
            isDark ? "border-white/10 bg-brand-ink/95" : "border-slate-100 bg-white/95"
          }`}
        >
          <div className="mx-auto grid max-w-7xl gap-2">
            {sectionLinks.map((link) => (
              <Link
                key={link.href}
                href={hrefFor(link.href)}
                onClick={(event) => handleSectionClick(link.href, event)}
                className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  isDark ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {galleryLink ? (
              <Link
                href={galleryLink.href}
                onClick={() => setMenuOpen(false)}
                className={`mt-1 flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-black transition ${
                  isDark ? "bg-white text-brand-ink hover:bg-brand-gold" : "bg-brand-ink text-white hover:bg-brand-navy"
                }`}
              >
                <span>{galleryLink.label}</span>
                <ArrowUpRight size={16} />
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
