import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ANIMATION_DURATIONS, LANGUAGE_COLORS } from './constants';

/**
 * Merge Tailwind CSS classes with conflict resolution
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a number with K/M suffixes for large values
 */
export function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

/**
 * Format a date as relative time (e.g., "2 days ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

/**
 * Get color for a programming language
 */
export function getLanguageColor(language: string): string {
  return LANGUAGE_COLORS[language] || LANGUAGE_COLORS.default;
}

/**
 * Generate a CSS transition string with circuit-themed timing
 */
export function circuitTransition(
  properties: string | string[] = 'all',
  duration: keyof typeof ANIMATION_DURATIONS = 'normal',
  easing: string = 'cubic-bezier(0.4, 0, 0.2, 1)'
): string {
  const props = Array.isArray(properties) ? properties.join(', ') : properties;
  const ms = ANIMATION_DURATIONS[duration];
  return `${props} ${ms}ms ${easing}`;
}

/**
 * Generate random ID for SVG elements
 */
export function generateId(prefix: string = 'circuit'): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Debounce function for search/filter inputs
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Calculate grid position for circuit-style layouts
 */
export function toGridPosition(value: number, gridSize: number = 8): number {
  return Math.round(value / gridSize) * gridSize;
}

/**
 * Extract unique values from an array
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

/**
 * Safely parse JSON with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}
