import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  emoji: string;
}

interface Box {
  id: number;
  hasRing: boolean;
  revealed: boolean;
}

const HEART_EMOJIS = ['🖤', '💝', '💖', '💗', '💓', '💕', '💘', '💞'];

const Hero = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [caughtHearts, setCaughtHearts] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [showProposal, setShowProposal] = useState(false);
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

  useEffect(() => {
    const createHeart = () => {
      const heart: Heart = {
        id: Math.random(),
        x: Math.random() * 80 + 10, // Keep within 10-90% of container
        y: Math.random() * 80 + 10,
        size: Math.random() * 20 + 20, // Size between 20-40px
        duration: Math.random() * 3 + 2, // Duration between 2-5s
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      };
      setHearts((prev) => [...prev, heart]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== heart.id));
      }, heart.duration * 1000);
    };

    const interval = setInterval(createHeart, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const initializeBoxes = () => {
      const randomIndex = Math.floor(Math.random() * 5);
      return Array(5).fill(null).map((_, index) => ({
        id: index,
        hasRing: index === randomIndex,
        revealed: false,
      }));
    };
    setBoxes(initializeBoxes());
  }, []);

  const handleHeartClick = (heartId: number) => {
    setHearts((prev) => prev.filter((h) => h.id !== heartId));
    setCaughtHearts((prev) => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        setShowConfetti(true);
        setShowMessage(true);
        setTimeout(() => {
          setShowConfetti(false);
          setShowMessage(false);
          setCaughtHearts(0);
        }, 3000);
      }
      return newCount;
    });
  };

  const handleBoxClick = (boxId: number) => {
    setBoxes((prev) =>
      prev.map((box) =>
        box.id === boxId ? { ...box, revealed: true } : box
      )
    );

    const clickedBox = boxes.find((box) => box.id === boxId);
    if (clickedBox?.hasRing) {
      setShowConfetti(true);
      setShowProposal(true);
      setTimeout(() => {
        setShowConfetti(false);
        setShowProposal(false);
        // Reset boxes with new random ring position
        const randomIndex = Math.floor(Math.random() * 5);
        setBoxes(
          Array(5)
            .fill(null)
            .map((_, index) => ({
              id: index,
              hasRing: index === randomIndex,
              revealed: false,
            }))
        );
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
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

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[80vh]">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center md:text-left"
          >
            <div className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/20 shadow-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400"
              >
                Hey Sainu 🌸
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl text-white font-medium"
              >
                I built you a little world... wanna explore it?
              </motion.p>
            </div>
          </motion.div>

          {/* Right Side - Games */}
          <div className="space-y-8">
            {/* Heart Game */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative h-[300px] bg-black/30 backdrop-blur-sm rounded-2xl border border-pink-500/20 shadow-2xl overflow-hidden"
            >
              {/* Floating Hearts */}
              {hearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${heart.x}%`,
                    top: `${heart.y}%`,
                    fontSize: `${heart.size}px`,
                  }}
                  initial={{ scale: 0 }}
                  animate={{
                    scale: 1,
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: heart.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  onClick={() => handleHeartClick(heart.id)}
                >
                  {heart.emoji}
                </motion.div>
              ))}

              {/* Game Message */}
              <AnimatePresence>
                {showMessage && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                  >
                    <p className="text-3xl text-white font-bold">
                      You caught my heart 💖
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Game Instructions */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
                <p className="text-lg">Catch 3 hearts to win!</p>
                <p className="text-sm opacity-70">Hearts caught: {caughtHearts}/3</p>
              </div>
            </motion.div>

            {/* Find the Ring Game */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative h-[200px] bg-black/30 backdrop-blur-sm rounded-2xl border border-pink-500/20 shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-5 gap-4 px-4">
                  {boxes.map((box) => (
                    <motion.button
                      key={box.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleBoxClick(box.id)}
                      className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl
                        ${box.revealed
                          ? box.hasRing
                            ? 'bg-pink-500/50'
                            : 'bg-red-500/50'
                          : 'bg-white/10 hover:bg-white/20'
                        }`}
                    >
                      {box.revealed ? (box.hasRing ? '💍' : '❌') : '🎁'}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Game Instructions */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
                <p className="text-lg">Find the ring 💍</p>
              </div>

              {/* Proposal Message */}
              <AnimatePresence>
                {showProposal && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                  >
                    <div className="text-center">
                      <p className="text-3xl text-white font-bold mb-4">
                        Will you be mine forever? 💝
                      </p>
                      <p className="text-xl text-pink-300">
                        You found my heart and my ring ✨
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 