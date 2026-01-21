'use client';

import { cn } from '@/lib/utils';

interface CircuitNodeProps {
  variant?: 'junction' | 'terminal' | 'via' | 'component';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  pulsing?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const sizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

const variantClasses = {
  junction: 'rounded-full bg-emerald-500',
  terminal: 'rounded-sm bg-amber-500',
  via: 'rounded-full border-2 border-emerald-500 bg-transparent',
  component: 'rounded bg-slate-600 border border-emerald-500/50',
};

export function CircuitNode({
  variant = 'junction',
  size = 'md',
  active = false,
  pulsing = false,
  className,
  children,
}: CircuitNodeProps) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center transition-all duration-300',
        sizeClasses[size],
        variantClasses[variant],
        active && 'shadow-[0_0_8px_rgba(16,185,129,0.6)]',
        pulsing && 'animate-pulse',
        className
      )}
    >
      {children}
    </div>
  );
}

export default CircuitNode;
