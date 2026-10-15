"use client";

import { useEffect, useRef } from "react";
import { ArrowDown, ChevronDown } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion, scrollToTarget } from "@/lib/animations";
import { siteConfig } from "@/config/site";

/**
 * Cinematic editorial hero on deep maroon.
 * - Staggered line reveal for the headline (masked lines).
 * - Image reveal through a clip-path mask + gentle parallax.
 */
export default function HeroSection({ started }: { started: boolean }) {
  const scopeRef = useRef<HTMLElement>(null);
  const entered = useRef(false);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          ".hero-eyebrow, .hero-line, .hero-sub, .hero-cta, .hero-photo-mask, .hero-scroll",
          { opacity: 1 }
        );
        return;
      }

      const entrance = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      entrance
        .fromTo(".hero-eyebrow", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(
          ".hero-line-inner",
          { yPercent: 118 },
          { yPercent: 0, duration: 1.05, stagger: 0.14, ease: "power4.out" },
          "-=0.2"
        )
        .fromTo(".hero-sub", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.55")
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.45"
        )
        .fromTo(
          ".hero-photo-mask",
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power4.inOut" },
          "-=0.7"
        )
        .fromTo(".hero-scroll", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.5");

      const playEntrance = () => {
        if (!entered.current) {
          entered.current = true;
          entrance.play();
        }
      };

      if (started) playEntrance();
      else window.addEventListener("sr:hero-start", playEntrance);

      // --- scroll-linked motion -------------------------------------------
      gsap.to(".hero-photo", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to(".hero-copy", {
        yPercent: -8,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: scope, start: "top top", end: "bottom 30%", scrub: 0.6 },
      });
      gsap.to(".hero-script-edge", {
        yPercent: -30,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: 0.6 },
      });

      return () => window.removeEventListener("sr:hero-start", playEntrance);
    }, scope);

    return () => ctx.revert();
  }, [started]);

  const goTo = (target: string) => scrollToTarget(target);

  return (
    <section
      id="top"
      ref={scopeRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-maroon text-ivory"
    >
      <div className="absolute inset-0 grain-light opacity-[0.07]" />
      <div className="absolute inset-0 vignette" />
      <span
        className="hero-script-edge absolute right-4 top-1/2 hidden -translate-y-1/2 rotate-90 font-sundanese text-sm tracking-[0.5em] text-rose/50 lg:block"
        aria-hidden="true"
      >
        {siteConfig.sundanese.signature}
      </span>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pt-28 pb-24 lg:grid-cols-12 lg:gap-8 lg:px-10">
        {/* copy */}
        <div className="hero-copy order-2 lg:order-1 lg:col-span-7">
          <div className="hero-eyebrow mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-gold/60" aria-hidden="true" />
            <span className="label-eyebrow text-gold">{siteConfig.name}</span>
          </div>
          <h1 className="font-serif text-[clamp(2.4rem,5.7vw,6rem)] leading-[0.9] tracking-[0.18em] text-ivory">
            <span className="block overflow-hidden">
              <span className="hero-line-inner block">{siteConfig.hero.eyebrow}</span>
            </span>
          </h1>
          <p className="hero-sub mt-8 max-w-xl font-serif text-[clamp(1.5rem,2.4vw,3rem)] italic leading-tight text-ivory/90">
            {siteConfig.hero.headline}
          </p>
          <p className="hero-sub mt-4 max-w-md font-sans text-base uppercase tracking-[0.28em] text-ivory/70 sm:text-lg">
            {siteConfig.hero.supporting}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => goTo("#poems")}
              className="hero-cta group inline-flex items-center gap-2 rounded-full bg-ivory px-7 py-3.5 font-sans text-sm font-semibold text-maroon transition-colors hover:bg-gold hover:text-maroon"
            >
              {siteConfig.hero.primaryCta}
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
            <button
              type="button"
              onClick={() => goTo("#letter")}
              className="hero-cta inline-flex items-center gap-2 rounded-full border border-ivory/35 px-7 py-3.5 font-sans text-sm font-semibold text-ivory transition-colors hover:border-ivory hover:bg-ivory/10"
            >
              {siteConfig.hero.secondaryCta}
            </button>
          </div>
        </div>

        {/* photograph */}
        <div className="hero-photo-mask order-1 lg:order-2 lg:col-span-5">
          <div className="hero-photo relative aspect-[4/5] overflow-hidden sm:aspect-[5/6] lg:aspect-[4/5]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.hero.photo}
              alt={siteConfig.hero.photoAlt}
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/45 via-transparent to-transparent" />
            <figcaption className="absolute bottom-4 left-5 label-eyebrow text-ivory/85">
              — {siteConfig.name.toLowerCase()}
            </figcaption>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="hero-scroll absolute bottom-7 left-1/2 -translate-x-1/2">
        <button
          type="button"
          onClick={() => goTo("#poems")}
          className="flex flex-col items-center gap-2 text-ivory/60 transition-colors hover:text-ivory"
          aria-label="Scroll to the poems"
        >
          <span className="label-eyebrow">scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
