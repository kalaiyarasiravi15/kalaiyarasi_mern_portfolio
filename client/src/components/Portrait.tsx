import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { profile } from '../data/content';

interface PortraitProps {
  sx?: SxProps<Theme>;
}

/**
 * Shows the cut-out photo configured in data/content.ts, or an illustrated
 * placeholder when none is set.
 */
export default function Portrait({ sx }: PortraitProps) {
  if (profile.photo) {
    return (
      <Box
        component="img"
        src={profile.photo}
        alt={profile.fullName}
        sx={[
          { display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 10%' },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      />
    );
  }

  return (
    <Box
      component="svg"
      viewBox="0 0 400 512"
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label={`Illustration of ${profile.fullName}`}
      sx={[{ display: 'block', width: '100%', height: '100%' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {/* long hair falling behind the shoulders */}
      <path
        d="M200 84c-58 0-94 40-94 100v120c0 40 20 66 48 66h92c28 0 48-26 48-66V184c0-60-36-100-94-100Z"
        fill="#1B1B2F"
      />
      {/* shoulders */}
      <path d="M52 512c0-108 56-170 148-170s148 62 148 170H52Z" fill="#03236D" />
      {/* neck and neckline */}
      <path d="M177 280h46v62c0 16-10 28-23 28s-23-12-23-28v-62Z" fill="#DCA07C" />
      <path d="M164 346c10 22 23 34 36 34s26-12 36-34c-12-3-24-4-36-4s-24 1-36 4Z" fill="#EDBB95" />
      {/* face */}
      <ellipse cx="200" cy="206" rx="60" ry="74" fill="#EDBB95" />
      {/* side-swept fringe */}
      <path d="M136 206c-5-62 20-96 64-96 42 0 68 32 64 92-27-8-49-26-62-52-12 28-34 46-66 56Z" fill="#1B1B2F" />
      {/* closed eyes and a smile */}
      <g fill="none" stroke="#9A5F47" strokeWidth="3" strokeLinecap="round">
        <path d="M170 214c5 5 13 5 18 0" />
        <path d="M212 214c5 5 13 5 18 0" />
        <path d="M186 244c8 8 20 8 28 0" />
      </g>
    </Box>
  );
}
