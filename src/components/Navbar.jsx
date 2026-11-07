import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Music, Heart } from 'lucide-react';
import { sounds } from '../utils/soundEngine';
import { fireMicroPop } from '../utils/confettiEffects';

export default function Navbar({ isAudioPlaying, onToggleAudio }) {
  const [mooCount, setMooCount] = useState(0);

  const handleMooClick = (e) => {
    sounds.playMoo();
    const rect = e.currentTarget.getBoundingClientRect();
    fireMicroPop(
      (rect.left + rect.width / 2) / window.innerWidth,
      (rect.top + rect.height / 2) / window.innerHeight
    );
    setMooCount((prev) => prev + 1);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between glass-panel rounded-full px-4 sm:px-6 py-2.5">
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl animate-bounce">🐮</span>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-deep-900 tracking-wide text-sm sm:text-base">
              Kowsh's Day ✨
            </span>
            <span className="text-[10px] font-medium text-roseGold-500 hidden sm:inline">
              19th Birthday Edition
            </span>
          </div>
        </div>

        {/* Navigation links & Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <a
            href="#bento"
            className="hidden md:inline-flex text-xs font-semibold text-deep-600 hover:text-roseGold-500 transition-colors px-3 py-1.5 rounded-full hover:bg-rose-50"
          >
            Bento Lounge
          </a>
          <a
            href="#memories"
            className="hidden md:inline-flex text-xs font-semibold text-deep-600 hover:text-roseGold-500 transition-colors px-3 py-1.5 rounded-full hover:bg-rose-50"
          >
            Memories
          </a>
          <a
            href="#wishes"
            className="hidden md:inline-flex text-xs font-semibold text-deep-600 hover:text-roseGold-500 transition-colors px-3 py-1.5 rounded-full hover:bg-rose-50"
          >
            Wish Jar
          </a>

          {/* Quick Moo Button */}
          <button
            onClick={handleMooClick}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 text-roseGold-600 px-3 py-1.5 rounded-full text-xs font-bold transition-transform active:scale-95 shadow-sm border border-rose-200"
            title="Tap to hear a cute Moo!"
          >
            <span>🐮</span>
            <span>Moo!</span>
            {mooCount > 0 && (
              <span className="bg-roseGold-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {mooCount}
              </span>
            )}
          </button>

          {/* Music Toggle */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
              isAudioPlaying
                ? 'bg-gradient-to-r from-roseGold-400 to-lavender-400 text-white shadow-glass-glow border-transparent'
                : 'bg-white/80 text-deep-700 hover:bg-white border-rose-200'
            }`}
            title="Toggle Lo-fi Ambient Chords"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                <div className="flex items-end space-x-0.5 h-3">
                  <span className="w-0.5 h-2 bg-white animate-pulse" />
                  <span className="w-0.5 h-3 bg-white animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-white animate-pulse delay-150" />
                </div>
                <span className="hidden sm:inline">Music ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Play Melody</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
