import { ANIMATION_DURATIONS, CIRCUIT_COLORS } from './constants';

/**
 * CSS keyframe definitions for circuit-themed animations
 */
export const circuitKeyframes = {
  // Trace drawing animation
  traceDraw: {
    '0%': { strokeDashoffset: '100%', opacity: 0 },
    '10%': { opacity: 1 },
    '100%': { strokeDashoffset: '0%', opacity: 1 },
  },
  
  // LED pulse effect
  ledPulse: {
    '0%, 100%': {
      boxShadow: `0 0 4px ${CIRCUIT_COLORS.trace.primary}, 0 0 8px ${CIRCUIT_COLORS.trace.dim}`,
    },
    '50%': {
      boxShadow: `0 0 8px ${CIRCUIT_COLORS.trace.primary}, 0 0 16px ${CIRCUIT_COLORS.trace.primary}, 0 0 24px ${CIRCUIT_COLORS.trace.dim}`,
    },
  },
  
  // Signal flow along traces
  signalFlow: {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
  
  // Component fade in
  componentReveal: {
    '0%': { opacity: 0, transform: 'scale(0.95)' },
    '100%': { opacity: 1, transform: 'scale(1)' },
  },
  
  // Solder point glow
  solderGlow: {
    '0%, 100%': { filter: 'brightness(1)' },
    '50%': { filter: 'brightness(1.3)' },
  },
} as const;

/**
 * Generate staggered animation delay for lists
 */
export function staggerDelay(index: number, baseDelay: number = 50): string {
  return `${index * baseDelay}ms`;
}

/**
 * Generate trace path animation styles
 */
export function traceAnimationStyle(pathLength: number, delay: number = 0): React.CSSProperties {
  return {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
    animation: `traceDraw ${ANIMATION_DURATIONS.trace}ms ease-out ${delay}ms forwards`,
  };
}

/**
 * Animation variants for Framer Motion (if used later)
 */
export const motionVariants = {
  card: {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: ANIMATION_DURATIONS.normal / 1000,
        ease: [0.4, 0, 0.2, 1],
      },
    }),
    hover: {
      y: -4,
      transition: { duration: ANIMATION_DURATIONS.fast / 1000 },
    },
  },
  
  trace: {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: ANIMATION_DURATIONS.trace / 1000, ease: 'easeInOut' },
        opacity: { duration: ANIMATION_DURATIONS.fast / 1000 },
      },
    },
  },
  
  filter: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: ANIMATION_DURATIONS.fast / 1000 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: ANIMATION_DURATIONS.fast / 1000 },
    },
  },
} as const;

/**
 * CSS class names for common animations
 */
export const animationClasses = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  pulse: 'animate-circuit-pulse',
  traceDraw: 'animate-trace-draw',
  glow: 'animate-glow',
} as const;
