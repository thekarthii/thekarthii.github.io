'use client';

import { cn } from '@/lib/utils';

interface CircuitTraceProps {
  direction?: 'horizontal' | 'vertical' | 'diagonal-down' | 'diagonal-up';
  length?: number | string;
  thickness?: 'thin' | 'normal' | 'thick';
  animated?: boolean;
  glowing?: boolean;
  className?: string;
}

const thicknessClasses = {
  thin: 'thin-trace',
  normal: 'normal-trace',
  thick: 'thick-trace',
};

export function CircuitTrace({
  direction = 'horizontal',
  length = 100,
  thickness = 'normal',
  animated = false,
  glowing = false,
  className,
}: CircuitTraceProps) {
  const isHorizontal = direction === 'horizontal';
  const isVertical = direction === 'vertical';
  const isDiagonal = direction.startsWith('diagonal');

  const dimensionStyle = {
    width: isHorizontal ? (typeof length === 'number' ? `${length}px` : length) : undefined,
    height: isVertical ? (typeof length === 'number' ? `${length}px` : length) : undefined,
  };

  const thicknessValue = thickness === 'thin' ? 1 : thickness === 'normal' ? 2 : 3;

  return (
    <div
      className={cn(
        'relative bg-emerald-500/60',
        isHorizontal && `h-[${thicknessValue}px]`,
        isVertical && `w-[${thicknessValue}px]`,
        isDiagonal && 'origin-left',
        direction === 'diagonal-down' && 'rotate-45',
        direction === 'diagonal-up' && '-rotate-45',
        glowing && 'shadow-[0_0_4px_rgba(16,185,129,0.8)]',
        animated && 'circuit-trace-animated',
        className
      )}
      style={{
        ...dimensionStyle,
        height: isHorizontal ? `${thicknessValue}px` : dimensionStyle.height,
        width: isVertical ? `${thicknessValue}px` : dimensionStyle.width,
      }}
    >
      {animated && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300 to-transparent animate-trace-flow"
          style={{
            animationDuration: '2s',
            animationIterationCount: 'infinite',
          }}
        />
      )}
    </div>
  );
}

export default CircuitTrace;
