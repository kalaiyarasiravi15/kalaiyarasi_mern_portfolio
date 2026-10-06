import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '../theme';
import { StarIcon } from './icons';

interface SectionTagProps {
  label: string;
  /** Light text and icon, for sections on the navy background. */
  onDark?: boolean;
}

export default function SectionTag({ label, onDark = false }: SectionTagProps) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
      <StarIcon style={{ color: onDark ? colors.white : colors.blue, flexShrink: 0 }} />
      <Typography sx={{ fontWeight: 500, color: onDark ? colors.page : colors.text, whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
    </Box>
  );
}
