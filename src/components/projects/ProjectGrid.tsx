'use client';

import { Repository } from '@/types/portfolio';
import { CircuitCard } from '@/components/ui/CircuitCard';
import { TraceLines } from '@/components/ui/TraceLines';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';

interface ProjectGridProps {
  projects: Repository[];
  loading?: boolean;
}

export function ProjectGrid({ projects, loading = false }: ProjectGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 bg-slate-800/50 rounded-lg animate-pulse border border-emerald-900/30"
          />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 mb-4 border-2 border-dashed border-emerald-500/50 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-emerald-500/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-300 mb-2">
          No projects found
        </h3>
        <p className="text-slate-500 max-w-sm">
          Try adjusting your filters or check back later for new projects.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background trace lines connecting cards */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <TraceLines
          variant="grid"
          className="opacity-20"
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={fadeInUp}
            custom={index}
          >
            <CircuitCard
              repository={project}
              className="h-full"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Circuit board corner decorations */}
      <div className="absolute -bottom-4 -right-4 w-24 h-24 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500/10">
          <circle cx="90" cy="90" r="6" fill="currentColor" />
          <path
            d="M90 84 L90 50 M84 90 L50 90"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="90" cy="50" r="3" fill="currentColor" />
          <circle cx="50" cy="90" r="3" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute -top-4 -left-4 w-24 h-24 pointer-events-none rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full text-emerald-500/10">
          <circle cx="90" cy="90" r="6" fill="currentColor" />
          <path
            d="M90 84 L90 50 M84 90 L50 90"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="90" cy="50" r="3" fill="currentColor" />
          <circle cx="50" cy="90" r="3" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
