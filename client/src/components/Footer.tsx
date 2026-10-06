import type { ReactNode } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PersonRounded from '@mui/icons-material/PersonRounded';
import WorkOutlineRounded from '@mui/icons-material/WorkOutlineRounded';
import SchoolRounded from '@mui/icons-material/SchoolRounded';
import GridViewRounded from '@mui/icons-material/GridViewRounded';
import LayersRounded from '@mui/icons-material/LayersRounded';
import HelpOutlineRounded from '@mui/icons-material/HelpOutlineRounded';
import MailOutlineRounded from '@mui/icons-material/MailOutlineRounded';
import DescriptionRounded from '@mui/icons-material/DescriptionRounded';
import LinkedIn from '@mui/icons-material/LinkedIn';
import EmailRounded from '@mui/icons-material/EmailRounded';
import PhoneRounded from '@mui/icons-material/PhoneRounded';
import { colors, cssEase } from '../theme';
import BlurSheet from './BlurSheet';
import { profile } from '../data/content';
import PrimaryButton from './PrimaryButton';
import Reveal from './Reveal';
import { Container, gutters } from './Section';
import { useLenis } from './SmoothScroll';

interface FooterNavLink {
  label: string;
  to: string;
  targetId: string;
  icon: ReactNode;
}

const footerNavLinks: FooterNavLink[] = [
  { label: 'About', to: '/#about', targetId: 'about', icon: <PersonRounded /> },
  { label: 'Experience', to: '/#experience', targetId: 'experience', icon: <WorkOutlineRounded /> },
  { label: 'Education', to: '/#education', targetId: 'education', icon: <SchoolRounded /> },
  { label: 'Projects', to: '/#projects', targetId: 'projects', icon: <GridViewRounded /> },
  { label: 'Skills', to: '/#skills', targetId: 'skills', icon: <LayersRounded /> },
  { label: 'Resume', to: '/#resume', targetId: 'resume', icon: <DescriptionRounded /> },
  { label: 'FAQ', to: '/#faq', targetId: 'faq', icon: <HelpOutlineRounded /> },
  { label: 'Contact', to: '/contact-us', targetId: 'contact', icon: <MailOutlineRounded /> },
];

const socials: { label: string; href: string; icon: ReactNode }[] = [
  { label: 'LinkedIn', href: profile.linkedin, icon: <LinkedIn /> },
  { label: 'Email', href: `mailto:${profile.email}`, icon: <EmailRounded /> },
  { label: 'Phone', href: profile.phoneHref, icon: <PhoneRounded /> },
];

export default function Footer() {
  const lenis = useLenis();
  const location = useLocation();
  const navigate = useNavigate();

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: FooterNavLink) => {
    if (link.to.startsWith('/#')) {
      if (location.pathname === '/') {
        e.preventDefault();
        const target =
          document.getElementById(link.targetId) ||
          (link.targetId === 'projects' ? document.getElementById('portfolio') : null) ||
          (link.targetId === 'education' ? document.getElementById('studies') : null) ||
          (link.targetId === 'skills' ? document.getElementById('service') : null);

        if (target) {
          if (lenis) {
            lenis.scrollTo(target, { offset: -80 });
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }
      } else {
        e.preventDefault();
        navigate('/', { state: { scrollTo: link.targetId } });
      }
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        overflow: 'clip',
        backgroundColor: colors.card,
        pt: { xs: '60px', lg: '120px' },
        pb: '36px',
        ...gutters,
      }}
    >
      {/* Navy sheet with soft edges, so the footer melts into the page above it. */}
      <BlurSheet color={colors.navy} />

      <Container sx={{ position: 'relative' }}>
        <Reveal y={34}>
          <Typography
            variant="h2"
            sx={{
              color: colors.white,
              maxWidth: { xs: 320, md: 450, lg: 520 },
              fontWeight: 600,
              letterSpacing: '-0.03em',
            }}
          >
            Ready To Start Something Great?
          </Typography>
        </Reveal>
        <Reveal y={34} delay={0.1} sx={{ mt: '28px' }}>
          <PrimaryButton label="Get In Touch" to="/contact-us" tone="light" />
        </Reveal>

        {/* All Section Navigation Cards */}
        <Reveal
          y={34}
          delay={0.25}
          sx={{
            mt: { xs: '40px', lg: '60px' },
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(7, 1fr)',
            },
            gap: { xs: '12px', md: '16px' },
          }}
        >
          {footerNavLinks.map((link) => (
            <Box
              key={link.label}
              component={RouterLink}
              to={link.to}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleFooterLinkClick(e, link)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: { xs: '16px', md: '22px' },
                p: { xs: '18px', md: '20px' },
                borderRadius: '18px',
                border: '1px solid rgba(233, 236, 243, 0.4)',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(10px)',
                color: colors.page,
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                '& svg': {
                  fontSize: 24,
                  transition: 'transform 0.3s ease, color 0.3s ease',
                },
                '&:hover': {
                  backgroundColor: colors.card,
                  borderColor: colors.card,
                  color: colors.ink,
                  transform: 'translateY(-3px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.18)',
                  '& svg': {
                    color: colors.blue,
                    transform: 'scale(1.15)',
                  },
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {link.icon}
                <Typography sx={{ fontSize: 11, opacity: 0.5, fontFamily: 'monospace' }}>↗</Typography>
              </Box>
              <Typography
                variant="h4"
                component="span"
                sx={{
                  color: 'inherit',
                  fontSize: { xs: 16, md: 17 },
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                }}
              >
                {link.label}
              </Typography>
            </Box>
          ))}
        </Reveal>

        {/* Bottom Bar: Copyright & Socials */}
        <Reveal
          y={34}
          delay={0.35}
          sx={{ position: 'relative', mt: { xs: '40px', lg: '60px' }, pt: { xs: '32px', lg: '40px' } }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background:
                'linear-gradient(270deg, rgba(233, 236, 243, 0.1) 0%, rgba(233, 236, 243, 0.5) 50%, rgba(233, 236, 243, 0.1) 100%)',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <Typography sx={{ color: colors.page, fontSize: 14 }}>
              Designed &amp; Developed By{' '}
              <Box
                component="a"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: colors.white,
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {profile.fullName}
              </Box>
            </Typography>

            <Box sx={{ display: 'flex', gap: '12px' }}>
              {socials.map((social) => (
                <Box
                  key={social.label}
                  component="a"
                  href={social.href}
                  aria-label={social.label}
                  {...(social.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    backgroundColor: colors.page,
                    color: colors.ink,
                    textDecoration: 'none',
                    transition: `all 0.3s ${cssEase}`,
                    '& svg': { fontSize: 20 },
                    '&:hover': {
                      backgroundColor: colors.blue,
                      color: colors.white,
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 18px rgba(52, 88, 255, 0.35)',
                    },
                  }}
                >
                  {social.icon}
                </Box>
              ))}
            </Box>
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
