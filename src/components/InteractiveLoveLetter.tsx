"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { siteConfig } from "@/config/site";

/**
 * "A Letter for You" — the emotional climax.
 * - A minimal envelope with a maroon wax seal.
 * - Clicking "Open Your Letter" lifts the flap, the letter rises,
 *   the envelope dissolves, and the paragraphs appear in sequence.
 * - Fully reversible without reloading: "Fold the Letter".
 */
export default function InteractiveLoveLetter() {
  const scopeRef = useRef<HTMLElement>(null);
  const letter = siteConfig.loveLetter;
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const openRef = useRef(false);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // initial states
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      gsap.set(".letter-card", { opacity: 0, yPercent: 30, scale: 0.9, rotate: -1.5 });
      gsap.set(".letter-p, .letter-sig", { opacity: 0, y: 16 });
      gsap.set(".envelope-flap", { rotationX: 0 });

      if (reduced) {
        gsap.set(".envelope-entrance", { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        ".envelope-entrance",
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 70%", once: true },
        }
      );
      gsap.fromTo(
        ".letter-heading",
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 72%", once: true },
        }
      );
    }, scope);

    return () => ctx.revert();
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current || openRef.current) return;
    busyRef.current = true;
    setBusy(true);
    const reduced = prefersReducedMotion();

    const run = () => {
      if (reduced) {
        gsap.set(".letter-card", { opacity: 1, yPercent: -52, scale: 1 });
        gsap.set(".envelope", { opacity: 0 });
        gsap.set(".letter-p, .letter-sig", { opacity: 1, y: 0 });
        openRef.current = true;
        setOpen(true);
        busyRef.current = false;
        setBusy(false);
        closeBtnRef.current?.focus();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          openRef.current = true;
          setOpen(true);
          busyRef.current = false;
          setBusy(false);
          closeBtnRef.current?.focus();
        },
      });

      tl.to(".seal", { scale: 0, opacity: 0, rotate: 180, duration: 0.35, ease: "back.in(2)" })
        .to(".envelope-flap", { rotationX: -180, duration: 0.7, ease: "power3.inOut" }, "-=0.05")
        .to(".letter-card", { opacity: 1, duration: 0.2 }, "-=0.1")
        .to(
          ".letter-card",
          { yPercent: -52, scale: 1, rotate: 0, duration: 0.95, ease: "power3.inOut" },
          "<"
        )
        .to(".envelope", { opacity: 0, scale: 0.9, duration: 0.55, ease: "power2.in" }, "-=0.5")
        .to(".letter-p", { opacity: 1, y: 0, duration: 0.55, stagger: 0.22, ease: "power2.out" }, "-=0.3")
        .to(".letter-sig", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
    };

    if (reduced) {
      run();
    } else {
      // let the button press settle, then begin
      window.setTimeout(run, 120);
    }
  }, []);

  const playClose = useCallback(() => {
    if (busyRef.current || !openRef.current) return;
    busyRef.current = true;
    setBusy(true);
    const reduced = prefersReducedMotion();

    const run = () => {
      if (reduced) {
        gsap.set(".letter-card", { opacity: 0, yPercent: 30, scale: 0.9 });
        gsap.set(".envelope", { opacity: 1, scale: 1 });
        gsap.set(".letter-p, .letter-sig", { opacity: 0, y: 16 });
        gsap.set(".seal", { opacity: 1, scale: 1 });
        openRef.current = false;
        setOpen(false);
        busyRef.current = false;
        setBusy(false);
        openBtnRef.current?.focus();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          openRef.current = false;
          setOpen(false);
          busyRef.current = false;
          setBusy(false);
          openBtnRef.current?.focus();
        },
      });

      tl.to(".letter-p, .letter-sig", { opacity: 0, y: 12, duration: 0.3, stagger: 0.05, ease: "power2.in" })
        .to(".envelope", { opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }, "-=0.15")
        .to(".letter-card", { yPercent: 30, scale: 0.9, rotate: -1.5, duration: 0.8, ease: "power3.inOut" }, "<")
        .to(".letter-card", { opacity: 0, duration: 0.3, ease: "power2.in" }, "+=0.1")
        .to(".envelope-flap", { rotationX: 0, duration: 0.6, ease: "power3.inOut" }, "<")
        .to(".seal", { scale: 1, opacity: 1, rotate: 0, duration: 0.45, ease: "back.out(1.7)" }, "-=0.25");
    };

    if (reduced) {
      run();
    } else {
      window.setTimeout(run, 120);
    }
  }, []);

  // Escape closes the letter
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openRef.current) playClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playClose]);

  void ScrollTrigger;
  return (
    <section
      id="letter"
      ref={scopeRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-maroon py-28 text-ivory lg:py-36"
    >
      <div className="absolute inset-0 grain-light opacity-[0.06]" />
      <div className="absolute inset-0 vignette" />
      {/* header */}
      <div className="relative mx-auto mb-14 w-full max-w-7xl px-6 lg:mb-16 lg:px-10">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-gold/70" aria-hidden="true" />
          <span className="label-eyebrow text-gold">{letter.label}</span>
          <span className="h-px w-12 bg-gold/70" aria-hidden="true" />
        </div>
        <h2 className="letter-heading text-center font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {letter.heading}
        </h2>
      </div>

      {/* stage */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6">
        <div className="envelope-entrance relative w-[min(86vw,430px)] [perspective:1300px]">
          <div className="envelope relative aspect-[430/300] w-full">
            {/* envelope back */}
            <div className="absolute inset-0 rounded-[10px] bg-[#D8C6A6]" />

            {/* the letter, rising out of the envelope */}
            <div
              className="letter-card absolute left-1/2 top-1/2 z-40 w-[min(88vw,540px)] -translate-x-1/2 -translate-y-1/2"
              role="region"
              aria-label={letter.label}
            >
              <div className="relative overflow-hidden rounded-sm bg-ivory p-8 text-ink shadow-2xl sm:p-12">
                <div className="grain-dark pointer-events-none absolute inset-0 opacity-[0.05]" />
                <p className="relative mb-5 font-sundanese text-lg text-gold" aria-hidden="true">
                  {siteConfig.sundanese.rasa}
                </p>
                <p className="label-eyebrow relative mb-4 text-wine">{letter.heading}</p>
                {letter.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="letter-p relative mb-5 font-sans text-[0.95rem] leading-relaxed text-ink/80"
                  >
                    {p}
                  </p>
                ))}
                <p className="letter-sig relative mt-8 font-serif text-lg italic text-ink/60">
                  — {letter.closing}
                </p>
                <p className="letter-sig relative mt-1 font-hand text-4xl text-wine">
                  {letter.signature}
                </p>
                <p className="letter-sig relative mt-3 label-eyebrow text-ink/40">
                  {letter.date}
                </p>
              </div>
            </div>

            {/* envelope front pocket */}
            <div
              className="absolute inset-0 z-20 rounded-[10px] bg-parchment shadow-xl [clip-path:polygon(0_0,50%_44%,100%_0,100%_100%,0_100%)]"
              aria-hidden="true"
            />

            {/* envelope flap (3D) */}
            <div
              className="envelope-flap absolute inset-x-0 top-0 z-30 h-[54%] bg-[#E9DDCB] [clip-path:polygon(0_0,100%_0,50%_100%)] [transform-origin:50%_0%]"
              style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
              aria-hidden="true"
            />

            {/* wax seal */}
            <button
              type="button"
              onClick={playOpen}
              disabled={busy || open}
              aria-label="Open the letter"
              className="seal absolute left-1/2 top-[27%] z-50 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-wine bg-wine shadow-xl transition-colors hover:bg-maroon disabled:opacity-0"
            >
              <span className="font-sundanese text-2xl text-ivory" aria-hidden="true">
                {letter.seal}
              </span>
            </button>
          </div>
        </div>

        {/* controls */}
        <div className="mt-12 flex min-h-[52px] items-center justify-center">
          {!open ? (
            <button
              ref={openBtnRef}
              type="button"
              onClick={playOpen}
              disabled={busy}
              className="open-btn rounded-full bg-ivory px-8 py-3.5 font-sans text-sm font-semibold text-maroon transition-colors hover:bg-gold disabled:opacity-50"
            >
              {letter.openLabel}
            </button>
          ) : (
            <button
              ref={closeBtnRef}
              type="button"
              onClick={playClose}
              disabled={busy}
              className="close-btn rounded-full border border-ivory/40 px-8 py-3.5 font-sans text-sm font-semibold text-ivory transition-colors hover:border-ivory hover:bg-ivory/10 disabled:opacity-50"
            >
              {letter.closeLabel}
            </button>
          )}
        </div>
        <p className="mt-5 text-center font-sans text-xs uppercase tracking-widest2 text-ivory/35">
          Tap the seal — or the button above
        </p>
      </div>
    </section>
  );
}
