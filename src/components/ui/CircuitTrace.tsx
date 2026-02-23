'use client';

import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface CircuitTraceProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  className?: string;
  animated?: boolean;
  strokeWidth?: number;
  color?: string;
  delay?: number;
}

export function CircuitTrace({
  startX,
  startY,
  endX,
  endY,
  className,
  animated = true,
  strokeWidth = 2,
  color = 'currentColor',
  delay = 0,
}: CircuitTraceProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(!animated);

  // Calculate the path with right angles (like real PCB traces)
  const midX = (startX + endX) / 2;
  const path = `M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`;
  
  // Calculate total path length for animation
  const pathLength = Math.abs(midX - startX) + Math.abs(endY - startY) + Math.abs(endX - midX);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!animated || !mounted) return;
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [animated, delay, mounted]);

  // Prevent hydration mismatch by not rendering animation styles on server
  if (!mounted) {
    return (
      <svg
        className={cn('absolute inset-0 w-full h-full pointer-events-none overflow-visible', className)}
        aria-hidden="true"
      >
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.3}
        />
      </svg>
    );
  }

  return (
    <svg
      className={cn('absolute inset-0 w-full h-full pointer-events-none overflow-visible', className)}
      aria-hidden="true"
    >
      {/* Background trace (always visible) */}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.15}
      />
      
      {/* Animated foreground trace */}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: isVisible ? 0 : pathLength,
          transition: animated ? `stroke-dashoffset 0.8s ease-out` : 'none',
        }}
      />
      
      {/* Glowing end point */}
      {isVisible && (
        <circle
          cx={endX}
          cy={endY}
          r={strokeWidth * 1.5}
          fill={color}
          className="animate-pulse"
          style={{
            filter: `drop-shadow(0 0 ${strokeWidth * 2}px ${color})`,
          }}
        />
      )}
    </svg>
  );
}

export default CircuitTrace;
