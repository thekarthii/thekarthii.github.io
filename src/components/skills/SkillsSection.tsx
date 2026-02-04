'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SkillNode, Skill } from './SkillNode';
import { CircuitTrace } from '@/components/ui';
import { cn } from '@/lib/utils';

const defaultSkills: Skill[] = [
  // Hardware
  { name: 'PCB Design', level: 4, category: 'hardware', icon: '🔲' },
  { name: 'Embedded C', level: 5, category: 'hardware', icon: '💾' },
  { name: 'VHDL/Verilog', level: 3, category: 'hardware', icon: '🔧' },
  { name: 'Circuit Analysis', level: 4, category: 'hardware', icon: '⚡' },
  { name: 'Power Electronics', level: 3, category: 'hardware', icon: '🔋' },
  { name: 'Signal Processing', level: 4, category: 'hardware', icon: '📊' },
  
  // Software
  { name: 'Python', level: 5, category: 'software', icon: '🐍' },
  { name: 'TypeScript', level: 4, category: 'software', icon: '📘' },
  { name: 'MATLAB', level: 4, category: 'software', icon: '📐' },
  { name: 'React', level: 4, category: 'software', icon: '⚛️' },
  { name: 'C++', level: 3, category: 'software', icon: '🔷' },
  
  // Tools
  { name: 'KiCad', level: 4, category: 'tools', icon: '📋' },
  { name: 'LTspice', level: 4, category: 'tools', icon: '📈' },
  { name: 'Git', level: 5, category: 'tools', icon: '🌿' },
  { name: 'Oscilloscope', level: 4, category: 'tools', icon: '📺' },
  { name: 'Soldering', level: 4, category: 'tools', icon: '🔥' },
];

interface SkillsSectionProps {
  skills?: Skill[];
  className?: string;
}

type CategoryFilter = 'all' | 'hardware' | 'software' | 'tools';

export function SkillsSection({ skills = defaultSkills, className }: SkillsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return skills;
    return skills.filter((skill) => skill.category === activeCategory);
  }, [skills, activeCategory]);

  const categories: { value: CategoryFilter; label: string; color: string }[] = [
    { value: 'all', label: 'All Skills', color: 'bg-gray-500' },
    { value: 'hardware', label: 'Hardware', color: 'bg-amber-500' },
    { value: 'software', label: 'Software', color: 'bg-emerald-500' },
    { value: 'tools', label: 'Tools', color: 'bg-blue-500' },
  ];

  return (
    <section className={cn('relative py-16', className)}>
      {/* Background traces */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <CircuitTrace
          startX={0}
          startY={100}
          endX={400}
          endY={300}
          animated
          color="#10b981"
        />
        <CircuitTrace
          startX={800}
          startY={50}
          endX={600}
          endY={400}
          animated
          color="#f59e0b"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4 font-mono">
            {'<'}<span className="text-emerald-400">Skills</span>{' />'}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technical competencies developed through coursework, projects, and hands-on experience
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                'px-4 py-2 rounded-full font-mono text-sm transition-all duration-300',
                'border-2 border-gray-700 hover:border-gray-500',
                activeCategory === cat.value
                  ? `${cat.color} text-white border-transparent`
                  : 'bg-gray-800/50 text-gray-300'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          {filteredSkills.map((skill, index) => (
            <SkillNode
              key={skill.name}
              skill={skill}
              index={index}
              isActive={selectedSkill === skill.name}
              onClick={() => setSelectedSkill(
                selectedSkill === skill.name ? null : skill.name
              )}
            />
          ))}
        </motion.div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Hardware</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Software</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Tools</span>
          </div>
        </div>
      </div>
    </section>
  );
}
