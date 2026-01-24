'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CircuitTrace } from '../ui/CircuitTrace';
import { CircuitNode } from '../ui/CircuitNode';
import { fadeIn, slideUp } from '@/lib/animations';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
}

export function HeroSection({ title, subtitle, description }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const nodes = [
    { x: 10, y: 20, delay: 0.2 },
    { x: 85, y: 15, delay: 0.4 },
    { x: 25, y: 75, delay: 0.6 },
    { x: 90, y: 80, delay: 0.8 },
    { x: 50, y: 50, delay: 1.0 },
    { x: 15, y: 45, delay: 1.2 },
    { x: 75, y: 55, delay: 1.4 },
  ];

  const traces = [
    { startX: 10, startY: 20, endX: 50, endY: 50, delay: 0.3 },
    { startX: 85, startY: 15, endX: 50, endY: 50, delay: 0.5 },
    { startX: 50, startY: 50, endX: 25, endY: 75, delay: 0.7 },
    { startX: 50, startY: 50, endX: 90, endY: 80, delay: 0.9 },
    { startX: 15, startY: 45, endX: 50, endY: 50, delay: 1.1 },
    { startX: 75, startY: 55, endX: 90, endY: 80, delay: 1.3 },
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated circuit background */}
      <div className="absolute inset-0 opacity-30">
        {mounted && (
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Grid pattern */}
            <defs>
              <pattern
                id="circuit-grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.1"
                  className="text-emerald-500/20"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#circuit-grid)" />
            
            {/* Animated traces */}
            {traces.map((trace, index) => (
              <CircuitTrace
                key={`trace-${index}`}
                startX={trace.startX}
                startY={trace.startY}
                endX={trace.endX}
                endY={trace.endY}
                delay={trace.delay}
                animated
              />
            ))}
          </svg>
        )}

        {/* Circuit nodes */}
        {mounted && nodes.map((node, index) => (
          <motion.div
            key={`node-${index}`}
            className="absolute"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: node.delay, duration: 0.3 }}
          >
            <CircuitNode variant={index % 3 === 0 ? 'ic' : index % 2 === 0 ? 'capacitor' : 'resistor'} size="sm" />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          className="mb-4"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {subtitle}
          </span>
        </motion.div>

        <motion.h1
          variants={slideUp}
          initial="initial"
          animate="animate"
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            {title}
          </span>
        </motion.h1>

        {description && (
          <motion.p
            variants={slideUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        )}

        <motion.div
          variants={fadeIn}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-lg bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 transition-colors duration-200"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg border border-emerald-500/50 text-emerald-400 font-semibold hover:bg-emerald-500/10 transition-colors duration-200"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
