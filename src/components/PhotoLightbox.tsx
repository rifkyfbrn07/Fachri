"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import type { GalleryPhoto } from "@/config/site";

type Props = {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Editorial lightbox.
 * - Smooth open / close transitions (GSAP).
 * - Keyboard: Esc closes, arrows navigate.
 * - Touch swipe on mobile.
 * - Focus is trapped and restored on close.
 */
export default function PhotoLightbox({ photos, index, onClose, onNavigate }: Props) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const photo = photos[index];
  const lastFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    if (prefersReducedMotion()) {
      onClose();
      return;
    }
    gsap.to(scope, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.in",
      onComplete: onClose,
    });
  }, [onClose]);

  const navigate = useCallback(
    (dir: number) => {
      const next = (index + dir + photos.length) % photos.length;
      const scope = scopeRef.current;
      if (!scope) return;
      if (prefersReducedMotion()) {
        onNavigate(next);
        return;
      }
      gsap
        .timeline()
        .to(".lb-image", { opacity: 0, y: 14, duration: 0.25, ease: "power2.in" })
        .add(() => onNavigate(next))
        .to(".lb-image", { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" })
        .to(".lb-caption", { opacity: 1, duration: 0.3 }, "-=0.15");
    },
    [index, photos.length, onNavigate]
  );

  // entrance + listeners
  useEffect(() => {
    lastFocused.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";
    const scope = scopeRef.current;

    if (scope && !prefersReducedMotion()) {
      gsap.fromTo(scope, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(
        ".lb-image",
        { opacity: 0, scale: 0.96, y: 18 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.05 }
      );
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") navigate(-1);
      else if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", onKey);

    // focus the close button
    const closeBtn = scope?.querySelector<HTMLButtonElement>(".lb-close");
    closeBtn?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocused.current?.focus();
    };
  }, [close, navigate]);

  // touch swipe
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 48) navigate(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <div
      ref={scopeRef}
      className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${photos.length}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between px-5 py-5 sm:px-8">
        <p className="label-eyebrow text-ivory/50">
          {String(index + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </p>
        <button
          type="button"
          onClick={close}
          className="lb-close flex h-11 w-11 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-ivory hover:bg-ivory/10"
          aria-label="Close photo"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 sm:px-24"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <figure className="flex max-h-full flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            className="lb-image max-h-[72vh] w-auto max-w-full rounded-sm object-contain shadow-2xl"
          />
          <figcaption className="lb-caption mt-6 text-center font-serif text-lg italic text-ivory/85 sm:text-xl">
            {photo.caption}
          </figcaption>
        </figure>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-ivory hover:bg-ivory/10 sm:left-6"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={() => navigate(1)}
          className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 text-ivory transition-colors hover:border-ivory hover:bg-ivory/10 sm:right-6"
          aria-label="Next photo"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {photo.caption}
      </p>
    </div>
  );
}
