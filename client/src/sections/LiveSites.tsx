import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '../theme';
import { projects } from '../data/content';
import { ArrowIcon } from '../components/icons';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import { Container, gutters } from '../components/Section';

/** All live client websites, each linking straight to the running site. */
export default function LiveSites() {
  const sites = projects;

  return (
    <Box
      component="section"
      sx={{ backgroundColor: colors.page, pt: { xs: '30px', lg: '60px' }, pb: { xs: '60px', lg: '120px' }, ...gutters }}
    >
      <Container>
        <SectionTitle tag="Live Websites" lines={['See my work', 'running online']} />
        <Box
          sx={{
            mt: { xs: '40px', lg: '64px' },
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
            gap: '24px',
          }}
        >
          {sites.map((site, index) => (
            <Reveal key={site.slug} y={60} delay={0.1 + index * 0.15}>
              <Box
                component="a"
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  p: '12px 12px 24px',
                  borderRadius: '20px',
                  backgroundColor: colors.white,
                  '& .site-image': { transition: 'transform 0.5s linear' },
                  '& .site-overlay': { transition: 'opacity 0.5s linear' },
                  '& .site-button': { transition: 'transform 0.5s linear, opacity 0.5s linear' },
                  '@media (hover: hover)': {
                    '&:hover .site-image': { transform: 'scale(1.08)' },
                    '&:hover .site-overlay': { opacity: 0.4 },
                    '&:hover .site-button': { opacity: 1, transform: 'translate(-50%, -50%)' },
                  },
                }}
              >
                <Box sx={{ position: 'relative', height: 203, borderRadius: '10px', overflow: 'hidden' }}>
                  <Box
                    component="img"
                    className="site-image"
                    src={site.cover}
                    alt={`${site.title} website`}
                    loading="lazy"
                    sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                  <Box className="site-overlay" sx={{ position: 'absolute', inset: 0, backgroundColor: '#000', opacity: 0 }} />
                  <Box
                    className="site-button"
                    sx={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      // Rests 36px below centre, then slides up into the middle on hover.
                      transform: 'translate(-50%, calc(-50% + 36px))',
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      p: '8px 16px',
                      borderRadius: '10px',
                      backgroundColor: colors.white,
                      color: colors.ink,
                      fontSize: 16,
                      fontWeight: 500,
                      lineHeight: '27px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Visit Website
                    <ArrowIcon size={18} />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', px: '12px' }}>
                  <Typography variant="h4" sx={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {site.title}
                  </Typography>
                  <Box
                    sx={{
                      flexShrink: 0,
                      p: '4px 12px',
                      borderRadius: '50px',
                      backgroundColor: colors.page,
                      color: colors.text,
                      fontSize: 16,
                      lineHeight: '27px',
                    }}
                  >
                    {site.status}
                  </Box>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
