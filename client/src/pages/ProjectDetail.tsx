import { useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors, ease } from '../theme';
import { projects } from '../data/content';
import Pill from '../components/Pill';
import PrimaryButton from '../components/PrimaryButton';
import Reveal from '../components/Reveal';
import { gutters } from '../components/Section';
import NotFound from './NotFound';

const MotionBox = motion.create(Box);

function TextBlock({ heading, body }: { heading: string; body: string }) {
  return (
    <Reveal sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="h4" component="h2" sx={{ color: '#000' }}>
        {heading}
      </Typography>
      <Typography>{body}</Typography>
    </Reveal>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) return <NotFound />;

  return (
    <Box component="section" sx={{ pt: { xs: '112px', lg: '140px' }, pb: { xs: '60px', lg: '120px' }, ...gutters }}>
      <Box sx={{ maxWidth: 880, mx: 'auto', display: 'flex', flexDirection: 'column', gap: { xs: '40px', lg: '64px' } }}>
        <MotionBox
          key={project.slug}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <Typography>
            {project.category} · {project.status}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Typography
              variant="h1"
              sx={{ fontWeight: 500, fontSize: { xs: 34, md: 52, lg: 64 }, lineHeight: 1.05, letterSpacing: '-0.04em' }}
            >
              {project.detailTitle[0]}
              <br />
              {project.detailTitle[1]}
            </Typography>
            <Typography sx={{ maxWidth: 715 }}>{project.short}</Typography>
          </Box>
        </MotionBox>

        <Reveal
          y={0}
          scale={0.95}
          sx={{ height: { xs: 240, md: 460, lg: 563 }, borderRadius: '20px', overflow: 'hidden', backgroundColor: colors.card }}
        >
          <Box
            component="img"
            src={project.cover}
            alt={`${project.title} website`}
            sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        </Reveal>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {project.sections.map((section) => (
            <TextBlock key={section.heading} {...section} />
          ))}

          {project.gallery.length > 0 && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '24px' }}>
              {project.gallery.map((src) => (
                <Reveal
                  key={src}
                  y={40}
                  sx={{ height: { xs: 420, md: 563 }, borderRadius: '40px', overflow: 'hidden', backgroundColor: colors.card }}
                >
                  <Box
                    component="img"
                    src={src}
                    alt={`${project.title} screen`}
                    loading="lazy"
                    sx={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </Reveal>
              ))}
            </Box>
          )}

          {project.closing.map((section) => (
            <TextBlock key={section.heading} {...section} />
          ))}

          <Reveal sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.stack.map((tech) => (
              <Pill key={tech} sx={{ backgroundColor: colors.card }}>
                {tech}
              </Pill>
            ))}
          </Reveal>
        </Box>

        <Reveal sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <PrimaryButton label="Go Back" to="/my-portfolio" />
          <PrimaryButton label="Visit Live Site" href={project.url} />
        </Reveal>
      </Box>
    </Box>
  );
}
