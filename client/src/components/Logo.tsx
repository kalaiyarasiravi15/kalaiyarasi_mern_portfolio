import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import { colors } from '../theme';
import { profile } from '../data/content';

export default function Logo() {
  return (
    <Box
      component={RouterLink}
      to="/"
      aria-label={`${profile.name} - home`}
      sx={{ display: 'inline-flex', alignItems: 'center', gap: '12px', height: 34, flexShrink: 0 }}
    >
      <Box
        component="svg"
        viewBox="0 0 64 64"
        sx={{ width: 34, height: 34, display: 'block', filter: 'drop-shadow(0 4px 8px rgba(52, 88, 255, 0.35))' }}
      >
        <rect width="64" height="64" rx="17" fill={colors.blue} />
        <path
          d="M23 17v30M23 33l17-16M28.5 28.5 41 47"
          fill="none"
          stroke="#fff"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Box>
      <Box
        component="span"
        sx={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.05em', color: colors.ink, lineHeight: 1 }}
      >
        {profile.name}
      </Box>
    </Box>
  );
}
