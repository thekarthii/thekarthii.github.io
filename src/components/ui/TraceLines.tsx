'use client';

import { useEffect, useState, useId } from 'react';
import { cn } from '@/lib/utils';
import { ANIMATION_DURATIONS } from '@/lib/constants';

interface TracePath {
  id: string;
  d: string;
  delay: number;
}

interface TraceLinesProps {
  className?: string;
  pathCount?: number;
  animated?: boolean;
}

export function TraceLines({
  className,
  pathCount = 5,
  animated = true,
}: TraceLinesProps) {
  const [paths, setPaths] = useState<TracePath[]>([]);
  const [mounted, setMounted] = useState(false);
  const uniqueId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const generatePaths = (): TracePath[] => {
      const generatedPaths: TracePath[] = [];

      for (let i = 0; i < pathCount; i++) {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const midX1 = startX + (Math.random() - 0.5) * 40;
        const midY1 = startY + Math.random() * 30;
        const midX2 = midX1 + (Math.random() - 0.5) * 40;
        const midY2 = midY1 + Math.random() * 30;
        const endX = midX2 + (Math.random() - 0.5) * 20;
        const endY = Math.min(midY2 + Math.random() * 20, 100);

        generatedPaths.push({
          id: `${uniqueId}-trace-${i}`,
          d: `M ${startX} ${startY} L ${midX1} ${midY1} L ${midX2} ${midY2} L ${endX} ${endY}`,
          delay: i * 0.3,
        });
      }

      return generatedPaths;
    };

    setPaths(generatePaths());
  }, [pathCount, mounted, uniqueId]);

  // Render placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`${uniqueId}-traceGradient`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {paths.map((path) => (
          <g key={path.id}>
            {/* Background trace */}
            <path
              d={path.d}
              fill="none"
              stroke="#1e3a3a"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Animated trace */}
            <path
              d={path.d}
              fill="none"
              stroke={`url(#${uniqueId}-traceGradient)`}
              strokeWidth="0.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={animated ? 'trace-animate' : ''}
              style={{
                strokeDasharray: '10 5',
                animationDelay: `${path.delay}s`,
                animationDuration: `${ANIMATION_DURATIONS.trace}ms`,
              }}
            />

            {/* Node points */}
            <circle
              cx={path.d.split(' ')[1]}
              cy={path.d.split(' ')[2]}
              r="0.8"
              fill="#10b981"
              className={animated ? 'pulse-glow' : ''}
              style={{ animationDelay: `${path.delay}s` }}
            />
          </g>
        ))}
      </svg>

      <style jsx>{`
        .trace-animate {
          animation: traceDash ${ANIMATION_DURATIONS.trace}ms linear infinite;
        }

        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        @keyframes traceDash {
          from {
            stroke-dashoffset: 30;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
}
