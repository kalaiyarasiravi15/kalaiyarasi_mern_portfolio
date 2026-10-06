import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { colors } from '../theme';
import { highlights, highlightSource } from '../data/content';
import { ArrowIcon } from '../components/icons';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import { Container, gutters } from '../components/Section';

const MotionBox = motion.create(Box);

type Highlight = (typeof highlights)[number];

function HighlightCard({ item }: { item: Highlight }) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        gap: { xs: '24px', md: '36px', lg: '48px' },
        p: { xs: '20px', md: '28px', lg: '32px' },
        borderRadius: '24px',
        backgroundColor: colors.card,
      }}
    >
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px',
          pb: { md: '64px' },
        }}
      >
        {/* Top Badges */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <Box
            sx={{
              px: '16px',
              py: '6px',
              borderRadius: '40px',
              backgroundColor: colors.ink,
              color: colors.white,
              fontSize: 13,
              fontWeight: 600,
              lineHeight: '20px',
              letterSpacing: '-0.01em',
            }}
          >
            {item.pill}
          </Box>

          {item.url && (
            <Box
              component="a"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: 12,
                fontWeight: 600,
                color: colors.blue,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              ● Live Site ↗
            </Box>
          )}
        </Box>

        {/* Project Title */}
        <Box>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: 24, sm: 28, md: 32 },
              color: colors.ink,
              fontWeight: 700,
              lineHeight: 1.15,
              mb: '4px',
            }}
          >
            {item.project}
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body1" sx={{ color: colors.text, fontSize: { xs: 15, md: 16 }, lineHeight: 1.7, maxWidth: 480 }}>
          {item.text}
        </Typography>

        {/* Source & Role */}
        <Box sx={{ pt: '8px' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: colors.ink }}>
            {highlightSource.name}
          </Typography>
          <Typography sx={{ mt: '2px', fontSize: 13, color: colors.text }}>
            {highlightSource.role}
          </Typography>
        </Box>
      </Box>

      {/* Project Image Poster */}
      <Box
        sx={{
          flex: { md: 1 },
          minWidth: 0,
          width: { xs: '100%', md: 'auto' },
          height: { xs: 220, sm: 300, md: 380, lg: 410 },
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: '#0a0e17',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
        }}
      >
        <Box
          component="img"
          src={item.image}
          alt={item.project}
          loading="lazy"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'left top',
            transition: 'transform 0.5s ease',
            '&:hover': { transform: 'scale(1.03)' },
          }}
        />
      </Box>
    </Box>
  );
}

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? '102.2%' : '-102.2%' }),
  center: { x: '0%' },
  exit: (direction: number) => ({ x: direction > 0 ? '-102.2%' : '102.2%' }),
};

const AUTOPLAY_MS = 4000;

const arrowButton = {
  width: 42,
  height: 42,
  p: 0,
  border: 0,
  borderRadius: '50%',
  display: 'grid',
  placeItems: 'center',
  backgroundColor: colors.ink,
  color: colors.white,
  cursor: 'pointer',
  transition: 'all 0.25s ease',
  '&:hover': { backgroundColor: colors.blue, transform: 'scale(1.06)' },
} as const;

export default function Highlights() {
  const theme = useTheme();
  const isWide = useMediaQuery(theme.breakpoints.up('md'));
  const [[index, direction], setSlide] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = (step: number) =>
    setSlide(([current]) => [(current + step + highlights.length) % highlights.length, step]);

  const goTo = (targetIdx: number) => {
    if (targetIdx === index) return;
    setSlide([targetIdx, targetIdx > index ? 1 : -1]);
  };

  // Advances on its own every few seconds; hovering holds the slide.
  useEffect(() => {
    if (!isWide || paused) return;
    const timer = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [isWide, paused, index]);

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        zIndex: 1,
        py: { xs: '40px', lg: '80px' },
        background: 'linear-gradient(180deg, #090d16 0%, #041b52 50%, #03236d 100%)',
        color: colors.white,
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        ...gutters,
      }}
    >
      <Container>
        <SectionTitle tag="Work Highlights" lines={['How I deliver', 'real client projects']} align="left" onDark />

        <Reveal y={0} scale={0.7} delay={0.2} duration={0.7} sx={{ mt: { xs: '40px', lg: '64px' } }}>
          {isWide ? (
            <Box
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              sx={{ position: 'relative', display: 'grid', overflow: 'hidden', borderRadius: '24px' }}
            >
              <AnimatePresence initial={false} custom={direction}>
                <MotionBox
                  key={index}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 200, damping: 40, mass: 1 }}
                  sx={{ gridArea: '1 / 1', minWidth: 0 }}
                >
                  <HighlightCard item={highlights[index]} />
                </MotionBox>
              </AnimatePresence>

              {/* Bottom Controls Bar: Arrows & Project Dots */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: 20, md: 36 },
                  bottom: 24,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  zIndex: 2,
                }}
              >
                {/* Arrow Navigation */}
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  <Box component="button" type="button" aria-label="Previous highlight" onClick={() => go(-1)} sx={arrowButton}>
                    <ArrowIcon size={20} style={{ transform: 'rotate(180deg)' }} />
                  </Box>
                  <Box component="button" type="button" aria-label="Next highlight" onClick={() => go(1)} sx={arrowButton}>
                    <ArrowIcon size={20} />
                  </Box>
                </Box>

                {/* 6 Project Jump Indicators */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {highlights.map((h, i) => {
                    const isSelected = i === index;
                    return (
                      <Box
                        key={h.project}
                        onClick={() => goTo(i)}
                        sx={{
                          height: 8,
                          width: isSelected ? 24 : 8,
                          borderRadius: '4px',
                          backgroundColor: isSelected ? colors.blue : 'rgba(0, 0, 0, 0.25)',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          '&:hover': {
                            backgroundColor: colors.blue,
                          },
                        }}
                      />
                    );
                  })}
                </Box>

                <Typography sx={{ fontSize: 12, fontWeight: 600, color: colors.ink, ml: '4px' }}>
                  {String(index + 1).padStart(2, '0')} / {String(highlights.length).padStart(2, '0')}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {highlights.map((item) => (
                <HighlightCard key={item.project} item={item} />
              ))}
            </Box>
          )}
        </Reveal>
      </Container>
    </Box>
  );
}
