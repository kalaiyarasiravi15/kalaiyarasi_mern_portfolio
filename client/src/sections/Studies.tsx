import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '../theme';
import { educationCards } from '../data/content';
import { StarIcon } from '../components/icons';
import Pill from '../components/Pill';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import { Container, gutters } from '../components/Section';

const swap = '0.4s linear';

/**
 * Studies & Educational Background section.
 * On desktop the two cards trade focus on hover: the active card widens with
 * full details and solid background, while the other sits in frosted glass.
 */
export default function Studies() {
  const [active, setActive] = useState(0);

  return (
    <Box
      component="section"
      id="education"
      sx={{
        position: 'relative',
        zIndex: 1,
        py: { xs: '48px', lg: '80px' },
        scrollMarginTop: { xs: '80px', md: '100px' },
        ...gutters,
      }}
    >
      {/* Anchor for backward compatibility with #studies */}
      <Box id="studies" sx={{ position: 'absolute', top: 0, left: 0 }} />
      <Container>
        <SectionTitle
          tag="Studies & Education"
          lines={['Educational Journey &', 'Academic Milestones']}
          onDark
        />

        <Box
          sx={{
            mt: { xs: '40px', lg: '64px' },
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {educationCards.map((card, index) => {
            // Below desktop the cards stack, so the first one is always solid.
            const solid = { xs: index === 0, lg: active === index };
            const pick = <T,>(whenSolid: T, whenGlass: T) => ({
              xs: solid.xs ? whenSolid : whenGlass,
              lg: solid.lg ? whenSolid : whenGlass,
            });

            return (
              <Reveal
                key={card.label}
                y={0}
                scale={0.7}
                delay={0.1 + index * 0.1}
                duration={0.7}
                onMouseEnter={() => setActive(index)}
                sx={{
                  flex: { xs: 'none', lg: active === index ? '750 1 0' : '420 1 0' },
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  p: '16px 16px 24px',
                  borderRadius: '24px',
                  border: '1px solid',
                  borderColor: pick('transparent', 'rgba(255, 255, 255, 0.12)'),
                  backgroundColor: pick(colors.card, 'rgba(255, 255, 255, 0.08)'),
                  backdropFilter: pick('none', 'blur(16px)'),
                  boxShadow: pick('0 16px 40px rgba(0, 0, 0, 0.25)', 'none'),
                  transition: `flex-grow ${swap}, background-color ${swap}, border-color ${swap}, box-shadow ${swap}`,
                  '& *': { transition: `color ${swap}, background-color ${swap}, border-color ${swap}` },
                }}
              >
                {/* Header Box */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    p: '24px',
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: pick('transparent', 'rgba(255, 255, 255, 0.12)'),
                    backgroundColor: pick(colors.page, 'rgba(255, 255, 255, 0.08)'),
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Box sx={{ display: 'flex', color: pick(colors.blue, colors.white) }}>
                          <StarIcon size={14} />
                        </Box>
                        <Typography sx={{ color: pick(colors.text, colors.white), fontWeight: 600, fontSize: 13, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                          {card.label}
                        </Typography>
                      </Box>
                      <Pill
                        sx={{
                          height: 26,
                          px: '12px',
                          fontSize: 12,
                          backgroundColor: pick('rgba(52, 88, 255, 0.08)', 'rgba(255, 255, 255, 0.15)'),
                          color: pick(colors.blue, colors.white),
                          fontWeight: 600,
                        }}
                      >
                        {card.badge}
                      </Pill>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end', flexWrap: 'wrap', gap: '8px', mt: '4px' }}>
                      <Typography variant="h3" sx={{ color: pick(colors.ink, colors.white), fontSize: { xs: 24, md: 32 } }}>
                        {card.title}
                      </Typography>
                      <Typography sx={{ color: pick(colors.blue, colors.page), fontWeight: 600, fontSize: 16, mb: '4px' }}>
                        {card.suffix}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <Typography sx={{ fontWeight: 600, color: pick(colors.ink, colors.white), fontSize: 15 }}>
                        {card.subtitle}
                      </Typography>
                      <Typography sx={{ color: pick(colors.text, colors.page), fontSize: 13 }}>
                        • {card.location}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography sx={{ color: pick(colors.text, colors.page), fontSize: 14, lineHeight: 1.7 }}>
                    {card.description}
                  </Typography>
                </Box>

                {/* Content Box */}
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '20px',
                    px: '12px',
                    py: '8px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <Typography sx={{ fontWeight: 600, fontSize: 14, color: pick(colors.ink, colors.white) }}>
                        {card.listTitle}
                      </Typography>
                      <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {card.items.map((item) => (
                          <Box key={item} component="li" sx={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <Box
                              sx={{
                                flexShrink: 0,
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: pick(colors.blue, '#61DAFB'),
                                mt: '8px',
                              }}
                            />
                            <Typography sx={{ color: pick(colors.text, colors.page), fontSize: 14, lineHeight: 1.65 }}>
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>

                    {/* Skill / Milestone Tags */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px', pt: '8px' }}>
                      {card.tags.map((tag) => (
                        <Pill
                          key={tag}
                          sx={{
                            height: 26,
                            px: '12px',
                            fontSize: 12,
                            backgroundColor: pick('rgba(0, 0, 0, 0.04)', 'rgba(255, 255, 255, 0.12)'),
                            color: pick(colors.text, colors.white),
                          }}
                        >
                          {tag}
                        </Pill>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Reveal>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
