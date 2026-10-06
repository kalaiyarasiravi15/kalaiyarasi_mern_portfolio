import type { MouseEventHandler } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { colors, cssEase } from '../theme';
import { ArrowIcon } from './icons';

type Tone = 'dark' | 'light' | 'glass' | 'ink';

interface PrimaryButtonProps {
  label: string;
  /** Internal route. */
  to?: string;
  /** External link, opened in a new tab. */
  href?: string;
  onClick?: MouseEventHandler;
  type?: 'button' | 'submit';
  tone?: Tone;
  fullWidth?: boolean;
  disabled?: boolean;
  /** Render as a plain element when the button sits inside another link. */
  decorative?: boolean;
  sx?: SxProps<Theme>;
}

const toneStyles: Record<
  Tone,
  {
    bg: string;
    fg: string;
    hoverBg: string;
    hoverFg: string;
    border?: string;
    shadow: string;
    hoverShadow: string;
    arrowBg?: string;
  }
> = {
  dark: {
    bg: colors.blue,
    fg: colors.white,
    hoverBg: '#2648e8',
    hoverFg: colors.white,
    shadow: '0 4px 14px rgba(52, 88, 255, 0.3)',
    hoverShadow: '0 8px 24px rgba(52, 88, 255, 0.45)',
    arrowBg: 'rgba(255, 255, 255, 0.2)',
  },
  light: {
    bg: colors.white,
    fg: colors.ink,
    hoverBg: colors.page,
    hoverFg: colors.ink,
    shadow: '0 4px 14px rgba(0, 0, 0, 0.08)',
    hoverShadow: '0 8px 22px rgba(0, 0, 0, 0.14)',
    arrowBg: 'rgba(0, 0, 0, 0.06)',
  },
  glass: {
    bg: 'rgba(255, 255, 255, 0.12)',
    fg: colors.white,
    hoverBg: 'rgba(255, 255, 255, 0.22)',
    hoverFg: colors.white,
    border: '1px solid rgba(255, 255, 255, 0.25)',
    shadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
    hoverShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
    arrowBg: 'rgba(255, 255, 255, 0.15)',
  },
  ink: {
    bg: colors.ink,
    fg: colors.white,
    hoverBg: colors.blue,
    hoverFg: colors.white,
    shadow: '0 4px 14px rgba(16, 16, 16, 0.25)',
    hoverShadow: '0 8px 24px rgba(52, 88, 255, 0.4)',
    arrowBg: 'rgba(255, 255, 255, 0.18)',
  },
};

/**
 * Unified pill button with integrated text and arrow in a single cohesive container.
 * Smoothly scales, shifts arrow on hover, and adapts across dark, light, and glass themes.
 */
export default function PrimaryButton({
  label,
  to,
  href,
  onClick,
  type = 'button',
  tone = 'dark',
  fullWidth = false,
  disabled = false,
  decorative = false,
  sx,
}: PrimaryButtonProps) {
  const currentTone = toneStyles[tone];

  const linkProps = decorative
    ? { component: 'span' as const }
    : to
      ? { component: RouterLink, to }
      : href
        ? { component: 'a' as const, href, target: '_blank', rel: 'noopener noreferrer' }
        : { component: 'button' as const, type, disabled };

  return (
    <Box
      {...linkProps}
      onClick={onClick}
      className="pbtn"
      sx={[
        {
          position: 'relative',
          display: fullWidth ? 'flex' : 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          width: fullWidth ? '100%' : 'auto',
          py: '10px',
          px: '20px',
          borderRadius: '50px',
          backgroundColor: currentTone.bg,
          color: currentTone.fg,
          border: currentTone.border || '1px solid transparent',
          boxShadow: currentTone.shadow,
          font: 'inherit',
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          textDecoration: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
          WebkitTapHighlightColor: 'transparent',
          transition: `all 0.3s ${cssEase}`,
          '&:hover, .pbtn-host:hover &': {
            backgroundColor: currentTone.hoverBg,
            color: currentTone.hoverFg,
            boxShadow: currentTone.hoverShadow,
            transform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0) scale(0.98)',
          },
          '&:focus-visible': {
            outline: `2px solid ${colors.blue}`,
            outlineOffset: 3,
          },
          '&:hover .pbtn-arrow-wrapper, .pbtn-host:hover & .pbtn-arrow-wrapper': {
            transform: 'translateX(4px)',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {/* Button Label Text */}
      <Typography
        component="span"
        sx={{
          fontSize: 'inherit',
          fontWeight: 'inherit',
          letterSpacing: 'inherit',
          color: 'inherit',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </Typography>

      {/* Integrated Arrow Icon in the same button */}
      <Box
        component="span"
        className="pbtn-arrow-wrapper"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: currentTone.arrowBg || 'rgba(255, 255, 255, 0.15)',
          color: 'inherit',
          flexShrink: 0,
          transition: `transform 0.3s ${cssEase}`,
        }}
      >
        <ArrowIcon size={16} style={{ display: 'block', color: 'currentColor' }} />
      </Box>
    </Box>
  );
}
