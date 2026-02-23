import { useId, useState, useEffect } from 'react';

/**
 * A hook that provides stable IDs that work correctly with SSR/hydration.
 * Uses React's useId for guaranteed uniqueness and stability.
 */
export function useIsomorphicId(prefix?: string): string {
  const reactId = useId();
  return prefix ? `${prefix}-${reactId}` : reactId;
}

/**
 * A hook that returns a stable random value that's consistent between
 * server and client renders to prevent hydration mismatches.
 * 
 * @param seed - A stable seed value (should be consistent between renders)
 * @param min - Minimum value (default: 0)
 * @param max - Maximum value (default: 1)
 */
export function useStableRandom(seed: string | number, min = 0, max = 1): number {
  // Generate a deterministic value based on the seed
  const seedString = String(seed);
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    const char = seedString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  // Normalize to 0-1 range, then scale to min-max
  const normalized = Math.abs(Math.sin(hash)) ;
  return min + normalized * (max - min);
}

/**
 * A hook that only runs effects on the client side,
 * useful for animations that shouldn't affect SSR.
 */
export function useClientOnly(): boolean {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient;
}

export default useIsomorphicId;
