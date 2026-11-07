import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Upload, Sparkles, Heart } from 'lucide-react';
import { KOWSHI_DATA } from '../data/kowshiData';
import { sounds } from '../utils/soundEngine';
import { fireMicroPop } from '../utils/confettiEffects';

export default function PolaroidGallery() {
  const [photos, setPhotos] = useState(KOWSHI_DATA.polaroids);
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);

  // Handle local photo upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newPhoto = {
            id: Date.now(),
            image: event.target.result,
            caption: "New Kowshi Memory ✨",
            rotation: (Math.random() - 0.5) * 6,
            sticker: "🐮"
          };
          setPhotos((prev) => [newPhoto, ...prev.slice(0, 5)]);
          sounds.playPop(1.4);
          fireMicroPop(0.5, 0.5);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const openLightbox = (index) => {
    sounds.playPop(1.1);
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    sounds.playPop(1.2);
    setActivePhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    sounds.playPop(1.2);
    setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section id="memories" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center space-x-1.5 bg-rose-100 text-roseGold-600 px-3 py-1 rounded-full text-xs font-bold mb-2 border border-rose-200">
            <Camera className="w-3.5 h-3.5" />
            <span>Memory Lane • Polaroid Deck</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-deep-900 tracking-tight">
            Snapshots & Golden Moments 📸
          </h2>
          <p className="text-sm text-deep-600 mt-1 font-medium">
            Every photo carries an inside story, an unrepeatable laugh, and endless warmth.
          </p>
        </div>

        {/* Upload custom photo button */}
        <div>
          <label className="cursor-pointer inline-flex items-center space-x-2 bg-white hover:bg-rose-50 text-deep-800 font-bold px-4 py-2.5 rounded-full border border-rose-200 shadow-sm transition-all active:scale-95 text-xs sm:text-sm">
            <Upload className="w-4 h-4 text-roseGold-500" />
            <span>Add / Change Photos</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </label>
        </div>
      </div>

      {/* Polaroid Scatter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {photos.map((item, index) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openLightbox(index)}
            className="cursor-pointer relative bg-white p-4 pb-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border border-neutral-200/80 group select-none"
            style={{ transform: `rotate(${item.rotation}deg)` }}
          >
            {/* Washi Tape Accent */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 washi-tape rotate-1 z-10" />

            {/* Polaroid Frame & Photo */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-rose-50 mb-3 border border-neutral-100">
              <img
                src={item.image}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback aesthetic SVG placeholder if image path fails
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23ffe4e8'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='32' fill='%23f43f5e'%3E🐮 Bestie Memory%3C/text%3E%3C/svg%3E";
                }}
              />
              <span className="absolute bottom-2 right-2 text-lg drop-shadow">
                {item.sticker}
              </span>
            </div>

            {/* Polaroid Handwritten Caption */}
            <p className="font-handwritten text-xl sm:text-2xl text-deep-800 text-center tracking-wide leading-tight mt-1">
              {item.caption}
            </p>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-xs text-deep-500 mt-8 font-medium">
        💡 Tap any Polaroid to open in full high-resolution viewer.
      </p>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 bg-neutral-100 hover:bg-neutral-200 text-deep-800 rounded-full p-2 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Lightbox Image */}
              <div className="w-full max-h-[70vh] rounded-2xl overflow-hidden bg-neutral-900 flex items-center justify-center">
                <img
                  src={photos[activePhotoIndex].image}
                  alt={photos[activePhotoIndex].caption}
                  className="max-h-[68vh] w-auto object-contain rounded-xl"
                />
              </div>

              {/* Caption */}
              <div className="w-full text-center mt-4 flex items-center justify-between px-2">
                <button
                  onClick={prevPhoto}
                  className="p-2 bg-rose-50 hover:bg-rose-100 text-roseGold-600 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div>
                  <p className="font-handwritten text-2xl sm:text-3xl text-deep-800">
                    {photos[activePhotoIndex].caption}
                  </p>
                  <span className="text-xs text-deep-400 font-semibold">
                    {activePhotoIndex + 1} of {photos.length}
                  </span>
                </div>

                <button
                  onClick={nextPhoto}
                  className="p-2 bg-rose-50 hover:bg-rose-100 text-roseGold-600 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
