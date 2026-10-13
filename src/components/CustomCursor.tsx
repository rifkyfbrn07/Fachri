"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/animations";

/**
 * A quiet desktop-only pointer accent: a small gold dot and a soft ring
 * that widens over interactive elements. Never rendered on touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor], input, textarea")) {
        gsap.to(ring, { scale: 1.7, opacity: 0.55, duration: 0.3 });
      }
    };
    const onOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor], input, textarea")) {
        gsap.to(ring, { scale: 1, opacity: 0.8, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      gsap.set([dot, ring], { opacity: 0 });
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[95] hidden lg:block" aria-hidden="true">
      <div
        ref={ringRef}
        className="absolute h-9 w-9 rounded-full border border-gold/60"
      />
      <div
        ref={dotRef}
        className="absolute h-1.5 w-1.5 rounded-full bg-gold"
      />
    </div>
  );
}
