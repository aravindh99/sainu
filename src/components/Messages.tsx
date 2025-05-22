import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Typewriter } from 'react-simple-typewriter';

interface Message {
  text: string;
  emoji: string;
}

const messages: Message[] = [
  {
    text: "Every time I see you, my heart skips a beat",
    emoji: "❤️"
  },
  {
    text: "You make my world more beautiful",
    emoji: "🌸"
  },
  {
    text: "You are my favorite hello and my hardest goodbye",
    emoji: "✨"
  },
  {
    text: "Every moment with you feels like a dream",
    emoji: "💫"
  }
];

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  duration: number;
}

const Messages = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Floating particles effect
  useEffect(() => {
    const createParticle = () => {
      const particle: Particle = {
        id: Math.random(),
        emoji: ['❤️', '🌸', '✨'][Math.floor(Math.random() * 3)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 3 + 2,
      };
      setParticles((prev) => [...prev, particle]);
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== particle.id));
      }, particle.duration * 1000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  // Auto-advance messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[300px] py-16 px-4 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-pink-300/30"
          initial={{ y: '100vh', x: `${particle.x}vw` }}
          animate={{ y: '-10vh' }}
          transition={{
            duration: particle.duration,
            ease: 'linear',
          }}
          style={{ fontSize: `${particle.size}px` }}
        >
          {particle.emoji}
        </motion.div>
      ))}

      {/* Message Display */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-pink-500/20"
        >
          <div className="text-2xl md:text-3xl font-medium text-white mb-4 min-h-[3rem]">
            <Typewriter
              words={[messages[currentMessageIndex].text]}
              loop={1}
              cursor
              cursorStyle="|"
              typeSpeed={40}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </div>
          <motion.div
            key={`emoji-${currentMessageIndex}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl"
          >
            {messages[currentMessageIndex].emoji}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Messages; 