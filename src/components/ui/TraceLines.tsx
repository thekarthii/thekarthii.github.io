'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface TraceLinesProps {
  className?: string;
  animated?: boolean;
  density?: 'sparse' | 'normal' | 'dense';
}

export function TraceLines({
  className,
  animated = true,
  density = 'normal',
}: TraceLinesProps) {
  const lineCount = density === 'sparse' ? 3 : density === 'dense' ? 8 : 5;
  
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="traceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(34, 197, 94)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {Array.from({ length: lineCount }).map((_, i) => {
          const yPercent = ((i + 1) / (lineCount + 1)) * 100;
          return (
            <g key={i}>
              {/* Static trace line */}
              <line
                x1="0%"
                y1={`${yPercent}%`}
                x2="100%"
                y2={`${yPercent}%`}
                stroke="rgb(34, 197, 94)"
                strokeWidth="1"
                strokeOpacity="0.1"
              />
              
              {/* Animated pulse */}
              {animated && (
                <circle
                  r="3"
                  fill="url(#traceGradient)"
                  className="animate-trace-pulse"
                  style={{
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '3s',
                  }}
                >
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${i * 0.5}s`}
                    path={`M 0 ${yPercent * 10} L 1000 ${yPercent * 10}`}
                  />
                </circle>
              )}
            </g>
          );
        })}
        
        {/* Vertical connector lines */}
        {Array.from({ length: Math.floor(lineCount / 2) }).map((_, i) => {
          const xPercent = ((i + 1) / (Math.floor(lineCount / 2) + 1)) * 100;
          return (
            <line
              key={`v-${i}`}
              x1={`${xPercent}%`}
              y1="0%"
              x2={`${xPercent}%`}
              y2="100%"
              stroke="rgb(34, 197, 94)"
              strokeWidth="1"
              strokeOpacity="0.05"
              strokeDasharray="4 8"
            />
          );
        })}
      </svg>
    </div>
  );
}

export default TraceLines;