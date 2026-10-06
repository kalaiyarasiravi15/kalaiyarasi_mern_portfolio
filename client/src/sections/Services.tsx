import { useRef, type ReactNode } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { keyframes } from '@mui/material/styles';
import { colors, ease } from '../theme';
import { profile, services } from '../data/content';
import Pill from '../components/Pill';
import PrimaryButton from '../components/PrimaryButton';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import TechBadge, { type Tech } from '../components/TechBadge';
import { Container, gutters } from '../components/Section';

const MotionBox = motion.create(Box);

const blueBlob =
  'radial-gradient(130% 80% at 50% 0%, #4A6BFF 0%, rgba(91, 120, 255, 0.95) 32%, rgba(150, 168, 255, 0.7) 55%, rgba(246, 247, 250, 0) 80%)';

const marquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

interface ServiceCardProps {
  title: string;
  text: string;
  blue?: boolean;
  titleDelay?: number;
  titleDuration?: number;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

function ServiceCard({
  title,
  text,
  blue = false,
  titleDelay = 0,
  titleDuration = 0.6,
  children,
  sx,
}: ServiceCardProps) {
  return (
    <Box
      sx={[
        {
          position: 'relative',
          overflow: 'hidden',
          minHeight: 393,
          p: '24px',
          borderRadius: '20px',
          backgroundColor: colors.card,
          backgroundImage: blue ? blueBlob : 'none',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Reveal
        delay={titleDelay}
        duration={titleDuration}
        sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <Typography variant="h3" sx={{ color: blue ? colors.white : colors.ink }}>
          {title}
        </Typography>
        <Typography sx={{ maxWidth: 240, color: blue ? colors.page : colors.text }}>{text}</Typography>
      </Reveal>
      {children}
    </Box>
  );
}

interface TagSpot {
  left: string;
  top: number;
  rotate: number;
  enter: { x: number; y: number };
  drift: { x: number; y: number; seconds: number };
}

const tagSpots: TagSpot[] = [
  { left: '59.5%', top: 224, rotate: 30, enter: { x: 50, y: -38 }, drift: { x: 57, y: -20, seconds: 4 } },
  { left: '26%', top: 258, rotate: -13, enter: { x: -50, y: -41 }, drift: { x: -10, y: -40, seconds: 5 } },
  { left: '50%', top: 285, rotate: 0, enter: { x: 0, y: 67 }, drift: { x: 0, y: -40, seconds: 3.6 } },
  { left: '24.4%', top: 311, rotate: 12, enter: { x: -50, y: 0 }, drift: { x: 80, y: 25, seconds: 4 } },
  { left: '24.4%', top: 353, rotate: 0, enter: { x: -50, y: 0 }, drift: { x: 10, y: -50, seconds: 5 } },
  { left: '81%', top: 311, rotate: 0, enter: { x: 50, y: 0 }, drift: { x: -90, y: 0, seconds: 4 } },
  { left: '81%', top: 353, rotate: 0, enter: { x: 50, y: 0 }, drift: { x: -10, y: -50, seconds: 5 } },
];

function FloatingTag({ label, spot }: { label: string; spot: TagSpot }) {
  const controls = useAnimationControls();
  const started = useRef(false);

  const start = async () => {
    if (started.current) return;
    started.current = true;
    await controls.start({
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease },
    });
    controls.start({
      x: [0, spot.drift.x, 0],
      y: [0, spot.drift.y, 0],
      transition: {
        duration: spot.drift.seconds,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    });
  };

  return (
    <MotionBox
      initial={{ opacity: 0, x: spot.enter.x, y: spot.enter.y, rotate: spot.rotate }}
      animate={controls}
      onViewportEnter={start}
      viewport={{ once: true }}
      sx={{
        position: 'absolute',
        left: spot.left,
        top: spot.top,
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
      }}
    >
      <Pill>{label}</Pill>
    </MotionBox>
  );
}

function FrontendCard() {
  const { title, text, tags } = services.frontend;
  return (
    <ServiceCard title={title} text={text} blue sx={{ minHeight: 440 }}>
      {tags.map((tag, index) => (
        <FloatingTag key={tag} label={tag} spot={tagSpots[index % tagSpots.length]} />
      ))}
    </ServiceCard>
  );
}

function ResponsiveCard() {
  const { title, text } = services.responsive;
  return <ServiceCard title={title} text={text} blue sx={{ minHeight: 180 }} />;
}

function BackendCard() {
  const { title, text, routes } = services.backend;
  return (
    <ServiceCard title={title} text={text} sx={{ minHeight: 280 }}>
      <Box
        sx={{
          mt: '24px',
          p: '16px',
          borderRadius: '12px',
          backgroundColor: 'rgba(235, 240, 255, 0.65)',
          border: '1px solid rgba(68, 104, 255, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {routes.map((route) => {
          const methodBg =
            route.method === 'GET'
              ? '#22c55e'
              : route.method === 'POST'
              ? '#3b82f6'
              : route.method === 'PUT'
              ? '#f59e0b'
              : '#ef4444';

          return (
            <Box
              key={route.path}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontFamily: 'monospace',
                fontSize: 13,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    width: 44,
                    py: '2px',
                    textAlign: 'center',
                    borderRadius: '4px',
                    fontSize: 11,
                    fontWeight: 700,
                    backgroundColor: methodBg,
                    color: '#ffffff',
                  }}
                >
                  {route.method}
                </Box>
                <Box component="span" sx={{ color: '#1e293b', fontWeight: 500 }}>
                  {route.path}
                </Box>
              </Box>
              <Box component="span" sx={{ color: '#16a34a', fontWeight: 600 }}>
                {route.status}
              </Box>
            </Box>
          );
        })}
      </Box>
    </ServiceCard>
  );
}

const techList: Tech[] = [
  'react',
  'node',
  'express',
  'mysql',
  'mongodb',
  'javascript',
  'html',
  'css',
  'bootstrap',
  'jquery',
  'git',
  'github',
];

function DatabaseCard() {
  const { title, text } = services.database;
  return (
    <ServiceCard title={title} text={text} sx={{ minHeight: 280 }}>
      <Box sx={{ overflow: 'hidden', mt: '28px', position: 'relative', width: '100%' }}>
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            width: 'max-content',
            animation: `${marquee} 24s linear infinite`,
            '&:hover': { animationPlayState: 'paused' },
          }}
        >
          {[...techList, ...techList].map((tech, i) => (
            <TechBadge key={`${tech}-${i}`} tech={tech} size={42} />
          ))}
        </Box>
      </Box>
    </ServiceCard>
  );
}

function CtaCard() {
  const { tag, title, text, button } = services.cta;
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 580,
        p: '24px',
        borderRadius: '20px',
        backgroundColor: colors.card,
        backgroundImage: blueBlob,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Top Code Mockup Window */}
      <Reveal delay={0.15}>
        <Box
          sx={{
            p: '20px',
            borderRadius: '16px',
            backgroundColor: '#ffffff',
            boxShadow: '0 16px 36px rgba(52, 88, 255, 0.16)',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            transform: 'rotate(4deg)',
            transition: 'transform 0.4s ease',
            '&:hover': { transform: 'rotate(0deg)' },
          }}
        >
          <Box sx={{ display: 'flex', gap: '6px', mb: '12px' }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }} />
          </Box>
          <Box
            component="pre"
            sx={{
              m: 0,
              fontFamily: 'monospace',
              fontSize: 12.5,
              lineHeight: 1.6,
              color: '#334155',
            }}
          >
            <code>
              <span style={{ color: '#6366f1' }}>const</span> developer = {'{\n'}
              {'  '}name: <span style={{ color: '#059669' }}>'{profile.name}'</span>,{'\n'}
              {'  '}role: <span style={{ color: '#059669' }}>'MERN Stack'</span>,{'\n'}
              {'  '}stack: [{'\n'}
              {'    '}<span style={{ color: '#059669' }}>'MongoDB'</span>, <span style={{ color: '#059669' }}>'Express'</span>,{'\n'}
              {'    '}<span style={{ color: '#059669' }}>'React'</span>, <span style={{ color: '#059669' }}>'Node'</span>,{'\n'}
              {'  '}],{'\n'}
              {'};'}
            </code>
          </Box>
        </Box>
      </Reveal>

      {/* Bottom CTA Block */}
      <Reveal
        delay={0.3}
        duration={0.7}
        sx={{
          position: 'relative',
          zIndex: 1,
          pt: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '24px',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '1px',
            background:
              'linear-gradient(270deg, rgba(52, 88, 255, 0) 0%, rgba(171, 171, 171, 0) 15%, rgb(52, 88, 255) 53%, rgba(52, 88, 255, 0) 100%)',
          }}
        />
        <Pill>{tag}</Pill>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography variant="h3" sx={{ color: colors.ink }}>
            {title}
          </Typography>
          <Typography sx={{ maxWidth: 240, color: colors.text }}>{text}</Typography>
        </Box>
        <PrimaryButton label={button} to="/contact-us" />
      </Reveal>
    </Box>
  );
}

export default function Services() {
  return (
    <Box
      component="section"
      id="skills"
      sx={{
        position: 'relative',
        zIndex: 1,
        py: { xs: '40px', lg: '70px' },
        scrollMarginTop: { xs: '80px', md: '100px' },
        ...gutters,
      }}
    >
      {/* Invisible anchor for backward compatibility with #service */}
      <Box id="service" sx={{ position: 'absolute', top: 0, left: 0 }} />

      <Container>
        <SectionTitle tag="Core Services" lines={['Full-Stack Solutions', 'Built For Growth']} onDark />

        <Box
          sx={{
            mt: { xs: '40px', lg: '64px' },
            p: { xs: '20px', lg: '32px' },
            borderRadius: '20px',
            background:
              'linear-gradient(307deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.02) 26%, rgba(255, 255, 255, 0.02) 45%, rgba(255, 255, 255, 0.2) 78%, rgba(255, 255, 255, 0) 100%)',
            display: 'grid',
            gridTemplateColumns: {
              xs: 'minmax(0, 1fr)',
              md: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            },
            gap: '12px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <FrontendCard />
            <ResponsiveCard />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <BackendCard />
            <DatabaseCard />
          </Box>
          <CtaCard />
        </Box>
      </Container>
    </Box>
  );
}
