import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

interface ContainerProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

/** Centers content on the 1140px grid the whole design is built on. */
export function Container({ children, sx }: ContainerProps) {
  return <Box sx={[{ width: '100%', maxWidth: 1140, mx: 'auto' }, ...(Array.isArray(sx) ? sx : [sx])]}>{children}</Box>;
}

/** Horizontal page gutters: 20px on phones, 30px from tablet up. */
export const gutters = { px: { xs: '20px', md: '30px' } } as const;
