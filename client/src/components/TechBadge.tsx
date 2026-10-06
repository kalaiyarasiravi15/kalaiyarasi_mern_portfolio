import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import {
  SiBootstrap,
  SiCss,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiReact,
} from 'react-icons/si';

export type Tech =
  | 'react'
  | 'node'
  | 'express'
  | 'mysql'
  | 'mongodb'
  | 'javascript'
  | 'html'
  | 'css'
  | 'bootstrap'
  | 'jquery'
  | 'git'
  | 'github';

const techs: Record<Tech, { name: string; icon: ReactNode; bg: string; fg: string }> = {
  react: { name: 'React.js', icon: <SiReact />, bg: '#101010', fg: '#61DAFB' },
  node: { name: 'Node.js', icon: <SiNodedotjs />, bg: '#101010', fg: '#8CC84B' },
  express: { name: 'Express.js', icon: <SiExpress />, bg: '#101010', fg: '#FFFFFF' },
  mysql: { name: 'MySQL', icon: <SiMysql />, bg: '#101010', fg: '#5FB4E5' },
  mongodb: { name: 'MongoDB', icon: <SiMongodb />, bg: '#101010', fg: '#4DB33D' },
  javascript: { name: 'JavaScript', icon: <SiJavascript />, bg: '#101010', fg: '#F7DF1E' },
  html: { name: 'HTML5', icon: <SiHtml5 />, bg: '#101010', fg: '#F16529' },
  css: { name: 'CSS3', icon: <SiCss />, bg: '#101010', fg: '#8A6CFF' },
  bootstrap: { name: 'Bootstrap', icon: <SiBootstrap />, bg: '#101010', fg: '#A37BFF' },
  jquery: { name: 'jQuery', icon: <SiJquery />, bg: '#101010', fg: '#6CB8F0' },
  git: { name: 'Git', icon: <SiGit />, bg: '#101010', fg: '#F05133' },
  github: { name: 'GitHub', icon: <SiGithub />, bg: '#101010', fg: '#FFFFFF' },
};

interface TechBadgeProps {
  tech: Tech;
  size?: number;
  sx?: SxProps<Theme>;
}

/** Round badge with a technology logo. */
export default function TechBadge({ tech, size = 44, sx }: TechBadgeProps) {
  const { name, icon, bg, fg } = techs[tech];
  return (
    <Box
      role="img"
      aria-label={name}
      title={name}
      sx={[
        {
          width: size,
          height: size,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          backgroundColor: bg,
          color: fg,
          fontSize: size * 0.5,
          boxShadow: '0 6px 16px rgba(3, 35, 109, 0.18)',
          flexShrink: 0,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {icon}
    </Box>
  );
}
