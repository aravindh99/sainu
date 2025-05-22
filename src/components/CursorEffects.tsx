import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ClickEffect {
  id: number;
  x: number;
  y: number;
  type: 'heart' | 'flower';
}

const CursorEffects = () => {
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth spring animation for cursor movement
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Trail effect
  const trailOpacity = useTransform(cursorXSpring, [-100, 0], [0, 1]);
  const trailScale = useTransform(cursorYSpring, [-100, 0], [0, 1]);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleClick = (e: MouseEvent) => {
      const type = Math.random() > 0.5 ? 'heart' : 'flower';
      const effect: ClickEffect = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        type,
      };
      setClickEffects((prev) => [...prev, effect]);
      setTimeout(() => {
        setClickEffects((prev) => prev.filter((effect) => effect.id !== effect.id));
      }, 1000);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('click', handleClick);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Custom cursor */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full bg-pink-400/30 backdrop-blur-sm"
          style={{
            opacity: trailOpacity,
            scale: trailScale,
          }}
        />
      </motion.div>

      {/* Click effects */}
      {clickEffects.map((effect) => (
        <motion.div
          key={effect.id}
          className="fixed pointer-events-none z-40"
          initial={{ 
            x: effect.x - 16, 
            y: effect.y - 16,
            scale: 0,
            opacity: 1 
          }}
          animate={{ 
            y: effect.y - 100,
            scale: 1.5,
            opacity: 0 
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {effect.type === 'heart' ? '❤️' : '🌸'}
        </motion.div>
      ))}
    </>
  );
};

export default CursorEffects; 