"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { siteConfig } from "@/config/site";

type Props = {
  onFinished: () => void;
};

/**
 * Brief cinematic opening (~2s) with a skip option.
 * - Maroon backdrop with film grain.
 * - Brand wordmark reveals through a mask.
 * - Thin progress line.
 * - Curtain wipes upward into the hero.
 */
export default function IntroLoader({ onFinished }: Props) {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    document.body.style.overflow = "hidden";

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      onFinished();
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finish,
      });

      if (prefersReducedMotion()) {
        tl.set(scope, { yPercent: -100 });
        tl.call(finish, undefined, 0.1);
        return;
      }

      tl.fromTo(
        ".intro-word",
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power4.out" }
      )
        .fromTo(
          ".intro-script",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".intro-progress",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
          0.2
        )
        .to(
          ".intro-script, .intro-word, .intro-progress, .intro-skip",
          { opacity: 0, y: -14, duration: 0.45, ease: "power2.in" },
          "+=0.35"
        )
        .to(
          scope,
          { yPercent: -100, duration: 1.05, ease: "power4.inOut" },
          "-=0.1"
        )
        .add(() => {
          setHidden(true);
        });
    }, scope);

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [onFinished]);

  const handleSkip = () => {
    if (scopeRef.current) {
      const scope = scopeRef.current;
      const rect = scope.getBoundingClientRect();
      if (rect.top === 0 && rect.height > 0) {
        setHidden(true);
        onFinished();
      }
    }
  };

  if (hidden) return null;

  return (
    <div
      ref={scopeRef}
      className="intro-curtain fixed inset-0 z-[100] flex items-center justify-center bg-maroon overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 grain-light opacity-[0.08]" />
      <div className="absolute inset-0 vignette" />

      {/* quiet heritage detail — a small geometric motif */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span
          className="block h-px w-16 bg-gold/40"
          aria-hidden="true"
        />
        <span className="label-eyebrow text-gold/70">
          {siteConfig.sundanese.aksaraSunda}
        </span>
      </div>

      <div className="relative flex flex-col items-center text-center px-6">
        <div className="intro-script font-sundanese text-gold/80 text-xl sm:text-2xl mb-6 opacity-0">
          {siteConfig.sundanese.signature}
        </div>
        <h1 className="overflow-hidden font-serif">
          <span className="intro-word block font-serif text-ivory text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight opacity-0">
            Sawala
          </span>
          <span className="intro-word block font-serif italic text-ivory/90 text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] tracking-tight opacity-0">
            Rasa
          </span>
        </h1>
        <p className="intro-word mt-6 font-sans text-xs sm:text-sm uppercase tracking-widest2 text-rose/90 opacity-0">
          {siteConfig.tagline}
        </p>
      </div>

      {/* progress line */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 sm:w-56">
        <div className="h-px w-full bg-ivory/15" />
        <div className="intro-progress h-px w-full origin-left scale-x-0 bg-gold" />
      </div>

      <button
        type="button"
        onClick={handleSkip}
        className="intro-skip absolute bottom-8 right-8 label-eyebrow text-ivory/60 hover:text-ivory transition-colors"
      >
        Skip
      </button>
    </div>
  );
}
