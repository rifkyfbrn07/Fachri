"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { siteConfig } from "@/config/site";

export default function ClosingSection() {
  const scopeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(".closing-copy, .closing-cta", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".closing-copy",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 75%", once: true },
        }
      );

      gsap.fromTo(
        ".closing-cta",
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.25,
          ease: "power2.out",
          scrollTrigger: { trigger: scope, start: "top 74%", once: true },
        }
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <section
      id="closing"
      ref={scopeRef}
      className="relative overflow-hidden bg-maroon py-28 text-ivory lg:py-36"
    >
      <div className="absolute inset-0 grain-light opacity-[0.06]" />
      <div className="absolute inset-0 vignette" />

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
        <div className="mb-12 overflow-hidden rounded-[2rem] border border-ivory/15 bg-ivory/5 shadow-[0_30px_100px_rgba(0,0,0,0.18)]">
          <img
            src="/images/11.jpeg"
            alt="A final photograph from our story"
            className="h-[320px] w-full object-cover object-center sm:h-[440px]"
            loading="lazy"
          />
        </div>

        <div className="closing-copy">
          <p className="label-eyebrow text-gold">{siteConfig.closing.signature}</p>
          <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            {siteConfig.closing.headline}
          </h2>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-xl italic leading-relaxed text-ivory/85 sm:text-2xl">
            {siteConfig.closing.line}
          </p>
          {siteConfig.closing.recipient && (
            <p className="mt-8 label-eyebrow text-gold/80">{siteConfig.closing.recipient}</p>
          )}
        </div>

        <div className="closing-cta mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleReplay}
            className="group inline-flex items-center gap-2 rounded-full border border-ivory/35 bg-ivory px-7 py-3.5 font-sans text-sm font-semibold text-maroon transition-colors hover:bg-gold hover:text-maroon"
          >
            {siteConfig.closing.cta}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
