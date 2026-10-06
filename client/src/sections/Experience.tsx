import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '../theme';
import { workExperience } from '../data/content';
import { StarIcon } from '../components/icons';
import Pill from '../components/Pill';
import PrimaryButton from '../components/PrimaryButton';
import Reveal from '../components/Reveal';
import SectionTag from '../components/SectionTag';
import { Container, gutters } from '../components/Section';

export default function Experience() {
  const { role, company, location, period, type, headline, summary, responsibilities, technologies } =
    workExperience;

  return (
    <Box
      component="section"
      id="experience"
      sx={{
        backgroundColor: colors.page,
        pt: { xs: '60px', lg: '100px' },
        pb: { xs: '40px', lg: '80px' },
        scrollMarginTop: { xs: '80px', md: '100px' },
        ...gutters,
      }}
    >
      <Container>
        {/* Top Section Header (Matches About section pattern) */}
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
            <SectionTag label="Work Experience" />
          </Reveal>
          <Box
            sx={{
              width: { xs: '100%', md: '72%', lg: 750 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '24px',
            }}
          >
            <Reveal delay={0.2}>
              <Typography variant="h2">{headline}</Typography>
            </Reveal>
            <Reveal delay={0.3} duration={0.7}>
              <PrimaryButton label="Get In Touch" to="/contact-us" />
            </Reveal>
          </Box>
        </Box>

        {/* Dedicated Single Work Experience Card */}
        <Box sx={{ mt: { xs: '40px', lg: '48px' } }}>
          <Reveal
            y={30}
            delay={0.2}
            sx={{
              p: { xs: '24px', sm: '36px', md: '48px' },
              borderRadius: '24px',
              backgroundColor: colors.card,
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
            }}
          >
            {/* Header Row: Company, Role & Active Badge */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                pb: '24px',
                borderBottom: `1px solid ${colors.line}`,
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <StarIcon style={{ color: colors.blue, fontSize: 18 }} />
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: colors.blue,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {company}
                  </Typography>
                </Box>

                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: 26, sm: 34, md: 38 },
                    color: colors.ink,
                    lineHeight: 1.15,
                  }}
                >
                  {role}
                </Typography>

                <Typography sx={{ fontSize: 15, color: colors.text, fontWeight: 500 }}>
                  📍 {location}
                </Typography>
              </Box>

              {/* Status Badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  px: '16px',
                  py: '8px',
                  borderRadius: '50px',
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#059669',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    boxShadow: '0 0 8px #10B981',
                  }}
                />
                {period} • {type}
              </Box>
            </Box>

            {/* Summary Paragraph */}
            <Typography
              variant="body1"
              sx={{
                color: colors.text,
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.8,
                maxWidth: '900px',
              }}
            >
              {summary}
            </Typography>

            {/* Key Contributions & Responsibilities Grid */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: colors.ink,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Key Responsibilities & Contributions:
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                  gap: { xs: '12px', md: '16px 28px' },
                }}
              >
                {responsibilities.map((item, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: colors.blue,
                        mt: '9px',
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.text,
                        fontSize: { xs: 14, md: 15 },
                        lineHeight: 1.65,
                      }}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Technologies Applied */}
            <Box sx={{ pt: '20px', borderTop: `1px solid ${colors.line}` }}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: colors.text,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  mb: '12px',
                }}
              >
                Core Technologies Applied
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {technologies.map((tech) => (
                  <Pill key={tech} sx={{ height: 32, px: '16px', fontSize: 13.5 }}>
                    {tech}
                  </Pill>
                ))}
              </Box>
            </Box>
          </Reveal>
        </Box>
      </Container>
    </Box>
  );
}
