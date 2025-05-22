import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const Footer = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [showFlower, setShowFlower] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    setShowFlower(true);
    setShowQuote(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowFlower(false);
      setShowQuote(false);
      setShowConfetti(false);
    }, 3000);
  };

  return (
    <div className="relative py-16 px-4 bg-gradient-to-b from-purple-50 to-pink-50 overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}

      {/* Main Footer Content */}
      <div className="max-w-2xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-medium text-gray-800 mb-8"
        >
          Just wanted you to know... you're unforgettable.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full 
                   shadow-lg hover:shadow-xl transition-shadow duration-300 font-medium"
        >
          Click Me
        </motion.button>
      </div>

      {/* Animated Flower */}
      <AnimatePresence>
        {showFlower && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl"
          >
            🌷
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Quote */}
      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
          >
            <p className="text-xl text-gray-800 font-medium">
              🌷 A website for the prettiest soul
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 left-10 text-3xl"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-10 right-10 text-3xl"
        >
          💖
        </motion.div>
      </div>
    </div>
  );
};

export default Footer; 