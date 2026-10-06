import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const LenisContext = createContext<Lenis | null>(null);

/** The active smooth-scroll instance, or null when it is disabled. */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Eased wheel scrolling for the whole page (the same library and the same
 * 1.4s glide the reference design uses). Touch scrolling stays native.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({
      duration: 1.4,
      autoRaf: true,
      // Dropdown lists scroll themselves; the page must not move underneath them.
      prevent: (node) => Boolean(node.closest?.('.MuiPopover-root')),
    });
    setLenis(instance);
    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
