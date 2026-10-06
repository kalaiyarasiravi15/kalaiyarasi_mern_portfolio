import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }
}

/** Design tokens shared by every section. */
export const colors = {
  page: '#E9ECF3',
  hero: '#C7CCD8',
  card: '#F6F7FA',
  white: '#FFFFFF',
  ink: '#101010',
  text: '#474747',
  blue: '#3458FF',
  navy: '#03236D',
  star: '#FFC036',
  line: '#D9D9D9',
} as const;

/** Easing used by the appear and hover animations. */
export const ease = [0.44, 0, 0.56, 1] as const;
export const cssEase = 'cubic-bezier(0.44, 0, 0.56, 1)';

export const fontFamily = 'InterVariable, Inter, system-ui, -apple-system, "Segoe UI", sans-serif';

// phone < 810 <= tablet < 1200 <= desktop
const base = createTheme({
  breakpoints: { values: { xs: 0, sm: 600, md: 810, lg: 1200, xl: 1440 } },
});

const up = (key: 'md' | 'lg') => base.breakpoints.up(key);

export const theme = createTheme({
  breakpoints: base.breakpoints,
  palette: {
    mode: 'light',
    primary: { main: colors.blue },
    secondary: { main: colors.navy },
    background: { default: colors.page, paper: colors.card },
    text: { primary: colors.ink, secondary: colors.text },
  },
  shape: { borderRadius: 20 },
  typography: {
    fontFamily,
    h1: {
      fontWeight: 600,
      fontSize: 36,
      lineHeight: 1.05,
      letterSpacing: '-0.04em',
      color: colors.ink,
      [up('md')]: { fontSize: 58 },
      [up('lg')]: { fontSize: 72 },
    },
    h2: {
      fontWeight: 500,
      fontSize: 31,
      lineHeight: 1.1,
      letterSpacing: '-0.06em',
      color: colors.ink,
      [up('md')]: { fontSize: 38 },
      [up('lg')]: { fontSize: 48 },
    },
    h3: { fontWeight: 500, fontSize: 32, lineHeight: 1.1, letterSpacing: '-0.06em', color: colors.ink },
    h4: { fontWeight: 500, fontSize: 24, lineHeight: 1.15, letterSpacing: '-0.06em', color: colors.ink },
    subtitle1: { fontWeight: 500, fontSize: 18, lineHeight: 1.7, color: colors.ink },
    body1: { fontWeight: 400, fontSize: 16, lineHeight: 1.7, color: colors.text },
    body2: { fontWeight: 400, fontSize: 14, lineHeight: 1.7, letterSpacing: '-0.02em', color: colors.text },
    button: { textTransform: 'none', fontWeight: 400, fontSize: 16 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'auto' },
        body: {
          backgroundColor: colors.page,
          // Inter's display cut with single-storey "a" and the other character
          // variants the design relies on.
          fontVariationSettings: '"opsz" 32',
          fontFeatureSettings: '"cv09", "cv03", "cv04", "cv11"',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          overflowX: 'clip',
        },
        a: { color: 'inherit', textDecoration: 'none' },
        '::selection': { backgroundColor: colors.blue, color: colors.white },
      },
    },
  },
});
