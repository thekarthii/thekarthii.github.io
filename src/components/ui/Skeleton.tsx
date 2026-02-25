'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
  animate?: boolean;
}

export function Skeleton({
  className,
  variant = 'default',
  width,
  height,
  animate = true,
}: SkeletonProps) {
  const baseStyles = 'bg-circuit-copper/20 rounded';
  
  const variantStyles = {
    default: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded h-4',
  };

  const animationStyles = animate
    ? 'animate-pulse'
    : '';

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        animationStyles,
        className
      )}
      style={style}
      aria-hidden="true"
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="relative bg-circuit-dark border border-circuit-copper/30 rounded-lg p-6">
      {/* LED indicator skeleton */}
      <div className="absolute top-4 right-4">
        <Skeleton variant="circular" width={12} height={12} />
      </div>
      
      {/* Title skeleton */}
      <Skeleton className="h-6 w-3/4 mb-3" />
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-5/6" />
        <Skeleton variant="text" className="w-4/6" />
      </div>
      
      {/* Tags skeleton */}
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      
      {/* Stats skeleton */}
      <div className="flex gap-4 pt-4 border-t border-circuit-copper/20">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function SkillNodeSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton variant="circular" width={64} height={64} />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function SkillsSectionSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
      {Array.from({ length: 12 }).map((_, index) => (
        <SkillNodeSkeleton key={index} />
      ))}
    </div>
  );
}

export function HeroStatsSkeleton() {
  return (
    <div className="flex gap-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="text-center">
          <Skeleton className="h-8 w-12 mx-auto mb-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}
