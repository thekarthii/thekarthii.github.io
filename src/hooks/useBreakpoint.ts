import { useState, useEffect, useCallback } from 'react';
import { breakpoints, Breakpoint, getCurrentBreakpoint, matchesBreakpoint } from '@/lib/responsive';

/**
 * Hook to track current breakpoint
 */
export function useBreakpoint(): Breakpoint | null {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setCurrentBreakpoint(getCurrentBreakpoint());
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return currentBreakpoint;
}

/**
 * Hook to check if viewport matches or exceeds a breakpoint
 */
export function useMediaQuery(breakpoint: Breakpoint): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${breakpoints[breakpoint]}px)`);
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setMatches(e.matches);
    };

    // Set initial value
    handleChange(mediaQuery);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    
    // Legacy browsers
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [breakpoint]);

  return matches;
}

/**
 * Hook to get responsive value based on current breakpoint
 */
export function useResponsiveValue<T>(
  values: Partial<Record<Breakpoint | 'default', T>>
): T | undefined {
  const breakpoint = useBreakpoint();
  
  const getValue = useCallback(() => {
    if (!breakpoint) return values.default;
    
    // Find the appropriate value for current or smaller breakpoint
    const orderedBreakpoints: (Breakpoint | 'default')[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'default'];
    const currentIndex = orderedBreakpoints.indexOf(breakpoint);
    
    for (let i = currentIndex; i < orderedBreakpoints.length; i++) {
      const bp = orderedBreakpoints[i];
      if (bp in values) {
        return values[bp];
      }
    }
    
    return values.default;
  }, [breakpoint, values]);

  return getValue();
}

/**
 * Hook to detect if device is mobile
 */
export function useIsMobile(): boolean {
  return !useMediaQuery('md');
}

/**
 * Hook to detect if device is tablet or larger
 */
export function useIsTablet(): boolean {
  const isMd = useMediaQuery('md');
  const isLg = useMediaQuery('lg');
  return isMd && !isLg;
}

/**
 * Hook to detect if device is desktop
 */
export function useIsDesktop(): boolean {
  return useMediaQuery('lg');
}
