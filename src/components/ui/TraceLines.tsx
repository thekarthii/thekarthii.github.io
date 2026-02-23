'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TracePath {
  id: string;
  d: string;
  delay: number;
  duration: number;
}

interface TraceLinesProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  animated?: boolean;
  color?: string;
}

function generateTracePaths(count: number, seed: number): TracePath[] {
  // Use seeded random for consistent paths between server and client
  const seededRandom = (index: number) => {
    const x = Math.sin(seed + index * 9999) * 10000;
    return x - Math.floor(x);
  };

  const paths: TracePath[] = [];
  
  for (let i = 0; i < count; i++) {
    const startX = seededRandom(i * 4) * 100;
    const startY = seededRandom(i * 4 + 1) * 100;
    const midX = seededRandom(i * 4 + 2) * 100;
    const endX = seededRandom(i * 4 + 3) * 100;
    const endY = startY + (seededRandom(i * 4 + 4) * 40 - 20);
    
    // Create right-angle trace paths like real PCB traces
    const d = `M ${startX} ${startY} H ${midX} V ${endY} H ${endX}`;
    
    paths.push({
      id: `trace-${i}`,
      d,
      delay: i * 0.2,
      duration: 1.5 + seededRandom(i) * 0.5,
    });
  }
  
  return paths;
}

export function TraceLines({
  className,
  density = 'medium',
  animated = true,
  color = 'currentColor',
}: TraceLinesProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<SVGSVGElement>(null);
  
  // Use a fixed seed to ensure consistent paths
  const seed = 12345;
  
  const densityMap = {
    low: 5,
    medium: 10,
    high: 20,
  };
  
  const traceCount = densityMap[density];
  const paths = generateTracePaths(traceCount, seed);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Render a placeholder on server to prevent hydration mismatch
  if (!mounted) {
    return (
      <svg
        className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
        preserveAspectRatio="none"
        aria-hidden="true"
      />
    );
  }

  return (
    <svg
      ref={containerRef}
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="trace-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {paths.map((path) => (
        <g key={path.id}>
          {/* Background trace */}
          <path
            d={path.d}
            fill="none"
            stroke={color}
            strokeWidth="0.15"
            strokeOpacity="0.1"
          />
          
          {/* Animated trace */}
          {animated && (
            <path
              d={path.d}
              fill="none"
              stroke="url(#trace-gradient)"
              strokeWidth="0.2"
              strokeLinecap="round"
              style={{
                strokeDasharray: '10 90',
                strokeDashoffset: 0,
                animation: `trace-flow ${path.duration}s linear ${path.delay}s infinite`,
              }}
            />
          )}
        </g>
      ))}
      
      <style>{`
        @keyframes trace-flow {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );
}

export default TraceLines;
