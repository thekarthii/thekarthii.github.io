'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TraceLines } from '@/components/ui/TraceLines';
import { CircuitNode } from '@/components/ui/CircuitNode';
import { HeroStats } from './HeroStats';
import { useHydration } from '@/hooks/useHydration';
import type { GitHubStats } from '@/types/portfolio';

interface HeroSectionProps {
  name: string;
  title: string;
  description: string;
  stats?: GitHubStats;
  className?: string;
}

export function HeroSection({
  name,
  title,
  description,
  stats,
  className,
}: HeroSectionProps) {
  const hydrated = useHydration();

  return (
    <section
      className={cn(
        'relative min-h-[80vh] flex items-center justify-center overflow-hidden',
        'bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900',
        className
      )}
      aria-labelledby="hero-heading"
    >
      {/* Background trace lines */}
      <div className="absolute inset-0 opacity-30">
        <TraceLines density="medium" animated={hydrated} />
      </div>

      {/* Decorative circuit nodes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <CircuitNode
          type="capacitor"
          size="lg"
          className="absolute top-20 left-10 opacity-20"
          animated={hydrated}
        />
        <CircuitNode
          type="resistor"
          size="md"
          className="absolute top-40 right-20 opacity-20"
          animated={hydrated}
        />
        <CircuitNode
          type="ic"
          size="xl"
          className="absolute bottom-20 left-1/4 opacity-15"
          animated={hydrated}
        />
        <CircuitNode
          type="led"
          size="sm"
          className="absolute bottom-40 right-1/3 opacity-25"
          animated={hydrated}
          glowing
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-6">
          {/* Circuit-styled name badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-mono tracking-wider">
              SYSTEM.ACTIVE
            </span>
          </div>

          {/* Name with circuit styling */}
          <h1
            id="hero-heading"
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            <span className="relative">
              {name}
              <span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* Title with component styling */}
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-green-500/50" aria-hidden="true" />
            <h2 className="text-xl md:text-2xl text-green-400 font-mono">
              {title}
            </h2>
            <span className="h-px w-12 bg-green-500/50" aria-hidden="true" />
          </div>

          {/* Description */}
          <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* GitHub stats */}
          {stats && (
            <div className="pt-8">
              <HeroStats stats={stats} />
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-8">
            <a
              href="#projects"
              className={cn(
                'px-8 py-3 rounded-lg font-medium transition-all duration-300',
                'bg-green-500 text-slate-900 hover:bg-green-400',
                'hover:shadow-lg hover:shadow-green-500/25',
                'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900'
              )}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className={cn(
                'px-8 py-3 rounded-lg font-medium transition-all duration-300',
                'border border-green-500/50 text-green-400',
                'hover:bg-green-500/10 hover:border-green-500',
                'focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-900'
              )}
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}

export default HeroSection;
