'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useHydration } from '@/hooks/useHydration';

interface TraceLinesProps {
  className?: string;
  color?: string;
  animated?: boolean;
  density?: 'low' | 'medium' | 'high';
}

interface Point {
  x: number;
  y: number;
}

interface TraceLine {
  points: Point[];
  progress: number;
  speed: number;
}

export function TraceLines({
  className,
  color = '#22c55e',
  animated = true,
  density = 'medium',
}: TraceLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const tracesRef = useRef<TraceLine[]>([]);
  const hydrated = useHydration();

  const getDensityCount = useCallback(() => {
    switch (density) {
      case 'low':
        return 3;
      case 'high':
        return 8;
      default:
        return 5;
    }
  }, [density]);

  const generateTrace = useCallback((width: number, height: number): TraceLine => {
    const points: Point[] = [];
    const startX = Math.random() * width;
    const startY = Math.random() * height;
    
    points.push({ x: startX, y: startY });
    
    let currentX = startX;
    let currentY = startY;
    const segments = 3 + Math.floor(Math.random() * 4);
    
    for (let i = 0; i < segments; i++) {
      const isHorizontal = i % 2 === 0;
      
      if (isHorizontal) {
        currentX += (Math.random() - 0.5) * 200;
        currentX = Math.max(0, Math.min(width, currentX));
      } else {
        currentY += (Math.random() - 0.5) * 200;
        currentY = Math.max(0, Math.min(height, currentY));
      }
      
      points.push({ x: currentX, y: currentY });
    }
    
    return {
      points,
      progress: 0,
      speed: 0.002 + Math.random() * 0.003,
    };
  }, []);

  const initTraces = useCallback((width: number, height: number) => {
    const count = getDensityCount();
    tracesRef.current = Array.from({ length: count }, () => generateTrace(width, height));
  }, [getDensityCount, generateTrace]);

  const drawTrace = useCallback((ctx: CanvasRenderingContext2D, trace: TraceLine) => {
    const { points, progress } = trace;
    if (points.length < 2) return;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Calculate total length
    let totalLength = 0;
    const segmentLengths: number[] = [];
    
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      const length = Math.sqrt(dx * dx + dy * dy);
      segmentLengths.push(length);
      totalLength += length;
    }

    const drawLength = totalLength * progress;
    let drawnLength = 0;

    ctx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      const segmentLength = segmentLengths[i - 1];
      
      if (drawnLength + segmentLength <= drawLength) {
        ctx.lineTo(points[i].x, points[i].y);
        drawnLength += segmentLength;
      } else {
        const remaining = drawLength - drawnLength;
        const ratio = remaining / segmentLength;
        const x = points[i - 1].x + (points[i].x - points[i - 1].x) * ratio;
        const y = points[i - 1].y + (points[i].y - points[i - 1].y) * ratio;
        ctx.lineTo(x, y);
        break;
      }
    }

    ctx.globalAlpha = 0.6;
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Draw glow effect at the end
    if (progress > 0 && progress < 1) {
      const glowPoint = getPointAtProgress(points, segmentLengths, totalLength, progress);
      if (glowPoint) {
        const gradient = ctx.createRadialGradient(
          glowPoint.x, glowPoint.y, 0,
          glowPoint.x, glowPoint.y, 8
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(glowPoint.x, glowPoint.y, 8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [color]);

  useEffect(() => {
    if (!hydrated) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initTraces(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    if (animated) {
      const animate = () => {
        const rect = canvas.getBoundingClientRect();
        ctx.clearRect(0, 0, rect.width, rect.height);

        tracesRef.current.forEach((trace, index) => {
          trace.progress += trace.speed;
          
          if (trace.progress >= 1.5) {
            tracesRef.current[index] = generateTrace(rect.width, rect.height);
          }
          
          drawTrace(ctx, trace);
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      animate();
    } else {
      tracesRef.current.forEach((trace) => {
        trace.progress = 1;
        drawTrace(ctx, trace);
      });
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hydrated, animated, initTraces, generateTrace, drawTrace]);

  // Render nothing on server, placeholder div with same dimensions
  if (!hydrated) {
    return <div className={cn('absolute inset-0 pointer-events-none', className)} />;
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}

function getPointAtProgress(
  points: Point[],
  segmentLengths: number[],
  totalLength: number,
  progress: number
): Point | null {
  const targetLength = totalLength * Math.min(progress, 1);
  let accumulatedLength = 0;

  for (let i = 1; i < points.length; i++) {
    const segmentLength = segmentLengths[i - 1];
    
    if (accumulatedLength + segmentLength >= targetLength) {
      const remaining = targetLength - accumulatedLength;
      const ratio = remaining / segmentLength;
      return {
        x: points[i - 1].x + (points[i].x - points[i - 1].x) * ratio,
        y: points[i - 1].y + (points[i].y - points[i - 1].y) * ratio,
      };
    }
    
    accumulatedLength += segmentLength;
  }

  return points[points.length - 1];
}

export default TraceLines;
