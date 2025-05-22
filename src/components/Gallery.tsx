import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Image {
  id: number;
  src: string;
  alt: string;
  compliment: string;
}

const images: Image[] = [
  {
    id: 1,
    src: '/s4.jpg',
    alt: 'Your beautiful smile',
    compliment: 'Your smile makes my heart skip a beat every time 💝'
  },
  {
    id: 2,
    src: '/s2.jpg',
    alt: 'Your enchanting eyes',
    compliment: 'Your eyes are like stars that light up my world ✨'
  },
  {
    id: 3,
    src: '/s3.jpg',
    alt: 'Your lovely presence',
    compliment: 'Just seeing you makes my day complete 🌟'
  },
  {
    id: 4,
    src: '/s1.jpg',
    alt: 'Your charming moments',
    compliment: 'You are the most beautiful person I have ever seen 💖'
  },
  {
    id: 5,
    src: '/s5.jpg',
    alt: 'Your precious smile',
    compliment: 'Your laughter is the sweetest sound I know 🎵'
  },
  {
    id: 6,
    src: '/s6.jpg',
    alt: 'Your special moments',
    compliment: 'Every time I see you, I fall in love all over again 💕'
  },
  {
    id: 7,
    src: '/s7.jpg',
    alt: 'Your beautiful memories',
    compliment: 'You are the reason I believe in love at first sight 💫'
  },
  {
    id: 8,
    src: '/s8.jpg',
    alt: 'Your lovely smile',
    compliment: 'Your beauty takes my breath away every time 🌸'
  },
  {
    id: 9,
    src: '/s9.jpg',
    alt: 'Your precious moments',
    compliment: 'You are the most beautiful dream I never want to wake up from 💝'
  }
];

interface Butterfly {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  useEffect(() => {
    const createButterfly = () => {
      const butterfly: Butterfly = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
      };
      setButterflies((prev) => [...prev, butterfly]);
      setTimeout(() => {
        setButterflies((prev) => prev.filter((b) => b.id !== butterfly.id));
      }, butterfly.duration * 1000);
    };

    const interval = setInterval(createButterfly, 2000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative py-16 px-4 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {butterflies.map((butterfly) => (
          <motion.div
            key={butterfly.id}
            className="absolute text-pink-300/30"
            initial={{ 
              x: `${butterfly.x}vw`,
              y: '100vh',
              rotate: 0
            }}
            animate={{ 
              y: '-10vh',
              rotate: [0, 20, -20, 0],
              x: `${butterfly.x + (Math.random() * 20 - 10)}vw`
            }}
            transition={{
              duration: butterfly.duration,
              delay: butterfly.delay,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            }}
            style={{ fontSize: `${butterfly.size}px` }}
          >
            🦋
          </motion.div>
        ))}
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
      >
        Your Beautiful Moments 🌸
      </motion.h2>

      {/* Carousel */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
        <motion.div
          className="relative w-full h-full"
          animate={{ x: `${-currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              style={{ left: `${index * 100}%` }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="relative max-w-4xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/20 text-white"
        >
          ←
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white/20 text-white"
        >
          →
        </motion.button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-gray-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-pink-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="w-full h-auto object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6 bg-gradient-to-r from-pink-900/50 to-purple-900/50">
                <p className="text-lg text-white font-medium">
                  {selectedImage.compliment}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery; 