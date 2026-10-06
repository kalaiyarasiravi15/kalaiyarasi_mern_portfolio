import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PrimaryButton from '../components/PrimaryButton';
import { gutters } from '../components/Section';

export default function NotFound() {
  return (
    <Box
      component="section"
      sx={{
        minHeight: '70vh',
        pt: { xs: '112px', lg: '144px' },
        pb: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        textAlign: 'center',
        ...gutters,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Typography variant="h1">Page Not Found</Typography>
        <Typography>The page you are looking for does not exist or has been moved.</Typography>
      </Box>
      <PrimaryButton label="Back to Home" to="/" />
    </Box>
  );
}
