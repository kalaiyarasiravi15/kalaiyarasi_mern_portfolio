import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors, cssEase } from '../theme';
import { navLinks, profile } from '../data/content';
import Logo from './Logo';
import PrimaryButton from './PrimaryButton';
import { Container } from './Section';
import { useLenis } from './SmoothScroll';

/** Desktop nav link: darkens and has active pill indicator */
function NavLink({
  label,
  to,
  isActive,
  onClick,
}: {
  label: string;
  to: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, to: string) => void;
}) {
  return (
    <Box
      component={RouterLink}
      to={to}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => onClick(e, to)}
      sx={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        px: '14px',
        py: '6px',
        borderRadius: '20px',
        fontSize: 14.5,
        fontWeight: isActive ? 600 : 500,
        color: isActive ? colors.ink : colors.text,
        textDecoration: 'none',
        transition: 'all 0.2s cubic-bezier(0.12, 0.23, 0.5, 1)',
        backgroundColor: isActive ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
        '&:hover': {
          color: colors.ink,
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      {label}
      {isActive && (
        <Box
          component="span"
          sx={{
            position: 'absolute',
            bottom: -2,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 4,
            height: 4,
            borderRadius: '50%',
            backgroundColor: colors.blue,
          }}
        />
      )}
    </Box>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();

  // Track scroll position to update active hash and header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (location.pathname !== '/') return;

      const sectionDefinitions = [
        { id: 'about', targets: ['about'] },
        { id: 'experience', targets: ['experience'] },
        { id: 'education', targets: ['education', 'studies'] },
        { id: 'projects', targets: ['projects', 'portfolio'] },
        { id: 'skills', targets: ['skills', 'service'] },
        { id: 'resume', targets: ['resume'] },
        { id: 'faq', targets: ['faq'] },
      ];
      const scrollPos = window.scrollY + 160;

      for (let i = sectionDefinitions.length - 1; i >= 0; i--) {
        const item = sectionDefinitions[i];
        let el: HTMLElement | null = null;
        for (const t of item.targets) {
          el = document.getElementById(t);
          if (el) break;
        }
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          return;
        }
      }
      if (window.scrollY < 200) setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on location change
  useEffect(() => {
    setOpen(false);
  }, [location]);

  // Smooth scroll handler for nav items
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith('/#')) {
      const hash = to.replace('/', '');
      const id = hash.replace('#', '');

      if (location.pathname === '/') {
        e.preventDefault();
        const target =
          document.getElementById(id) ||
          (id === 'projects' ? document.getElementById('portfolio') : null) ||
          (id === 'education' ? document.getElementById('studies') : null) ||
          (id === 'skills' ? document.getElementById('service') : null);
        if (target) {
          if (lenis) {
            lenis.scrollTo(target, { offset: -80 });
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
          }
          setActiveSection(id);
        }
      } else {
        // Navigating from another page back to home
        e.preventDefault();
        navigate('/', { state: { scrollTo: id } });
      }
    }
    setOpen(false);
  };

  const line = {
    position: 'absolute',
    left: 0,
    width: 20,
    height: 2,
    borderRadius: 2,
    backgroundColor: colors.ink,
    transition: `transform 0.3s ${cssEase}, opacity 0.2s, top 0.3s ${cssEase}`,
  } as const;

  return (
    <>
      {/* Desktop: Floating Frosted Glass Pill Navbar */}
      <Box
        component="header"
        sx={{
          display: { xs: 'none', lg: 'block' },
          position: 'fixed',
          top: 16,
          left: 0,
          right: 0,
          zIndex: 1000,
          px: '24px',
          pointerEvents: 'none',
        }}
      >
        <Container sx={{ maxWidth: '1240px', px: 0 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 58,
              px: '20px',
              borderRadius: '29px',
              backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.82)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: scrolled ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: scrolled
                ? '0 12px 35px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.04)'
                : '0 8px 24px rgba(0, 0, 0, 0.04)',
              transition: 'all 0.3s ease',
              pointerEvents: 'auto',
            }}
          >
            {/* Logo */}
            <Logo />

            {/* Nav items */}
            <Box
              component="nav"
              aria-label="Main"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {navLinks.map((link) => {
                const isHash = link.to.startsWith('/#');
                const hashId = link.to.replace('/#', '');
                const isActive = isHash
                  ? location.pathname === '/' && activeSection === hashId
                  : location.pathname === link.to;

                return (
                  <NavLink
                    key={link.label}
                    label={link.label}
                    to={link.to}
                    isActive={isActive}
                    onClick={handleNavClick}
                  />
                );
              })}
            </Box>

            {/* CTA Button */}
            <PrimaryButton
              label="Get In Touch"
              to="/contact-us"
              sx={{
                py: '8px',
                px: '18px',
                fontSize: 14,
                boxShadow: '0 4px 14px rgba(52, 88, 255, 0.25)',
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Tablet & Mobile: Fixed Frosted Header with Drawer */}
      <Box
        component="header"
        sx={{
          display: { xs: 'block', lg: 'none' },
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.06)' : 'none',
          transition: 'all 0.25s ease',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 64,
            px: '18px',
          }}
        >
          <Logo />
          <Box
            component="button"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            sx={{
              position: 'relative',
              width: 40,
              height: 40,
              p: 0,
              border: 0,
              background: 'none',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <Box sx={{ position: 'absolute', top: 13, left: 10, width: 20, height: 14 }}>
              <Box sx={{ ...line, top: open ? 6 : 0, transform: open ? 'rotate(45deg)' : 'none' }} />
              <Box sx={{ ...line, top: 6, opacity: open ? 0 : 1 }} />
              <Box sx={{ ...line, top: open ? 6 : 12, transform: open ? 'rotate(-45deg)' : 'none' }} />
            </Box>
          </Box>
        </Box>

        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              aria-label="Mobile Navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  px: '20px',
                  pt: '10px',
                  pb: '28px',
                  borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                  backgroundColor: colors.white,
                }}
              >
                {navLinks.map((link) => {
                  const isHash = link.to.startsWith('/#');
                  const hashId = link.to.replace('/#', '');
                  const isActive = isHash
                    ? location.pathname === '/' && activeSection === hashId
                    : location.pathname === link.to;

                  return (
                    <Box
                      key={link.label}
                      component={RouterLink}
                      to={link.to}
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link.to)}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: '14px',
                        py: '10px',
                        borderRadius: '12px',
                        fontSize: 16,
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? colors.blue : colors.ink,
                        backgroundColor: isActive ? 'rgba(52, 88, 255, 0.08)' : 'transparent',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: colors.blue,
                          }}
                        />
                      )}
                    </Box>
                  );
                })}

                {/* Mobile Direct Contact Quick Info */}
                <Box
                  sx={{
                    mt: '12px',
                    pt: '14px',
                    borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Typography sx={{ fontSize: 13, color: colors.text }}>
                    📍 {profile.location[0]}, {profile.location[1]}
                  </Typography>
                  <PrimaryButton
                    label="Get In Touch"
                    to="/contact-us"
                    sx={{ width: '100%', justifyContent: 'center' }}
                  />
                </Box>
              </Box>
            </motion.nav>
          )}
        </AnimatePresence>
      </Box>
    </>
  );
}
