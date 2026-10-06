import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from './SmoothScroll';

/** Scrolls to the #hash target after navigation, or back to the top of a new page. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
      return;
    }
    // Wait a moment so the target section exists when arriving from another page.
    const timer = window.setTimeout(() => {
      const rawId = hash.slice(1);
      const target =
        document.getElementById(rawId) ||
        (rawId === 'projects' ? document.getElementById('portfolio') : null) ||
        (rawId === 'portfolio' ? document.getElementById('projects') : null) ||
        (rawId === 'education' ? document.getElementById('studies') : null) ||
        (rawId === 'studies' ? document.getElementById('education') : null) ||
        (rawId === 'skills' ? document.getElementById('service') : null);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: -80 });
      else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(timer);
    // `lenis` is read at navigation time only; it must not re-trigger a scroll.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash, key]);

  return null;
}
