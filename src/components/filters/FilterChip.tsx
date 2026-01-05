'use client';

import { cn } from '@/lib/utils';

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  variant?: 'language' | 'topic' | 'custom';
  className?: string;
}

const variantStyles = {
  language: {
    active: 'bg-blue-500/20 border-blue-400 text-blue-300',
    inactive: 'border-blue-400/30 text-blue-300/60 hover:border-blue-400/60',
  },
  topic: {
    active: 'bg-emerald-500/20 border-emerald-400 text-emerald-300',
    inactive: 'border-emerald-400/30 text-emerald-300/60 hover:border-emerald-400/60',
  },
  custom: {
    active: 'bg-amber-500/20 border-amber-400 text-amber-300',
    inactive: 'border-amber-400/30 text-amber-300/60 hover:border-amber-400/60',
  },
};

export function FilterChip({
  label,
  isActive,
  onClick,
  variant = 'topic',
  className,
}: FilterChipProps) {
  const styles = variantStyles[variant];

  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1 text-xs font-medium rounded-full border transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-circuit-accent/50',
        isActive ? styles.active : styles.inactive,
        className
      )}
    >
      <span className="flex items-center gap-1.5">
        {isActive && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {label}
      </span>
    </button>
  );
}
