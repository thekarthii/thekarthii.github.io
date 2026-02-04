'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Skill {
  name: string;
  level: number; // 1-5
  category: 'hardware' | 'software' | 'tools';
  icon?: string;
}

interface SkillNodeProps {
  skill: Skill;
  index: number;
  isActive?: boolean;
  onClick?: () => void;
}

const categoryColors = {
  hardware: {
    bg: 'bg-amber-500/20',
    border: 'border-amber-500',
    glow: 'shadow-amber-500/50',
    text: 'text-amber-400',
  },
  software: {
    bg: 'bg-emerald-500/20',
    border: 'border-emerald-500',
    glow: 'shadow-emerald-500/50',
    text: 'text-emerald-400',
  },
  tools: {
    bg: 'bg-blue-500/20',
    border: 'border-blue-500',
    glow: 'shadow-blue-500/50',
    text: 'text-blue-400',
  },
};

export function SkillNode({ skill, index, isActive, onClick }: SkillNodeProps) {
  const colors = categoryColors[skill.category];
  const levelDots = Array.from({ length: 5 }, (_, i) => i < skill.level);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center gap-2 p-4 rounded-lg',
        'border-2 transition-all duration-300 cursor-pointer',
        colors.bg,
        colors.border,
        isActive && `shadow-lg ${colors.glow}`
      )}
    >
      {/* IC chip appearance */}
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-gray-600 rounded-t" />
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-gray-600 rounded-b" />
      
      {/* Skill icon or default chip icon */}
      <div className={cn('text-2xl', colors.text)}>
        {skill.icon || '⚡'}
      </div>
      
      {/* Skill name */}
      <span className="text-sm font-mono text-gray-200 text-center">
        {skill.name}
      </span>
      
      {/* Level indicator */}
      <div className="flex gap-1">
        {levelDots.map((filled, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.05 + i * 0.1 }}
            className={cn(
              'w-2 h-2 rounded-full border',
              colors.border,
              filled ? colors.bg.replace('/20', '') : 'bg-transparent'
            )}
          />
        ))}
      </div>

      {/* Connection points */}
      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500" />
      <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500" />
    </motion.button>
  );
}
