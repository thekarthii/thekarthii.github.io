'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export function LoadingSpinner({
  size = 'md',
  className,
  label = 'Loading...',
}: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div
      role="status"
      aria-label={label}
      className={cn('flex items-center justify-center', className)}
    >
      <div
        className={cn(
          'rounded-full border-circuit-copper/30 border-t-circuit-green animate-spin',
          sizeStyles[size]
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

interface CircuitLoaderProps {
  className?: string;
  label?: string;
}

export function CircuitLoader({ className, label = 'Loading...' }: CircuitLoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn('flex flex-col items-center justify-center gap-4', className)}
    >
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-circuit-copper/30" />
        
        {/* Animated trace */}
        <svg
          className="absolute inset-0 w-full h-full animate-spin"
          style={{ animationDuration: '2s' }}
          viewBox="0 0 64 64"
        >
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="url(#circuit-gradient)"
            strokeWidth="2"
            strokeDasharray="44 132"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
              <stop offset="50%" stopColor="#22c55e" stopOpacity="1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center node */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-circuit-green/20 border border-circuit-green animate-pulse" />
        </div>
      </div>
      
      <span className="text-circuit-copper/70 text-sm animate-pulse">
        {label}
      </span>
    </div>
  );
}

export function InlineLoader({ className }: { className?: string }) {
  return (
    <span
      className={cn('inline-flex items-center gap-1', className)}
      role="status"
      aria-label="Loading"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-circuit-green animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-circuit-green animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-circuit-green animate-bounce" style={{ animationDelay: '300ms' }} />
      <span className="sr-only">Loading</span>
    </span>
  );
}
