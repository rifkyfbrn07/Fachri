"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { siteConfig } from "@/config/site";

/**
 * "Chapters of Us" — a vertical timeline on deep maroon.
 * - The central line grows as the reader scrolls.
 * - Entries alternate left / right on desktop.
 * - Every date, title, and text is editable in src/config/site.ts.
 */
export default function RelationshipTimeline() {
  const scopeRef = useRef<HTMLElement>(null);
  const entries = siteConfig.timeline.entries;

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // growing line
      gsap.fromTo(
        ".timeline-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-track",
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        }
      );

      // entries
      gsap.utils.toArray<HTMLElement>(".timeline-entry").forEach((entry, i) => {
        const fromLeft = i % 2 === 0;
        const node = entry.querySelector(".timeline-node");
        const body = entry.querySelector(".timeline-body");
        const photo = entry.querySelector(".timeline-photo");

        if (node) {
          gsap.fromTo(
            node,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: entry,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
        if (body) {
          gsap.fromTo(
            body,
            { opacity: 0, x: fromLeft ? -36 : 36 },
            {
              opacity: 1,
              x: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: entry,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
        if (photo) {
          gsap.fromTo(
            photo,
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 0.9,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: entry,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={scopeRef}
      className="relative overflow-hidden bg-maroonDeep py-28 text-ivory lg:py-44"
    >
      <div className="absolute inset-0 grain-light opacity-[0.06]" />
      <div className="absolute inset-0 vignette" />

      {/* header */}
      <div className="relative mx-auto mb-20 w-full max-w-7xl px-6 lg:mb-28 lg:px-10">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-gold/70" aria-hidden="true" />
          <span className="label-eyebrow text-gold">{siteConfig.timeline.label}</span>
        </div>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {siteConfig.timeline.heading}
          </h2>
          <span className="font-sundanese text-2xl text-gold/40" aria-hidden="true">
            {siteConfig.timeline.signature}
          </span>
        </div>
      </div>

      <div className="timeline-track relative mx-auto max-w-6xl px-6 lg:px-10">
        {/* the line */}
        <div
          className="absolute left-[22px] top-0 h-full w-px bg-ivory/15 lg:left-1/2 lg:-translate-x-1/2"
          aria-hidden="true"
        >
          <div className="timeline-fill absolute inset-0 origin-top scale-y-0 bg-gradient-to-b from-gold via-gold/70 to-gold/30" />
        </div>

        <div className="space-y-24 lg:space-y-32">
          {entries.map((e, i) => (
            <article
              key={e.id}
              className="timeline-entry relative lg:grid lg:grid-cols-2 lg:gap-x-24"
            >
              {/* node */}
              <div
                className="timeline-node absolute left-[22px] top-1 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-gold/70 bg-maroonDeep font-sundanese text-sm text-gold lg:left-1/2"
                aria-hidden="true"
              >
                {e.number}
              </div>

              {/* body */}
              <div
                className={`timeline-body pl-14 lg:pl-0 ${
                  i % 2 === 0
                    ? "lg:col-start-1 lg:pr-16 lg:text-right"
                    : "lg:col-start-2 lg:pl-16"
                }`}
              >
                <p className="label-eyebrow text-gold/80">{e.date}</p>
                <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                  {e.title}
                </h3>
                <p className="mt-4 max-w-md font-sans text-[0.95rem] leading-relaxed text-ivory/70">
                  {e.text}
                </p>
                {e.photo && (
                  <div className="timeline-photo mt-7 max-w-md overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={e.photo}
                      alt={e.title}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
