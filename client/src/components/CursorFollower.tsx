import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import Box from '@mui/material/Box';
import { colors } from '../theme';
import { EyesIcon } from './icons';

const MotionBox = motion.create(Box);

/**
 * Small "eyes" badge that trails the pointer while it is over any element
 * marked with data-cursor="view" (project and live-site cards).
 */
export default function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as Element | null;
      setVisible(Boolean(target?.closest?.('[data-cursor="view"]')));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y]);

  return (
    <MotionBox
      aria-hidden
      style={{ x: springX, y: springY }}
      initial={false}
      animate={{ scale: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.25 }}
      sx={{
        position: 'fixed',
        top: -19,
        left: -19,
        width: 38,
        height: 38,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(16, 16, 16, 0.3)',
        color: colors.ink,
        display: 'grid',
        placeItems: 'center',
        pointerEvents: 'none',
        zIndex: 2000,
      }}
    >
      <EyesIcon size={14} />
    </MotionBox>
  );
}
