import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AmbientBackground from './components/AmbientBackground';
import HeroSection from './components/HeroSection';
import MascotPlayground from './components/MascotPlayground';
import BentoPersona from './components/BentoPersona';
import PolaroidGallery from './components/PolaroidGallery';
import SurpriseScratchCard from './components/SurpriseScratchCard';
import SealedEnvelopeModal from './components/SealedEnvelopeModal';
import WishesBoard from './components/WishesBoard';
import GrandFinaleFooter from './components/GrandFinaleFooter';
import { sounds } from './utils/soundEngine';

export default function App() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleToggleAudio = () => {
    sounds.toggleAmbient((playing) => {
      setIsAudioPlaying(playing);
    });
  };

  return (
    <div className="relative min-h-screen selection:bg-roseGold-200 selection:text-deep-900">
      {/* Dynamic Ambient Background & Cursor Glow */}
      <AmbientBackground />

      {/* Floating Header */}
      <Navbar
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Flow Content */}
      <main className="relative z-10 space-y-4 sm:space-y-8">
        <HeroSection />
        <MascotPlayground />
        <BentoPersona
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={handleToggleAudio}
        />
        <PolaroidGallery />
        <SurpriseScratchCard />
        <SealedEnvelopeModal />
        <WishesBoard />
      </main>

      {/* Grand Finale & Dedication Footer */}
      <GrandFinaleFooter />
    </div>
  );
}
