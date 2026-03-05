/**
 * Responsive design utilities and breakpoint helpers
 */

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Check if the current viewport matches a breakpoint
 */
export function matchesBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[breakpoint];
}

/**
 * Get the current breakpoint based on viewport width
 */
export function getCurrentBreakpoint(): Breakpoint | null {
  if (typeof window === 'undefined') return null;
  
  const width = window.innerWidth;
  const sortedBreakpoints = Object.entries(breakpoints)
    .sort(([, a], [, b]) => b - a) as [Breakpoint, number][];
  
  for (const [name, minWidth] of sortedBreakpoints) {
    if (width >= minWidth) return name;
  }
  
  return null;
}

/**
 * Calculate responsive grid columns based on container width
 */
export function getResponsiveGridCols(containerWidth: number): number {
  if (containerWidth >= 1280) return 4;
  if (containerWidth >= 1024) return 3;
  if (containerWidth >= 640) return 2;
  return 1;
}

/**
 * Responsive spacing scale
 */
export const spacingScale = {
  section: {
    sm: 'py-12 px-4',
    md: 'py-16 px-6',
    lg: 'py-20 px-8',
  },
  container: {
    sm: 'max-w-sm',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-7xl',
  },
  gap: {
    sm: 'gap-2 sm:gap-3',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8 lg:gap-10',
  },
} as const;

/**
 * Generate responsive class string
 */
export function responsiveClasses(
  base: string,
  responsive: Partial<Record<Breakpoint, string>>
): string {
  const classes = [base];
  
  for (const [breakpoint, className] of Object.entries(responsive)) {
    if (className) {
      classes.push(`${breakpoint}:${className}`);
    }
  }
  
  return classes.join(' ');
}

/**
 * Common responsive patterns
 */
export const patterns = {
  // Responsive text sizes
  heading1: 'text-3xl sm:text-4xl lg:text-5xl font-bold',
  heading2: 'text-2xl sm:text-3xl lg:text-4xl font-semibold',
  heading3: 'text-xl sm:text-2xl font-semibold',
  heading4: 'text-lg sm:text-xl font-medium',
  body: 'text-base sm:text-lg',
  small: 'text-sm sm:text-base',
  
  // Responsive grids
  grid2: 'grid grid-cols-1 sm:grid-cols-2',
  grid3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  grid4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  
  // Responsive flex
  stackToRow: 'flex flex-col sm:flex-row',
  centerStack: 'flex flex-col items-center text-center sm:text-left sm:items-start',
} as const;
