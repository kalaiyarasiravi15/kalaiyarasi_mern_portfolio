import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '../theme';
import { projects } from '../data/content';
import { Container, gutters } from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import Pill from '../components/Pill';

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const dragDistRef = useRef(0);

  const total = projects.length; // 5 projects

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), 320);
  }, [isAnimating, total]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), 320);
  }, [isAnimating, total]);

  const handleSelect = useCallback(
    (index: number) => {
      if (index === activeIndex || isAnimating) return;
      setIsAnimating(true);
      setActiveIndex(index);
      setTimeout(() => setIsAnimating(false), 320);
    },
    [activeIndex, isAnimating]
  );

  // Mouse wheel listener with debounce
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let wheelDebounce: ReturnType<typeof setTimeout> | null = null;
    let accumulated = 0;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 15 && Math.abs(e.deltaX) < 15) return;
      accumulated += e.deltaY || e.deltaX;

      if (!wheelDebounce) {
        wheelDebounce = setTimeout(() => {
          if (accumulated > 20) {
            handleNext();
          } else if (accumulated < -20) {
            handlePrev();
          }
          accumulated = 0;
          wheelDebounce = null;
        }, 80);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: true });
    return () => el.removeEventListener('wheel', onWheel);
  }, [handleNext, handlePrev]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  // Pointer / Touch drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    dragDistRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    dragDistRef.current = e.clientX - startXRef.current;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (dragDistRef.current > 40) {
      handlePrev();
    } else if (dragDistRef.current < -40) {
      handleNext();
    }
    dragDistRef.current = 0;
  };

  const currentProject = projects[activeIndex];

  // Helper to calculate relative distance for 3D coverflow: -2, -1, 0, 1, 2
  const getOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <Box
      component="section"
      id="projects"
      sx={{
        position: 'relative',
        zIndex: 2,
        py: { xs: '60px', md: '90px' },
        scrollMarginTop: { xs: '80px', md: '100px' },
        background: 'linear-gradient(180deg, #070b14 0%, #0d1424 50%, #070b14 100%)',
        color: colors.white,
        overflow: 'hidden',
        ...gutters,
      }}
    >
      {/* Anchor for backward compatibility with #portfolio */}
      <Box id="portfolio" sx={{ position: 'absolute', top: 0, left: 0 }} />

      <Container>
        {/* Section Header */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', mb: { xs: '32px', md: '44px' } }}>
          <SectionTitle
            tag="Featured Projects"
            lines={['Featured Real-World Projects', '& E-Commerce Platforms']}
            onDark
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: '16px',
            }}
          >
            <Typography sx={{ color: 'rgba(255, 255, 255, 0.72)', fontSize: { xs: 15, sm: 16 }, maxWidth: 650 }}>
              Explore 6 live commercial platforms and production web applications — featuring responsive React UI, modern static sites,
              scalable REST APIs, and robust relational database schemas.
            </Typography>

            {/* Instruction Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                px: '14px',
                py: '8px',
                borderRadius: '12px',
                backgroundColor: 'rgba(52, 88, 255, 0.12)',
                border: '1px solid rgba(52, 88, 255, 0.28)',
                color: '#8ab4f8',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.02em',
                flexShrink: 0,
              }}
            >
              <Box component="span" sx={{ fontSize: 13 }}>✦</Box>
              Click Cards, Arrows or Buttons
            </Box>
          </Box>
        </Box>

        {/* Quick Project Selector Tabs (1-Click Direct Jump) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            pb: '16px',
            mb: '20px',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {projects.map((proj, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <Box
                key={proj.slug}
                id={`portfolio-tab-${proj.slug}`}
                onClick={() => handleSelect(idx)}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  px: { xs: '12px', md: '16px' },
                  py: '8px',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontSize: { xs: 12, md: 13 },
                  fontWeight: 600,
                  transition: 'all 0.25s ease',
                  backgroundColor: isSelected ? '#3458ff' : '#0e1628',
                  color: isSelected ? colors.white : 'rgba(255, 255, 255, 0.7)',
                  border: isSelected ? '1px solid #3458ff' : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: isSelected ? '0 4px 14px rgba(52, 88, 255, 0.4)' : 'none',
                  '&:hover': {
                    color: colors.white,
                    borderColor: '#3458ff',
                    backgroundColor: isSelected ? '#3458ff' : '#141e33',
                  },
                }}
              >
                <Typography sx={{ fontFamily: '"Zen Dots", sans-serif', fontSize: 11, opacity: isSelected ? 1 : 0.6 }}>
                  {String(idx + 1).padStart(2, '0')}
                </Typography>
                {proj.title}
              </Box>
            );
          })}
        </Box>

        {/* 3D Solid Card Stage (No Blurry Glass Overlap) */}
        <Box
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '320px', sm: '380px', md: '440px' },
            perspective: '1200px',
            overflow: 'hidden',
            touchAction: 'pan-y',
            cursor: 'grab',
            userSelect: 'none',
            '&:active': { cursor: 'grabbing' },
            borderRadius: '24px',
            backgroundColor: '#0a0f1d',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Subtle Ambient Center Glow */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              height: '300px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(52, 88, 255, 0.18) 0%, rgba(52, 88, 255, 0) 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Cards 3D Deck */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transformStyle: 'preserve-3d',
            }}
          >
            {projects.map((proj, index) => {
              const offset = getOffset(index);
              const isCenter = offset === 0;
              const isImmediate = Math.abs(offset) === 1;
              const isOuter = Math.abs(offset) === 2;

              let xPx = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 10;
              let rotateY = 0;

              if (isCenter) {
                scale = 1.0;
                opacity = 1;
                zIndex = 50;
                rotateY = 0;
                xPx = 0;
              } else if (isImmediate) {
                scale = 0.82;
                opacity = 0.7;
                zIndex = 30;
                rotateY = offset > 0 ? -16 : 16;
                xPx = offset > 0 ? 440 : -440;
              } else if (isOuter) {
                scale = 0.65;
                opacity = 0.25;
                zIndex = 10;
                rotateY = offset > 0 ? -28 : 28;
                xPx = offset > 0 ? 760 : -760;
              } else {
                scale = 0.5;
                opacity = 0;
                zIndex = 1;
                xPx = offset > 0 ? 900 : -900;
              }

              return (
                <Box
                  key={proj.slug}
                  onClick={() => handleSelect(index)}
                  sx={{
                    position: 'absolute',
                    width: { xs: '280px', sm: '380px', md: '500px' },
                    height: { xs: '190px', sm: '250px', md: '310px' },
                    borderRadius: '18px',
                    overflow: 'hidden',
                    cursor: isCenter ? 'default' : 'pointer',
                    transform: {
                      xs: `translateX(${xPx * 0.52}px) scale(${scale * 0.92}) rotateY(${rotateY * 0.7}deg)`,
                      sm: `translateX(${xPx * 0.75}px) scale(${scale}) rotateY(${rotateY}deg)`,
                      md: `translateX(${xPx}px) scale(${scale}) rotateY(${rotateY}deg)`,
                    },
                    opacity,
                    zIndex,
                    backgroundColor: '#0c1220',
                    border: isCenter
                      ? '3px solid #3458ff'
                      : '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: isCenter
                      ? '0 20px 50px rgba(52, 88, 255, 0.35), 0 10px 30px rgba(0, 0, 0, 0.8)'
                      : '0 8px 24px rgba(0, 0, 0, 0.6)',
                    transition:
                      'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Browser Chrome Header Strip on Top of Card */}
                  <Box
                    sx={{
                      height: '32px',
                      backgroundColor: '#12192c',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      px: '12px',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }} />
                      <Typography sx={{ ml: '6px', fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                        {proj.title}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Typography sx={{ fontFamily: '"Zen Dots", sans-serif', fontSize: 10, color: '#8ab4f8' }}>
                        {String(index + 1).padStart(2, '0')}
                      </Typography>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          backgroundColor: proj.status === 'Live' ? '#34d399' : '#f59e0b',
                        }}
                      />
                    </Box>
                  </Box>

                  {/* Real Website Screenshot */}
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 'calc(100% - 32px)',
                      backgroundColor: '#070b14',
                    }}
                  >
                    <Box
                      component="img"
                      src={proj.thumb || proj.cover}
                      alt={proj.title}
                      loading="lazy"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        display: 'block',
                      }}
                    />

                    {/* Dark Mask ONLY for non-center cards (keeps active card 100% sharp and bright) */}
                    {!isCenter && (
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          backgroundColor: 'rgba(7, 11, 20, 0.45)',
                          transition: 'background-color 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'rgba(7, 11, 20, 0.2)',
                          },
                        }}
                      />
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Action Buttons: Prev & Next */}
          <Box
            sx={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 120,
            }}
          >
            <Box
              component="button"
              type="button"
              onClick={handlePrev}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                px: '20px',
                py: '10px',
                fontFamily: '"Zen Dots", "Inter", sans-serif',
                fontSize: 12,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: colors.white,
                backgroundColor: '#1b2438',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  backgroundColor: '#3458ff',
                  borderColor: '#3458ff',
                  boxShadow: '0 6px 20px rgba(52, 88, 255, 0.5)',
                  transform: 'translateY(-2px)',
                },
                '&:active': { transform: 'translateY(1px)' },
              }}
            >
              ◀ PREV
            </Box>

            {/* Current Index Indicator */}
            <Box
              sx={{
                px: '14px',
                py: '8px',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontFamily: '"Zen Dots", sans-serif',
                fontSize: 12,
                color: '#8ab4f8',
                letterSpacing: '0.06em',
              }}
            >
              {activeIndex + 1} / {total}
            </Box>

            <Box
              component="button"
              type="button"
              onClick={handleNext}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                px: '20px',
                py: '10px',
                fontFamily: '"Zen Dots", "Inter", sans-serif',
                fontSize: 12,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: colors.white,
                backgroundColor: '#1b2438',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)',
                transition: 'all 0.25s ease',
                '&:hover': {
                  backgroundColor: '#3458ff',
                  borderColor: '#3458ff',
                  boxShadow: '0 6px 20px rgba(52, 88, 255, 0.5)',
                  transform: 'translateY(-2px)',
                },
                '&:active': { transform: 'translateY(1px)' },
              }}
            >
              NEXT ▶
            </Box>
          </Box>
        </Box>

        {/* Selected Project Full Details Showcase (Crystal Clear Below Carousel) */}
        <Box
          sx={{
            mt: '28px',
            p: { xs: '20px', md: '28px' },
            borderRadius: '20px',
            backgroundColor: '#0c1424',
            border: '1px solid rgba(52, 88, 255, 0.25)',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: '24px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: 700 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <Typography sx={{ fontFamily: '"Zen Dots", sans-serif', color: '#8ab4f8', fontSize: 13 }}>
                PROJECT {String(activeIndex + 1).padStart(2, '0')} OF 05
              </Typography>
              <Pill
                sx={{
                  height: 22,
                  px: '10px',
                  fontSize: 11,
                  backgroundColor: 'rgba(52, 88, 255, 0.2)',
                  color: '#8ab4f8',
                  border: '1px solid rgba(52, 88, 255, 0.35)',
                  fontWeight: 600,
                }}
              >
                {currentProject.category}
              </Pill>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: currentProject.status === 'Live' ? '#34d399' : '#f59e0b',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    backgroundColor: currentProject.status === 'Live' ? '#34d399' : '#f59e0b',
                  }}
                />
                {currentProject.status === 'Live' ? 'Live Platform' : 'In Development'}
              </Box>
            </Box>

            <Typography variant="h3" sx={{ color: colors.white, fontSize: { xs: 22, md: 28 }, fontWeight: 700 }}>
              {currentProject.title}
            </Typography>

            <Typography sx={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: 14, lineHeight: 1.65 }}>
              {currentProject.short}
            </Typography>

            {/* Quick Tech Stack Pills */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px', pt: '4px' }}>
              {currentProject.stack.map((tech) => (
                <Pill
                  key={tech}
                  sx={{
                    height: 24,
                    px: '10px',
                    fontSize: 11,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  {tech}
                </Pill>
              ))}
            </Box>
          </Box>

          {/* Action CTAs: Live Website & Full Case Study */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flexShrink: 0 }}>
            {currentProject.url && (
              <Box
                component="a"
                href={currentProject.url}
                target="_blank"
                rel="noreferrer noopener"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  px: '22px',
                  py: '12px',
                  borderRadius: '12px',
                  backgroundColor: colors.blue,
                  color: colors.white,
                  fontWeight: 600,
                  fontSize: 13,
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(52, 88, 255, 0.4)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#2747e6',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(52, 88, 255, 0.6)',
                  },
                }}
              >
                Visit Live Site
                <Box component="span" sx={{ fontSize: 15 }}>↗</Box>
              </Box>
            )}

            <Box
              component={Link}
              to={`/my-portfolio/${currentProject.slug}`}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                px: '22px',
                py: '12px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: colors.white,
                fontWeight: 600,
                fontSize: 13,
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Case Study Details
              <Box component="span" sx={{ fontSize: 15 }}>→</Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
