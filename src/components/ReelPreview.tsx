import { motion } from 'framer-motion';
import { useState } from 'react';

interface Reel {
  id: number;
  url: string;
  caption: string;
}

const reels: Reel[] = [
  {
    id: 1,
    url: "https://www.instagram.com/reel/C4XzXzXzXzX/embed",
    caption: "Your smile brightens up my world ✨"
  },
  {
    id: 2,
    url: "https://www.instagram.com/reel/C4YyYyYyYyY/embed",
    caption: "Every moment with you is magical 💫"
  },
  {
    id: 3,
    url: "https://www.instagram.com/reel/C4ZzZzZzZzZ/embed",
    caption: "You make my heart skip a beat 💝"
  }
];

const ReelPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReel = () => {
    setCurrentIndex((prev) => (prev + 1) % reels.length);
  };

  const prevReel = () => {
    setCurrentIndex((prev) => (prev - 1 + reels.length) % reels.length);
  };

  return (
    <div className="relative py-16 px-4 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
      >
        Our Special Moments 🎥
      </motion.h2>

      {/* Reel Container */}
      <div className="relative max-w-4xl mx-auto">
        <div className="relative aspect-[9/16] w-full max-w-[350px] mx-auto overflow-hidden rounded-2xl bg-black/30 backdrop-blur-sm border border-pink-500/20 shadow-2xl">
          <iframe
            src={reels[currentIndex].url}
            className="w-full h-full"
            frameBorder="0"
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        </div>

        {/* Caption */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          <p className="text-xl text-white font-medium bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-pink-500/20">
            {reels[currentIndex].caption}
          </p>
        </motion.div>

        {/* Navigation */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevReel}
            className="bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/20 text-white"
          >
            ←
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextReel}
            className="bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/20 text-white"
          >
            →
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ReelPreview; 