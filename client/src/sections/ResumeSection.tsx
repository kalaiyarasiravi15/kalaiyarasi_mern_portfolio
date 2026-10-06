import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DownloadRounded from '@mui/icons-material/DownloadRounded';
import VisibilityRounded from '@mui/icons-material/VisibilityRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import PictureAsPdfRounded from '@mui/icons-material/PictureAsPdfRounded';
import { colors, cssEase } from '../theme';
import { profile } from '../data/content';
import { StarIcon } from '../components/icons';
import Pill from '../components/Pill';
import Reveal from '../components/Reveal';
import SectionTag from '../components/SectionTag';
import { Container, gutters } from '../components/Section';

export default function ResumeSection() {
  const resumeUrl = profile.resume || '/Kalaiyarasi_MERN_Resume_ATS_new.pdf';

  return (
    <Box
      component="section"
      id="resume"
      sx={{
        backgroundColor: colors.page,
        py: { xs: '60px', lg: '100px' },
        scrollMarginTop: { xs: '80px', md: '100px' },
        ...gutters,
      }}
    >
      <Container>
        {/* Section Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: { xs: '16px', md: '40px' },
            mb: { xs: '36px', lg: '56px' },
          }}
        >
          <Reveal>
            <SectionTag label="Curriculum Vitae" />
          </Reveal>
          <Box
            sx={{
              width: { xs: '100%', md: '72%', lg: 750 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '16px',
            }}
          >
            <Reveal delay={0.15}>
              <Typography variant="h2">
                Download Official Resume &amp; Technical Profile.
              </Typography>
            </Reveal>
            <Reveal delay={0.25}>
              <Typography sx={{ color: colors.text, fontSize: { xs: 15, md: 17 }, lineHeight: 1.7 }}>
                ATS-optimized format highlighting professional MERN stack web development experience, database architecture, academic background, and live client deliverables.
              </Typography>
            </Reveal>
          </Box>
        </Box>

        {/* Main Resume Showcase Card */}
        <Reveal y={30} delay={0.2}>
          <Box
            sx={{
              position: 'relative',
              borderRadius: '28px',
              backgroundColor: colors.card,
              border: `1px solid ${colors.line}`,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.06)',
              overflow: 'hidden',
              p: { xs: '24px', sm: '36px', md: '48px' },
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1.15fr 0.85fr' },
                gap: { xs: '32px', lg: '48px' },
                alignItems: 'center',
              }}
            >
              {/* Left Column: Key Resume Details & Badges */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Meta Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      px: '14px',
                      py: '6px',
                      borderRadius: '50px',
                      backgroundColor: 'rgba(52, 88, 255, 0.1)',
                      color: colors.blue,
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    <PictureAsPdfRounded sx={{ fontSize: 18 }} />
                    ATS Compliant PDF
                  </Box>

                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      px: '12px',
                      py: '6px',
                      borderRadius: '50px',
                      backgroundColor: 'rgba(16, 185, 129, 0.12)',
                      color: '#059669',
                      fontSize: 12.5,
                      fontWeight: 600,
                    }}
                  >
                    <Box
                      component="span"
                      sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10B981' }}
                    />
                    Updated 2026 Edition
                  </Box>
                </Box>

                {/* Candidate Overview */}
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: 26, sm: 34 },
                      color: colors.ink,
                      fontWeight: 600,
                      lineHeight: 1.15,
                      mb: '8px',
                    }}
                  >
                    {profile.fullName}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: 15, md: 17 },
                      color: colors.blue,
                      fontWeight: 600,
                    }}
                  >
                    {profile.role} • Sai Techno Solutions
                  </Typography>
                </Box>

                {/* Verified Resume Highlights */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'Junior Web Developer at Sai Techno Solutions (03/2026 – Present)',
                    'B.E. Computer Science & Engineering (Final Grade: 83%)',
                    'Certified in MERN Stack Development (SDLC Institution, Karur)',
                    'Hands-on expertise in React.js, Node.js, Express.js, MySQL & MongoDB',
                    'Delivered 5 commercial client platforms including e-commerce and consultancies',
                  ].map((item, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CheckCircleRounded sx={{ color: '#059669', fontSize: 18, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: { xs: 13.5, md: 15 }, color: colors.text, fontWeight: 500 }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Direct Action Buttons */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    flexWrap: 'wrap',
                    pt: '12px',
                  }}
                >
                  {/* Primary Download Button */}
                  <Box
                    component="a"
                    href={resumeUrl}
                    download="Kalaiyarasi_MERN_Resume.pdf"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      px: '26px',
                      py: '13px',
                      borderRadius: '50px',
                      backgroundColor: colors.blue,
                      color: colors.white,
                      fontSize: 15,
                      fontWeight: 600,
                      textDecoration: 'none',
                      boxShadow: '0 6px 20px rgba(52, 88, 255, 0.35)',
                      transition: `all 0.3s ${cssEase}`,
                      '&:hover': {
                        backgroundColor: '#2648e8',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 28px rgba(52, 88, 255, 0.45)',
                      },
                      '&:active': {
                        transform: 'translateY(0)',
                      },
                    }}
                  >
                    <DownloadRounded sx={{ fontSize: 20 }} />
                    Download Resume (PDF)
                  </Box>

                  {/* Secondary View Button */}
                  <Box
                    component="a"
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      px: '22px',
                      py: '12px',
                      borderRadius: '50px',
                      backgroundColor: colors.page,
                      color: colors.ink,
                      fontSize: 14.5,
                      fontWeight: 600,
                      textDecoration: 'none',
                      border: `1px solid ${colors.line}`,
                      transition: `all 0.3s ${cssEase}`,
                      '&:hover': {
                        backgroundColor: '#dfe4ef',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <VisibilityRounded sx={{ fontSize: 18, color: colors.blue }} />
                    Preview in Browser ↗
                  </Box>
                </Box>
              </Box>

              {/* Right Column: Visual Document Card Preview */}
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: '20px', sm: '28px' },
                  borderRadius: '20px',
                  backgroundColor: colors.page,
                  border: `1px solid ${colors.line}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StarIcon style={{ color: colors.blue, fontSize: 18 }} />
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: colors.ink, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Resume Quick Summary
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 11, color: colors.text, fontFamily: 'monospace' }}>
                    📄 93.3 KB
                  </Typography>
                </Box>

                {/* Skills Chips on Card */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['React.js', 'Node.js', 'Express.js', 'MySQL', 'MongoDB', 'JavaScript (ES6+)', 'REST APIs', 'Git'].map((tech) => (
                    <Pill key={tech} sx={{ height: 28, px: '12px', fontSize: 12, backgroundColor: colors.card }}>
                      {tech}
                    </Pill>
                  ))}
                </Box>

                {/* Education & Contact Quick Info */}
                <Box
                  sx={{
                    p: '14px',
                    borderRadius: '12px',
                    backgroundColor: colors.card,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    fontSize: 13,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: colors.text, fontSize: 'inherit' }}>Education:</Typography>
                    <Typography sx={{ fontWeight: 600, color: colors.ink, fontSize: 'inherit' }}>B.E. CSE (83%)</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: colors.text, fontSize: 'inherit' }}>Experience:</Typography>
                    <Typography sx={{ fontWeight: 600, color: colors.blue, fontSize: 'inherit' }}>Junior Web Developer</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ color: colors.text, fontSize: 'inherit' }}>Location:</Typography>
                    <Typography sx={{ fontWeight: 600, color: colors.ink, fontSize: 'inherit' }}>Karur / Coimbatore</Typography>
                  </Box>
                </Box>

                {/* Bottom Direct CTA */}
                <Typography sx={{ fontSize: 12, color: colors.text, textAlign: 'center' }}>
                  Click above to save or view the full formatted PDF resume.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
