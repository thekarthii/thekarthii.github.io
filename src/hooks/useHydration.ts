import { useState, useEffect } from 'react';

/**
 * Hook to detect if the component has hydrated on the client
 * Useful for avoiding hydration mismatches with browser-only features
 */
export function useHydration(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}

/**
 * Hook to safely access window dimensions
 * Returns null during SSR and initial hydration
 */
export function useWindowSize(): { width: number; height: number } | null {
  const hydrated = useHydration();
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    if (!hydrated) return;

    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [hydrated]);

  return size;
}

/**
 * Hook to safely access localStorage
 * Returns null during SSR
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const hydrated = useHydration();

  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (!hydrated) return;

    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
  }, [hydrated, key]);

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useHydration;
