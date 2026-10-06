import { motion } from 'motion/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ease } from '../theme';
import { projects } from '../data/content';
import ProjectCard from '../components/ProjectCard';
import { Container, gutters } from '../components/Section';

const MotionBox = motion.create(Box);

export default function PortfolioPage() {
  return (
    <Box component="section" sx={{ pt: { xs: '112px', lg: '144px' }, pb: { xs: '60px', lg: '120px' }, ...gutters }}>
      <Container>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          sx={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: 680 }}
        >
          <Typography variant="h1">
            Websites Built
            <br />
            For Real Clients
          </Typography>
          <Typography>
            Client projects I have worked on as a Junior Web Developer at Sai Techno Solutions.
          </Typography>
        </MotionBox>
        <Box sx={{ mt: { xs: '40px', lg: '64px' }, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
