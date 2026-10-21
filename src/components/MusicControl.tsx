"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Music2 } from "lucide-react";
import { siteConfig } from "@/config/site";

const TARGET_VOLUME = 0.3;
const FADE_MS = 1200;

/** Owns the single audio element for the complete experience. */
export default function MusicControl() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [error, setError] = useState(false);

  const clearFade = useCallback(() => {
    if (fadeRef.current !== null) window.clearInterval(fadeRef.current);
    fadeRef.current = null;
  }, []);

  const fadeTo = useCallback((target: number, pauseAfter = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();
    const start = audio.volume;
    const startedAt = performance.now();
    fadeRef.current = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - startedAt) / FADE_MS);
      audio.volume = start + (target - start) * progress;
      if (progress >= 1) {
        clearFade();
        if (pauseAfter) {
          audio.pause();
          setPlaying(false);
        }
      }
    }, 40);
  }, [clearFade]);

  const start = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || unavailable) return;
    clearFade();
    audio.volume = 0;
    try {
      await audio.play();
      setError(false);
      setPlaying(true);
      fadeTo(TARGET_VOLUME);
    } catch (cause) {
      // A blocked or missing source is reported without retrying automatically.
      if (cause instanceof DOMException && cause.name === "NotAllowedError") return;
      setPlaying(false);
      setError(true);
    }
  }, [clearFade, fadeTo, unavailable]);

  useEffect(() => {
    const beginFromEntry = () => { void start(); };
    window.addEventListener("sr:music-start", beginFromEntry);
    return () => {
      window.removeEventListener("sr:music-start", beginFromEntry);
      clearFade();
      audioRef.current?.pause();
    };
  }, [clearFade, start]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      fadeTo(0, true);
      return;
    }
    void start();
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-2">
      <audio
        ref={audioRef}
        src={siteConfig.music.src}
        loop
        preload="none"
        onError={() => { setUnavailable(true); setPlaying(false); }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      {(unavailable || error) && (
        <p className="max-w-[220px] rounded-md bg-ink/90 px-3 py-2 text-[0.68rem] leading-relaxed text-ivory shadow-lg" role="status">
          {unavailable ? siteConfig.music.unavailableHint : siteConfig.music.hint}
        </p>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background music" : unavailable ? "Background music unavailable" : "Play background music"}
        aria-pressed={playing}
        aria-disabled={unavailable}
        className="group flex min-h-11 items-center gap-3 rounded-full border border-gold/50 bg-maroon/90 py-2.5 pl-3 pr-4 text-ivory shadow-xl backdrop-blur transition-colors hover:border-gold hover:bg-maroon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <span className="flex h-6 w-6 items-center justify-center" aria-hidden="true">
          {playing ? <span className="flex h-3.5 items-end gap-[2px]"><i className="eq-bar w-[2px] rounded bg-gold" /><i className="eq-bar w-[2px] rounded bg-gold [animation-delay:0.18s]" /><i className="eq-bar w-[2px] rounded bg-gold [animation-delay:0.36s]" /></span> : <Music2 className="h-4 w-4 text-gold/70" />}
        </span>
        <span className="label-eyebrow text-gold">{siteConfig.music.label}</span>
        <style jsx global>{`@keyframes sr-eq{0%,100%{height:3px}50%{height:14px}} .eq-bar{animation:sr-eq .9s ease-in-out infinite}`}</style>
      </button>
    </div>
  );
}
