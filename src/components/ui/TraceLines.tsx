"use client";

import React, { useEffect, useState, useId } from "react";
import { cn } from "@/lib/utils";
import { traceAnimations } from "@/lib/animations";

interface TracePath {
  id: string;
  d: string;
  delay: number;
  duration: number;
}

interface TraceLinesProps {
  className?: string;
  density?: "sparse" | "normal" | "dense";
  animated?: boolean;
  color?: string;
}

const generatePaths = (density: string, baseId: string): TracePath[] => {
  const pathCount = density === "sparse" ? 3 : density === "dense" ? 8 : 5;
  const paths: TracePath[] = [];

  // Use deterministic path generation to avoid hydration issues
  const seedValues = [
    { startY: 20, midX: 150, midY: 80, endX: 300, endY: 50 },
    { startY: 50, midX: 100, midY: 120, endX: 280, endY: 90 },
    { startY: 80, midX: 200, midY: 60, endX: 350, endY: 120 },
    { startY: 30, midX: 120, midY: 100, endX: 320, endY: 70 },
    { startY: 60, midX: 180, midY: 40, endX: 290, endY: 110 },
    { startY: 40, midX: 90, midY: 90, endX: 260, endY: 60 },
    { startY: 70, midX: 220, midY: 50, endX: 340, endY: 100 },
    { startY: 25, midX: 140, midY: 110, endX: 310, endY: 80 },
  ];

  for (let i = 0; i < pathCount; i++) {
    const seed = seedValues[i % seedValues.length];
    const offset = i * 15;
    
    paths.push({
      id: `${baseId}-trace-${i}`,
      d: `M 0 ${seed.startY + offset} L ${seed.midX} ${seed.midY + offset} L ${seed.endX} ${seed.endY + offset} L 400 ${seed.startY + offset + 10}`,
      delay: i * 0.3,
      duration: 2 + (i % 3) * 0.5,
    });
  }

  return paths;
};

export const TraceLines: React.FC<TraceLinesProps> = ({
  className,
  density = "normal",
  animated = true,
  color = "currentColor",
}) => {
  const baseId = useId();
  const [mounted, setMounted] = useState(false);
  const [paths, setPaths] = useState<TracePath[]>([]);

  useEffect(() => {
    setMounted(true);
    setPaths(generatePaths(density, baseId));
  }, [density, baseId]);

  // Render placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className={cn(
          "absolute inset-0 overflow-hidden pointer-events-none opacity-20",
          className
        )}
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 400 150"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Static placeholder paths */}
          <path
            d="M 0 50 L 100 80 L 200 60 L 400 70"
            stroke={color}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none opacity-20",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 400 150"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`${baseId}-trace-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {paths.map((path) => (
          <g key={path.id}>
            {/* Base trace line */}
            <path
              d={path.d}
              stroke={color}
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />

            {/* Animated pulse overlay */}
            {animated && (
              <path
                d={path.d}
                stroke={`url(#${baseId}-trace-gradient)`}
                strokeWidth="2"
                fill="none"
                strokeDasharray="20 80"
                style={{
                  animation: `${traceAnimations.pulse} ${path.duration}s ease-in-out ${path.delay}s infinite`,
                }}
              />
            )}

            {/* Connection nodes */}
            <circle
              cx="0"
              cy={path.d.split(" ")[2]}
              r="2"
              fill={color}
              opacity="0.5"
            />
          </g>
        ))}
      </svg>
    </div>
  );
};

export default TraceLines;
