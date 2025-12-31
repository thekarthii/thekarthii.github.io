'use client';

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CircuitCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'green' | 'blue' | 'amber';
  hoverable?: boolean;
}

const glowColors = {
  green: 'hover:shadow-green-500/20 hover:border-green-500/50',
  blue: 'hover:shadow-blue-500/20 hover:border-blue-500/50',
  amber: 'hover:shadow-amber-500/20 hover:border-amber-500/50',
};

const staticGlow = {
  green: 'border-green-900/30',
  blue: 'border-blue-900/30',
  amber: 'border-amber-900/30',
};

export function CircuitCard({
  children,
  className,
  glowColor = 'green',
  hoverable = true,
}: CircuitCardProps) {
  return (
    <div
      className={cn(
        'relative bg-slate-900/80 backdrop-blur-sm rounded-lg border-2 p-6',
        'transition-all duration-300 ease-out',
        staticGlow[glowColor],
        hoverable && glowColors[glowColor],
        hoverable && 'hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      {/* Corner circuit nodes */}
      <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-green-500/60" />
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-500/60" />
      <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-green-500/60" />
      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-green-500/60" />
      
      {children}
    </div>
  );
}

export default CircuitCard;