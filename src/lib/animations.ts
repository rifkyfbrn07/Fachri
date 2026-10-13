"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "./gsap";

/** True when the user prefers reduced motion. Safe to call on the client only. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Desktop-only pointer (mouse / trackpad) */
export const hasFinePointer = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches;

/**
 * A tiny hook that returns a ref for GSAP scoping.
 * Prevents selector collisions and cleans up on unmount / StrictMode remount.
 */
export function useGsapScope() {
  const scopeRef = useRef<HTMLDivElement>(null);
  return scopeRef;
}

/**
 * Watch for reduced-motion changes.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Scroll to an element by id, or to the top, with a soft custom ease.
 * Respects reduced motion.
 */
export function scrollToTarget(target: string | null) {
  if (prefersReducedMotion()) {
    if (target) document.getElementById(target)?.scrollIntoView();
    else window.scrollTo({ top: 0 });
    return;
  }

  if (target) {
    const el = document.getElementById(target);
    if (!el) return;
    gsap.to(window, {
      duration: 1.25,
      ease: "power3.inOut",
      scrollTo: { y: el, offsetY: 72 },
    });
  } else {
    gsap.to(window, { duration: 1.25, ease: "power3.inOut", scrollTo: 0 });
  }
}

/**
 * Register a ScrollTrigger that measures on refresh — used once per app
 * so triggers created after images/fonts load are positioned correctly.
 */
export function useScrollRefresh() {
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => window.clearTimeout(t);
  }, []);
}

/** Run a callback once per element against an array of refs. */
export function useRegisteredRefs<T extends HTMLElement>(count: number) {
  const refs = useRef<(T | null)[]>([]);
  const register = useCallback(
    (i: number) => (el: T | null) => {
      refs.current[i] = el;
    },
    []
  );
  return { refs, register };
}

export { gsap, ScrollTrigger };
