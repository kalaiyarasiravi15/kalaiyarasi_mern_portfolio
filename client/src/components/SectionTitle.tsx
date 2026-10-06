import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from '../theme';
import Reveal from './Reveal';
import SectionTag from './SectionTag';

interface SectionTitleProps {
  tag: string;
  /** Each entry is rendered on its own line. */
  lines: string[];
  align?: 'center' | 'left';
  onDark?: boolean;
}

/** Star label + two-line heading that opens every home page section. */
export default function SectionTitle({ tag, lines, align = 'center', onDark = false }: SectionTitleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        gap: '16px',
        textAlign: align,
      }}
    >
      <Reveal>
        <SectionTag label={tag} onDark={onDark} />
      </Reveal>
      <Reveal delay={0.2}>
        <Typography variant="h2" sx={{ color: onDark ? colors.white : colors.ink }}>
          {lines.map((line, index) => (
            <Box key={line} component="span" sx={{ display: 'block' }}>
              {line}
              {index < lines.length - 1 ? ' ' : ''}
            </Box>
          ))}
        </Typography>
      </Reveal>
    </Box>
  );
}
