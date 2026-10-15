"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { siteConfig, type GalleryPhoto } from "@/config/site";
import PhotoLightbox from "./PhotoLightbox";

/** Editorial 12-column placements — deliberate, never an identical card grid. */
const PLACEMENT = [
  "lg:col-span-7 aspect-[4/3] lg:aspect-[16/10]",
  "lg:col-span-5 aspect-[4/3] lg:aspect-[16/10]",
  "lg:col-span-3 aspect-[4/3] lg:aspect-square",
  "lg:col-span-3 aspect-[4/3] lg:aspect-square",
  "lg:col-span-6 aspect-[4/3]",
  "lg:col-span-3 aspect-[4/3] lg:aspect-square",
  "lg:col-span-4 aspect-[4/3] lg:aspect-[5/4]",
  "lg:col-span-5 aspect-[4/3] lg:aspect-[5/4]",
  "lg:col-span-3 aspect-[4/3] lg:aspect-square",
  "lg:col-span-4 aspect-[4/3] lg:aspect-[5/4]",
  "lg:col-span-8 aspect-[4/3] lg:aspect-[16/10]",
];

/**
 * "Fragments of Us" — an editorial photo spread with exactly eight slots.
 * - Scroll-triggered clip reveals, gentle feature parallax.
 * - Hover zoom + a "view" pointer, click opens the lightbox.
 */
export default function MemoryGallery() {
  const scopeRef = useRef<HTMLElement>(null);
  const photos = siteConfig.gallery.photos as GalleryPhoto[];
  const numerals = siteConfig.sundanese.numerals;
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    if (!prefersReducedMotion()) {
      gsap.set(".gallery-cell", { clipPath: "inset(0 0 100% 0)", y: 34 });

      gsap.fromTo(
        ".gallery-heading",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 72%", once: true },
        }
      );

      ScrollTrigger.batch(".gallery-cell", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            clipPath: "inset(0 0 0% 0)",
            y: 0,
            duration: 0.95,
            stagger: 0.12,
            ease: "power3.inOut",
          }),
      });

      gsap.to(".gallery-feature-img", {
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: ".gallery-feature",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section
      id="gallery"
      ref={scopeRef}
      className="relative overflow-hidden bg-ivory py-28 lg:py-40"
    >
      <div className="absolute inset-0 grain-dark opacity-[0.04]" />

      <div className="relative mx-auto mb-16 w-full max-w-7xl px-6 lg:mb-24 lg:px-10">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-gold" aria-hidden="true" />
          <span className="label-eyebrow text-wine">{siteConfig.gallery.label}</span>
        </div>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h2 className="gallery-heading font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {siteConfig.gallery.heading}
          </h2>
          <span className="font-sundanese text-2xl text-ink/20" aria-hidden="true">
            {siteConfig.gallery.signature}
          </span>
        </div>
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6 lg:px-10">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpen(i)}
            data-cursor="view"
            aria-label={`Open photo: ${photo.caption}`}
            className={`gallery-cell group relative overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-wine ${
              i === 0 ? "gallery-feature sm:col-span-2" : "sm:col-span-1"
            } ${PLACEMENT[i] ?? "lg:col-span-6 aspect-[4/3]"}`}
          >
            <div className="absolute inset-0 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className={`h-full w-full object-cover transition-transform duration-[1400ms] ease-soft-out group-hover:scale-[1.05] ${
                  i === 0 ? "gallery-feature-img" : ""
                }`}
              />
            </div>

            <span className="absolute left-4 top-4 label-eyebrow text-ivory/80 drop-shadow">
              {numerals[i]}
            </span>

            {/* caption */}
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent px-5 pb-4 pt-12 lg:translate-y-3 lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              <span className="font-serif text-lg italic text-ivory">
                {photo.caption}
              </span>
            </span>
          </button>
        ))}
      </div>

      {open !== null && (
        <PhotoLightbox
          photos={photos}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={(n) => setOpen(n)}
        />
      )}
    </section>
  );
}
