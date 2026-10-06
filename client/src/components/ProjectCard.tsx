import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '../theme';
import type { Project } from '../data/content';
import PrimaryButton from './PrimaryButton';
import Reveal from './Reveal';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Reveal y={60} delay={0.1}>
      <Box
        component={RouterLink}
        to={`/my-portfolio/${project.slug}`}
        className="pbtn-host"
        data-cursor="view"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '24px', md: '29px' },
          p: { xs: '18px', md: '24px' },
          borderRadius: '20px',
          backgroundColor: colors.card,
          '& .project-number': { transition: 'color 0.5s linear' },
          '& .project-overlay': { transition: 'opacity 0.5s linear' },
          '& .project-image': { transition: 'transform 0.5s linear' },
          '@media (hover: hover)': {
            '&:hover .project-number': { color: colors.ink },
            '&:hover .project-overlay': { opacity: 0.4 },
            '&:hover .project-image': { transform: 'scale(1)' },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <Typography variant="h3" sx={{ color: '#000' }}>
            {project.title}
          </Typography>
          <Typography
            className="project-number"
            component="span"
            sx={{
              flexShrink: 0,
              fontSize: { xs: 31, md: 58 },
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: 'rgba(0, 0, 0, 0.1)',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'stretch', md: 'flex-end' },
            justifyContent: 'space-between',
            gap: '24px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: { xs: '24px', md: '32px' } }}>
            <Typography sx={{ maxWidth: { md: 368 } }}>{project.short}</Typography>
            <PrimaryButton label="Explore Project" decorative />
          </Box>
          <Box
            sx={{
              position: 'relative',
              flexShrink: 0,
              width: { xs: '100%', md: '44%', lg: 436 },
              height: { xs: 250, md: 380 },
              borderRadius: '20px',
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              className="project-image"
              src={project.thumb}
              alt={`${project.title} website`}
              loading="lazy"
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                transform: 'scale(1.05)',
              }}
            />
            <Box
              className="project-overlay"
              sx={{ position: 'absolute', inset: 0, backgroundColor: '#000', opacity: 0 }}
            />
          </Box>
        </Box>
      </Box>
    </Reveal>
  );
}
