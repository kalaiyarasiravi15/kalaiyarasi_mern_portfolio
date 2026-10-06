import type { MouseEventHandler, ReactNode } from 'react';
import { motion } from 'motion/react';
import type { SxProps, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { ease } from '../theme';

const MotionBox = motion.create(Box);

interface RevealProps {
  children: ReactNode;
  /** Distance in px the element rises while fading in. */
  y?: number;
  /** Starting scale, for cards that grow into place. */
  scale?: number;
  delay?: number;
  duration?: number;
  /** How much of the element must be visible before it animates. */
  amount?: 'some' | 'all' | number;
  sx?: SxProps<Theme>;
  className?: string;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
}

/** Fades content in the first time it scrolls into view. */
export default function Reveal({
  children,
  y = 30,
  scale = 1,
  delay = 0,
  duration = 0.6,
  amount = 'some',
  sx,
  className,
  onMouseEnter,
}: RevealProps) {
  return (
    <MotionBox
      className={className}
      onMouseEnter={onMouseEnter}
      sx={sx}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </MotionBox>
  );
}
