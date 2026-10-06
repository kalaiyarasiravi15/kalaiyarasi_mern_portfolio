import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'motion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import StarRounded from '@mui/icons-material/StarRounded';
import { colors, ease } from '../theme';
import { counters, heroTags, profile, shortMernIntro } from '../data/content';
import CounterCard from '../components/CounterCard';
import Pill from '../components/Pill';
import Portrait from '../components/Portrait';
import PrimaryButton from '../components/PrimaryButton';
import Reveal from '../components/Reveal';
import SectionTag from '../components/SectionTag';
import { Container, gutters } from '../components/Section';

const MotionBox = motion.create(Box);

/** Width of the hero word in em, used to size it to exactly fill the container. */
const HERO_WORD_EM = 5.78;

/** Distance from the hero's bottom edge to the top of the first counter card. */
const COUNTER_OFFSET_FROM_HERO_BOTTOM = 320;

/** Small per-card offsets from the slot, so the cards land slightly overlapped as designed. */
const LANDING_NUDGE = [
  { x: 3, y: 0 },
  { x: -2, y: 3 },
];

/** Position of `element` inside `ancestor`, ignoring any CSS transforms. */
function offsetWithin(element: HTMLElement, ancestor: HTMLElement) {
  let left = 0;
  let top = 0;
  let node: HTMLElement | null = element;
  while (node && node !== ancestor) {
    left += node.offsetLeft;
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { left, top };
}

/**
 * Hero + About. On desktop the two stat cards start stacked in the hero and
 * travel with the scroll into their slots above the About cards.
 */
export default function Intro() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const cardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const slotRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  const travel = useRef([
    { dx: 0, dy: 0 },
    { dx: 0, dy: 0 },
  ]);
  const range = useRef(875);
  const [counterTop, setCounterTop] = useState(524);

  const { scrollY } = useScroll();
  // Bumped after every measurement so the transforms below recompute.
  const measured = useMotionValue(0);

  const progress = () => {
    measured.get();
    return Math.min(Math.max(scrollY.get() / range.current, 0), 1);
  };
  const x0 = useTransform(() => progress() * travel.current[0].dx);
  const y0 = useTransform(() => progress() * travel.current[0].dy);
  const x1 = useTransform(() => progress() * travel.current[1].dx);
  const y1 = useTransform(() => progress() * travel.current[1].dy);
  const cardMotion = [
    { x: x0, y: y0 },
    { x: x1, y: y1 },
  ];

  const measure = useCallback(() => {
    const main = mainRef.current;
    const hero = heroRef.current;
    if (!main || !hero) return;

    setCounterTop(hero.offsetHeight - COUNTER_OFFSET_FROM_HERO_BOTTOM);
    // The cards finish travelling when the slot arrives into view in the viewport.
    const slot0 = slotRefs[0].current;
    if (slot0) {
      const slotPos = offsetWithin(slot0, main);
      range.current = Math.max(slotPos.top - window.innerHeight * 0.45, 300);
    } else {
      range.current = Math.max(main.offsetHeight - window.innerHeight, 1);
    }

    cardRefs.forEach((cardRef, index) => {
      const card = cardRef.current;
      const slot = slotRefs[index].current;
      if (!card || !slot) return;
      const from = offsetWithin(card, main);
      const to = offsetWithin(slot, main);
      travel.current[index] = {
        dx: to.left - from.left + LANDING_NUDGE[index].x,
        dy: to.top - from.top + LANDING_NUDGE[index].y,
      };
    });
    measured.set(measured.get() + 1);
    // Refs are stable, so the callback never needs to change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-measure once counterTop has been applied, and whenever layout changes.
  useLayoutEffect(() => {
    if (isDesktop) measure();
  }, [isDesktop, counterTop, measure]);

  useEffect(() => {
    if (!isDesktop || !mainRef.current) return;
    const observer = new ResizeObserver(measure);
    observer.observe(mainRef.current);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => undefined);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isDesktop, measure]);

  return (
    <Box ref={mainRef} sx={{ position: 'relative' }}>
      {/* Travelling stat cards (desktop only) */}
      {isDesktop && (
        <Box
          sx={{
            position: 'absolute',
            top: counterTop,
            left: 0,
            right: 0,
            mx: 'auto',
            width: 'min(1140px, calc(100% - 60px))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '12px',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        >
          {counters.map((counter, index) => (
            <MotionBox key={counter.label} ref={cardRefs[index]} style={cardMotion[index]}>
              <CounterCard {...counter} />
            </MotionBox>
          ))}
        </Box>
      )}

      {/* Floating skill pills that drop in over the portrait (desktop only) */}
      <Box
        aria-hidden
        sx={{
          display: { xs: 'none', lg: 'block' },
          position: 'absolute',
          top: 214,
          left: 0,
          right: 0,
          mx: 'auto',
          width: 781,
          height: 222,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <MotionBox
          initial={{ y: -135, rotate: 0 }}
          animate={{ y: 0, rotate: -26 }}
          transition={{ duration: 1, ease }}
          sx={{ position: 'absolute', left: 14, top: 155 }}
        >
          <Pill>{heroTags[0]}</Pill>
        </MotionBox>
        <MotionBox
          initial={{ y: -135, rotate: 0 }}
          animate={{ y: 0, rotate: 15 }}
          transition={{ duration: 1, ease }}
          sx={{ position: 'absolute', right: 90, top: 90 }}
        >
          <Pill>{heroTags[1]}</Pill>
        </MotionBox>
      </Box>

      {/* ---------------------------------------------------------------- Hero */}
      <Box
        component="section"
        ref={heroRef}
        sx={{
          position: 'relative',
          overflow: 'clip',
          backgroundColor: colors.hero,
          pt: { xs: '150px', md: '165px', lg: '180px' },
          pb: '30px',
          ...gutters,
        }}
      >
        <Container sx={{ position: 'relative', containerType: 'inline-size' }}>
          <MotionBox
            aria-hidden
            initial={{ y: 170 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'linear' }}
            sx={{ position: 'relative', zIndex: 1, height: { xs: 76, md: 158, lg: 244 } }}
          >
            <Box
              component="span"
              sx={{
                display: 'block',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                textTransform: 'uppercase',
                fontWeight: 800,
                fontSize: `calc(100cqw / ${HERO_WORD_EM})`,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                backgroundImage: 'linear-gradient(0deg, rgba(255, 255, 255, 0) 24%, rgba(255, 255, 255, 0.8) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {profile.heroWord}
            </Box>
          </MotionBox>

          <Box sx={{ position: 'relative', zIndex: 2, mt: { xs: '95px', md: '200px', lg: '192px' } }}>
            {/* Soft veil that fades the bottom of the portrait into the background */}
            <Box
              sx={{
                position: 'absolute',
                top: { xs: 25, lg: 20 },
                left: { xs: -29, lg: -123 },
                right: { xs: -28, lg: -128 },
                height: { xs: 174, md: 240, lg: 281 },
                backgroundColor: colors.hero,
                filter: 'blur(25px)',
              }}
            />
            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                <Typography variant="subtitle1" sx={{ color: colors.text, fontSize: { xs: 16, md: 18 } }}>
                  Hey, I’m {profile.name}
                </Typography>
              </MotionBox>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease }}
              >
                <Typography variant="h1">
                  {profile.heroTitle[0]}
                  <br />
                  {profile.heroTitle[1]}
                </Typography>
              </MotionBox>
            </Box>
          </Box>
        </Container>

        {/* Arch with the portrait, anchored to the bottom of the hero */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            mx: 'auto',
            width: { xs: 230, md: 420, lg: 535 },
            height: { xs: 294, md: 536, lg: 684 },
            zIndex: 1,
          }}
        >
          <MotionBox
            initial={{ y: 95 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease }}
            sx={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              borderRadius: '300px 300px 0 0',
              background: `linear-gradient(180deg, ${colors.blue} 0%, #DFE0EB 100%)`,
            }}
          >
            <Portrait sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 16%' }} />
          </MotionBox>
        </Box>
      </Box>

      {/* --------------------------------------------------------------- About */}
      <Box
        component="section"
        id="about"
        sx={{
          backgroundColor: colors.page,
          pt: { xs: '60px', lg: '120px' },
          pb: { xs: '30px', lg: '60px' },
          scrollMarginTop: { xs: '80px', md: '100px' },
          ...gutters,
        }}
      >
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: { xs: '16px', md: '40px' },
            }}
          >
            <Reveal>
              <SectionTag label="About Me" />
            </Reveal>
            <Box
              sx={{
                width: { xs: '100%', md: '72%', lg: 750 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '32px',
              }}
            >
              <Reveal delay={0.2}>
                <Typography variant="h2">{profile.aboutHeadline}</Typography>
              </Reveal>
              <Reveal delay={0.3} duration={0.7} sx={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <PrimaryButton label="Get In Touch" to="/contact-us" />
                <PrimaryButton
                  label="Download Resume"
                  href={profile.resume || '/Kalaiyarasi_MERN_Resume_ATS_new.pdf'}
                  tone="light"
                />
              </Reveal>
            </Box>
          </Box>

          <Box
            sx={{
              mt: { xs: '40px', lg: '20px' },
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              alignItems: { xs: 'stretch', lg: 'stretch' },
              gap: { xs: '24px', lg: '46px' },
            }}
          >
            <Reveal
              y={0}
              scale={0.9}
              sx={{
                flexShrink: 0,
                width: { xs: '100%', lg: 404 },
                minHeight: { xs: 440, md: 500, lg: '100%' },
                height: { xs: 440, md: 500, lg: 'auto' },
                alignSelf: { xs: 'stretch', lg: 'stretch' },
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: colors.card,
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
                p: 0,
                display: 'flex',
              }}
            >
              <Portrait sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
            </Reveal>

            <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Slots the travelling counters land in; on smaller screens the cards live here */}
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '12px' }}>
                {counters.map((counter, index) => (
                  <Box key={counter.label} ref={slotRefs[index]} sx={{ minHeight: 102 }}>
                    {!isDesktop && (
                      <Reveal y={40}>
                        <CounterCard {...counter} />
                      </Reveal>
                    )}
                  </Box>
                ))}
              </Box>

              {/* Basic MERN Stack Intro Card (Right of Portrait) */}
              <Reveal
                y={30}
                delay={0.25}
                sx={{
                  flex: 1,
                  p: { xs: '24px', sm: '32px', md: '40px' },
                  borderRadius: '20px',
                  backgroundColor: colors.card,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StarRounded sx={{ color: colors.blue, fontSize: 22 }} />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: colors.blue,
                        fontWeight: 600,
                        fontSize: 14,
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {shortMernIntro.tag}
                    </Typography>
                  </Box>

                  <Typography variant="h3" sx={{ fontSize: { xs: 26, md: 34 }, color: colors.ink, lineHeight: 1.15 }}>
                    {shortMernIntro.headline} —{' '}
                    <Box component="span" sx={{ color: colors.blue }}>
                      {shortMernIntro.role}
                    </Box>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: colors.text,
                      fontSize: { xs: 15, md: 17 },
                      lineHeight: 1.8,
                    }}
                  >
                    {shortMernIntro.bio}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px', pt: '8px' }}>
                  {shortMernIntro.pills.map((tech) => (
                    <Pill key={tech} sx={{ height: 32, px: '16px', fontSize: 14 }}>
                      {tech}
                    </Pill>
                  ))}
                </Box>
              </Reveal>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
