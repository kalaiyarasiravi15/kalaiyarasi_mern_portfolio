import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

interface BlurSheetProps {
  color: string;
  sx?: SxProps<Theme>;
}

/**
 * A solid sheet with very soft edges that fills its positioned parent.
 *
 * It looks the same as a rectangle with `filter: blur(110px)`, but it is drawn
 * as the shadow of an off-screen box, so the browser paints it once instead of
 * re-blurring a huge layer on every scroll frame.
 */
export default function BlurSheet({ color, sx }: BlurSheetProps) {
  return (
    <Box
      aria-hidden
      sx={[{ position: 'absolute', inset: 0, pointerEvents: 'none' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '-300vw',
          width: '100%',
          // A shadow blur of 220px matches a 110px gaussian blur filter.
          boxShadow: `300vw 0 220px 0 ${color}`,
        }}
      />
    </Box>
  );
}
