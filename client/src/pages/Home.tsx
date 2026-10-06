import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'motion/react';
import Box from '@mui/material/Box';
import { colors, ease } from '../theme';
import BlurSheet from '../components/BlurSheet';
import Intro from '../sections/Intro';
import Experience from '../sections/Experience';
import Studies from '../sections/Studies';
import Portfolio from '../sections/Portfolio';
import Services from '../sections/Services';
import Highlights from '../sections/Highlights';
import ResumeSection from '../sections/ResumeSection';
import Faq from '../sections/Faq';
import LiveSites from '../sections/LiveSites';

const MotionBox = motion.create(Box);

/**
 * Wraps the sections that sit on navy. The backdrop is a soft-edged sheet
 * that fades in while the stage crosses the middle of the viewport, so the
 * page appears to dim as you scroll into it and brighten as you leave.
 */
function DarkStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { margin: '-50% 0px -50% 0px' });

  return (
    <Box ref={ref} sx={{ position: 'relative' }}>
      <MotionBox
        aria-hidden
        initial={false}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.7, ease }}
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          // On narrow screens the sheet overshoots the sides so its soft edges do not wash out the colour.
          left: { xs: -160, lg: 0 },
          right: { xs: -160, lg: 0 },
          zIndex: -1,
          willChange: 'opacity',
        }}
      >
        <BlurSheet color={colors.navy} />
      </MotionBox>
      {children}
    </Box>
  );
}

export default function Home() {
  return (
    <>
      <Intro />
      <Experience />
      <DarkStage>
        <Studies />
      </DarkStage>
      <Portfolio />
      <DarkStage>
        <Services />
        <Highlights />
      </DarkStage>
      <ResumeSection />
      <Faq />
      <LiveSites />
    </>
  );
}
