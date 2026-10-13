"use client";

import { useRef, useState } from "react";
import { Music2, Music3 } from "lucide-react";
import { siteConfig } from "@/config/site";

/**
 * Optional background music — never autoplays.
 * Add a track at public/audio/music.mp3 (or change the path in site.ts).
 */
export default function MusicControl() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    // A click just happened, so starting playback is allowed.
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setMissing(true));
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-2">
      <audio
        ref={audioRef}
        src={siteConfig.music.src}
        loop
        preload="none"
        onError={() => setMissing(true)}
        onEnded={() => setPlaying(false)}
      />
      {missing && (
        <p
          className="max-w-[220px] rounded-md bg-ink/90 px-3 py-2 text-[0.68rem] leading-relaxed text-ivory shadow-lg"
          role="status"
        >
          {siteConfig.music.hint}
        </p>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        aria-pressed={playing}
        className="group flex items-center gap-3 rounded-full border border-gold/50 bg-maroon/90 pl-3 pr-4 py-2.5 text-ivory shadow-xl backdrop-blur transition-colors hover:border-gold hover:bg-maroon"
      >
        <span className="flex h-6 w-6 items-center justify-center">
          {playing ? (
            <span className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
              <span className="eq-bar w-[2px] rounded bg-gold" />
              <span className="eq-bar w-[2px] rounded bg-gold [animation-delay:0.18s]" />
              <span className="eq-bar w-[2px] rounded bg-gold [animation-delay:0.36s]" />
            </span>
          ) : (
            <Music2 className="h-4 w-4 text-gold" />
          )}
        </span>
        <span className="label-eyebrow text-gold">{siteConfig.music.label}</span>
        {playing && <Music3 className="h-3.5 w-3.5 text-gold/70" aria-hidden="true" />}
      </button>
      <style jsx global>{`
        @keyframes sr-eq {
          0%, 100% { height: 3px; }
          50% { height: 14px; }
        }
        .eq-bar {
          animation: sr-eq 0.9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
