"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { siteConfig } from "@/config/site";

/**
 * Minimal fixed navigation with:
 *  - a hairline scroll-progress bar,
 *  - an active-section state,
 *  - a full-screen editorial menu on mobile.
 */
export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  const links = siteConfig.navigation.links;

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const ctx = gsap.context(() => {
      if (!prefersReducedMotion() && progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              start: 0,
              end: "max",
              scrub: 0.4,
            },
          }
        );
      }

      links.forEach((link) => {
        const target = document.getElementById(link.href.slice(1));
        if (!target) return;

        ScrollTrigger.create({
          trigger: target,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) setActive(link.href);
          },
        });
      });
    }, nav);

    return () => {
      window.removeEventListener("scroll", onScroll);
      ctx.revert();
    };
  }, [links]);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    requestAnimationFrame(() => {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
    });
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-[80] transition-[background-color,color,border-color] duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-ivory/90 text-ink backdrop-blur-md"
            : "border-b border-transparent bg-transparent text-ivory"
        }`}
      >
        <div
          ref={progressRef}
          className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold"
          aria-hidden="true"
        />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              go("#top");
            }}
            className="group flex items-baseline gap-2"
            aria-label="Sawala Rasa — back to top"
          >
            <span className="font-serif text-xl tracking-tight sm:text-2xl">
              Sawala&nbsp;<span className="italic">Rasa</span>
            </span>
            <span
              className="font-sundanese text-sm text-gold opacity-70"
              aria-hidden="true"
            >
              ᮞᮛᮞ
            </span>
          </a>

          {/* desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(link.href);
                }}
                className={`relative label-eyebrow transition-opacity ${
                  active === link.href ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-[width] duration-500 ${
                    active === link.href ? "w-full" : "w-0"
                  }`}
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-[75] flex flex-col justify-center bg-maroon px-8 transition-[opacity,visibility] duration-500 md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 grain-light opacity-[0.08]" />
        <div className="absolute top-24 left-8 font-sundanese text-gold/40 text-6xl">
          {siteConfig.sundanese.signature}
        </div>
        <nav className="relative flex flex-col gap-6">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                go(link.href);
              }}
              style={{ transitionDelay: menuOpen ? `${i * 60 + 100}ms` : "0ms" }}
              className={`font-serif text-4xl italic text-ivory transition-all duration-500 ${
                menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              {link.label}
            </a>
          ))}
          <p className="mt-10 label-eyebrow text-rose">
            {siteConfig.sundanese.aksaraSunda}
          </p>
        </nav>
      </div>
    </>
  );
}
