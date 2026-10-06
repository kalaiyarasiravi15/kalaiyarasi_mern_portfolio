import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'motion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '../theme';

interface CounterCardProps {
  label: string;
  value: number;
  suffix?: string;
}

/** Stat card whose number counts up from zero every time it comes into view. */
export default function CounterCard({ label, value, suffix = '' }: CounterCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) {
      setDisplay(0);
      return;
    }
    const controls = animate(0, value, {
      type: 'spring',
      duration: 1,
      bounce: 0,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <Box
      ref={ref}
      sx={{
        width: { xs: '100%', lg: 336 },
        minHeight: 102,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        p: '24px',
        borderRadius: '20px',
        backgroundColor: colors.card,
      }}
    >
      <Typography sx={{ maxWidth: 130 }}>{label}</Typography>
      <Typography
        component="p"
        sx={{
          fontSize: 32,
          fontWeight: 500,
          lineHeight: 1.1,
          letterSpacing: '-0.04em',
          color: colors.ink,
          fontFeatureSettings: '"zero", "tnum"',
        }}
      >
        {display}
        {suffix}
      </Typography>
    </Box>
  );
}
