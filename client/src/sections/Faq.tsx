import { useState } from 'react';
import { motion } from 'motion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors, cssEase, ease } from '../theme';
import { faqs } from '../data/content';
import PrimaryButton from '../components/PrimaryButton';
import Reveal from '../components/Reveal';
import SectionTag from '../components/SectionTag';
import { Container, gutters } from '../components/Section';

const MotionBox = motion.create(Box);

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Box component="section" id="faq" sx={{ py: { xs: '30px', lg: '60px' }, scrollMarginTop: { xs: '80px', md: '100px' }, ...gutters }}>
      <Container
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
          alignItems: 'start',
          gap: '24px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            backgroundColor: colors.card,
            py: '53px',
            px: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            textAlign: 'center',
          }}
        >
          {/* blue cloud with a pale glow along the top edge */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              background: [
                'radial-gradient(55% 22% at 50% 0%, rgba(233, 236, 255, 0.95) 0%, rgba(233, 236, 255, 0) 100%)',
                'radial-gradient(85% 78% at 50% 22%, #4468FF 0%, rgba(84, 116, 255, 0.95) 38%, rgba(150, 170, 255, 0.6) 62%, rgba(246, 247, 250, 0) 86%)',
              ].join(', '),
            }}
          />
          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Reveal>
              <SectionTag label="FAQ Questions" onDark />
            </Reveal>
            <Reveal delay={0.1}>
              <Typography variant="h2" sx={{ color: colors.white, maxWidth: 400 }}>
                Got questions about working together?
              </Typography>
            </Reveal>
          </Box>
          <Reveal y={24} delay={0.2} sx={{ position: 'relative' }}>
            <PrimaryButton label="Get In Touch" to="/contact-us" />
          </Reveal>
        </Box>

        <Reveal y={50} delay={0.2} sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {faqs.map((faq, index) => {
            const isOpen = open === index;
            return (
              <Box key={faq.question} sx={{ pb: '24px', borderRadius: '20px', backgroundColor: colors.card, overflow: 'hidden' }}>
                <Box
                  component="button"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    p: '24px 24px 0',
                    border: 0,
                    background: 'none',
                    font: 'inherit',
                    textAlign: 'left',
                    cursor: 'pointer',
                  }}
                >
                  <Typography variant="subtitle1" component="span">
                    {faq.question}
                  </Typography>
                  <Box sx={{ position: 'relative', flexShrink: 0, width: 24, height: 24 }}>
                    <Box sx={{ position: 'absolute', top: 11, left: 5, width: 14, height: 2, backgroundColor: '#000' }} />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 11,
                        left: 5,
                        width: 14,
                        height: 2,
                        backgroundColor: '#000',
                        transform: isOpen ? 'rotate(0deg)' : 'rotate(90deg)',
                        transition: `transform 0.3s ${cssEase}`,
                      }}
                    />
                  </Box>
                </Box>
                <MotionBox
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.4, ease }}
                  sx={{ overflow: 'hidden' }}
                >
                  <Typography sx={{ px: '24px', pt: '12px', maxWidth: 500 }}>{faq.answer}</Typography>
                </MotionBox>
              </Box>
            );
          })}
        </Reveal>
      </Container>
    </Box>
  );
}
