import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { colors } from '../theme';

interface PillProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

/** Small rounded label used for skills and tags. */
export default function Pill({ children, sx }: PillProps) {
  return (
    <Box
      sx={[
        {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 32,
          px: '24px',
          borderRadius: '50px',
          backgroundColor: colors.page,
          color: colors.text,
          fontSize: 14,
          lineHeight: '24px',
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  );
}
