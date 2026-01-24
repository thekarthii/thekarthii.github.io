'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '@/lib/animations';

interface Stat {
  label: string;
  value: string | number;
  icon?: string;
}

interface HeroStatsProps {
  stats: Stat[];
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-wrap justify-center gap-8 md:gap-16 py-8 px-4 border-y border-emerald-500/20 bg-slate-900/50 backdrop-blur-sm"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          variants={fadeIn}
          className="text-center"
        >
          <div className="relative">
            {/* Circuit decoration */}
            <div className="absolute -left-4 top-1/2 w-2 h-2 rounded-full bg-emerald-500/50" />
            <div className="absolute -left-4 top-1/2 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            
            <motion.span
              className="block text-3xl md:text-4xl font-bold text-white font-mono"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {stat.value}
            </motion.span>
          </div>
          <span className="text-sm text-slate-400 uppercase tracking-wider mt-1 block">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
