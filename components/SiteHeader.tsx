"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { navLinks } from "@/lib/services";

type SiteHeaderProps = {
  onChat?: () => void;
  tone?: "light" | "dark";
};

export function SiteHeader({ onChat, tone = "light" }: SiteHeaderProps) {
  const isDark = tone === "dark";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-30 border-b backdrop-blur-xl ${
        isDark ? "border-white/10 bg-brand-ink/75" : "border-white/40 bg-white/80"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className={`flex min-w-0 items-center gap-3 ${isDark ? "text-white" : "text-brand-navy"}`}>
          <Image
            src="/images/brand/logo.jpeg"
            width={52}
            height={52}
            alt="Domestic Staffing Hub logo"
            className="h-11 w-11 shrink-0 rounded-2xl object-cover sm:h-12 sm:w-12"
            priority
          />
          <span className="truncate text-xs font-black uppercase tracking-[0.12em] sm:text-sm lg:text-base">
            Domestic Staffing Hub
          </span>
        </Link>

        <div className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href.startsWith("#") ? `/${link.href}` : link.href}
              className={`text-sm font-semibold transition ${
                isDark ? "text-white/70 hover:text-white" : "text-slate-600 hover:text-brand-blue"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/about"
            className={`hidden h-10 items-center rounded-full px-4 text-sm font-bold transition sm:inline-flex lg:hidden ${
              isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-brand-blue/10 text-brand-navy hover:bg-brand-blue/15"
            }`}
          >
            About
          </Link>
          {onChat ? (
            <button
              type="button"
              onClick={onChat}
              className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-bold transition sm:h-11 ${
                isDark ? "bg-white text-brand-ink hover:bg-brand-gold" : "bg-brand-ink text-white hover:bg-brand-navy"
              }`}
            >
              <MessageCircle size={17} />
              <span className="hidden sm:inline">Chat</span>
            </button>
          ) : (
            <Link
              href="/#request"
              className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-bold transition sm:h-11 ${
                isDark ? "bg-white text-brand-ink hover:bg-brand-gold" : "bg-brand-ink text-white hover:bg-brand-navy"
              }`}
            >
              Request
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
