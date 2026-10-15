"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { siteConfig, type Poem } from "@/config/site";

/**
 * "Words I Never Said" — an ivory editorial poetry reader.
 * - Lines reveal on scroll and on poem change.
 * - Selected lines receive a restrained gold underline.
 * - Arrow keys + buttons navigate between four poems.
 */
export default function PoetrySection() {
  const scopeRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const poems = siteConfig.poetry.poems;
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const poem: Poem = poems[index];

  const animateIn = useCallback(() => {
    if (!linesRef.current) return;
    const ls = linesRef.current.querySelectorAll<HTMLElement>(".poem-line");
    const ems = linesRef.current.querySelectorAll<HTMLElement>(".poem-em");
    if (prefersReducedMotion()) {
      gsap.set(ls, { opacity: 1, y: 0 });
      gsap.set(ems, { backgroundSize: "100% 100%" });
      return;
    }
    gsap.killTweensOf(ls);
    gsap.fromTo(
      ls,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.05, ease: "power2.out", overwrite: true }
    );
    gsap.fromTo(
      ems,
      { backgroundSize: "0% 100%" },
      { backgroundSize: "100% 100%", duration: 0.8, stagger: 0.1, delay: 0.35, ease: "power2.inOut" }
    );
  }, []);

  const animateOut = useCallback((next: () => void) => {
    if (!linesRef.current) return next();
    const ls = linesRef.current.querySelectorAll<HTMLElement>(".poem-line");
    if (prefersReducedMotion() || ls.length === 0) return next();
    gsap.to(ls, {
      y: -18,
      opacity: 0,
      duration: 0.34,
      stagger: 0.02,
      ease: "power2.in",
      onComplete: next,
    });
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const ni = (i + poems.length) % poems.length;
      if (ni === index || busy) return;
      setBusy(true);
      animateOut(() => {
        setIndex(ni);
        requestAnimationFrame(() => {
          animateIn();
          setBusy(false);
        });
      });
    },
    [index, busy, poems.length, animateOut, animateIn]
  );

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".poetry-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 72%", once: true },
        }
      );
      gsap.fromTo(
        ".poetry-signature",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.4,
          scrollTrigger: { trigger: scope, start: "top 70%", once: true },
        }
      );
      ScrollTrigger.create({
        trigger: scope,
        start: "top 65%",
        once: true,
        onEnter: () => animateIn(),
      });
    }, scope);

    return () => ctx.revert();
  }, [animateIn]);

  // arrow-key navigation while the section is on screen
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = scopeRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.8 && r.bottom > window.innerHeight * 0.2;
      if (!inView) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(index - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(index + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, goTo]);

  return (
    <section
      id="poems"
      ref={scopeRef}
      className="relative overflow-hidden bg-ivory py-28 lg:py-40"
    >
      <div className="absolute inset-0 grain-dark opacity-[0.04]" />
      <div className="relative mx-auto grid w-full max-w-7xl items-end gap-10 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-9">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-12 bg-gold" aria-hidden="true" />
            <span className="label-eyebrow text-wine">{siteConfig.poetry.label}</span>
          </div>
          <h2 className="poetry-heading font-serif text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {siteConfig.poetry.heading}
          </h2>
          <p className="mt-4 font-serif italic text-rose">{siteConfig.poetry.note}</p>
        </div>
        <div className="poetry-signature hidden justify-end lg:col-span-3 lg:flex">
          <span className="font-sundanese text-3xl text-ink/15" aria-hidden="true">
            {siteConfig.poetry.signature}
          </span>
        </div>
      </div>

      <div className="relative mx-auto mt-16 w-full max-w-6xl px-6 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-4 text-left">
            <p className="label-eyebrow text-wine">For Sifa Nuraliza</p>
            <p className="font-serif text-2xl italic text-ink/75 sm:text-3xl">
              Some feelings are easier to write than to say.
            </p>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink/5 shadow-[0_25px_80px_rgba(72,23,37,0.12)]">
            <img
              src="/images/11.jpeg"
              alt="A quiet portrait from our story"
              className="h-[220px] w-full object-cover sm:h-[280px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* poem reader */}
      <div className="relative mx-auto mt-20 grid w-full max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:px-10">
        {/* rail */}
        <div className="lg:col-span-3">
          <div className="flex items-start gap-6 lg:sticky lg:top-28 lg:flex-col">
            <div
              className="numeral-outline font-serif text-[7rem] leading-none lg:text-[9rem]"
              aria-hidden="true"
            >
              {poem.number}
            </div>
            <div className="mt-1 flex items-center gap-3">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={busy}
                aria-label="Previous poem"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-wine hover:bg-wine hover:text-ivory disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={busy}
                aria-label="Next poem"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-wine hover:bg-wine hover:text-ivory disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-2 flex gap-2" role="tablist" aria-label="Poems">
              {poems.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Poem ${i + 1}: ${p.title}`}
                  onClick={() => goTo(i)}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-wine" : "bg-ink/25 hover:bg-ink/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* poem */}
        <div className="lg:col-span-9" aria-live="polite">
          <div className="mb-8 flex items-baseline gap-4">
            <span className="label-eyebrow text-ink/40">
              {String(index + 1).padStart(2, "0")} — {String(poems.length).padStart(2, "0")}
            </span>
            <h3 className="font-serif text-3xl italic text-wine sm:text-4xl">
              {poem.title}
            </h3>
          </div>
          <div ref={linesRef} className="max-w-2xl space-y-2">
            {poem.lines.map((line, i) =>
              line === "" ? (
                <div key={i} className="h-6" aria-hidden="true" />
              ) : poem.emLines?.includes(i) ? (
                <p
                  key={i}
                  className="poem-line poem-em font-serif text-xl leading-relaxed text-ink sm:text-2xl sm:leading-relaxed"
                >
                  <em>{line}</em>
                </p>
              ) : (
                <p
                  key={i}
                  className="poem-line font-serif text-xl leading-relaxed text-ink/80 sm:text-2xl sm:leading-relaxed"
                >
                  {line}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
