"use client";

import { useEffect, useState } from "react";
import ClosingSection from "@/components/ClosingSection";
import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/HeroSection";
import InteractiveLoveLetter from "@/components/InteractiveLoveLetter";
import IntroLoader from "@/components/IntroLoader";
import MemoryGallery from "@/components/MemoryGallery";
import MusicControl from "@/components/MusicControl";
import Navigation from "@/components/Navigation";
import PoetrySection from "@/components/PoetrySection";
import RelationshipTimeline from "@/components/RelationshipTimeline";

export default function Experience() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    window.dispatchEvent(new Event("sr:hero-start"));
  }, [started]);

  return (
    <>
      <IntroLoader onFinished={() => setStarted(true)} />
      <MusicControl />
      <CustomCursor />

      <div id="top" className="min-h-screen bg-ivory text-ink">
        <Navigation />

        <main>
          <HeroSection started={started} />
          <PoetrySection />
          <RelationshipTimeline />
          <MemoryGallery />
          <InteractiveLoveLetter />
          <ClosingSection />
        </main>
      </div>
    </>
  );
}
