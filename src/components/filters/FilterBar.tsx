'use client';

import React, { useState } from 'react';
import { FilterChip } from './FilterChip';
import { FilterState, FilterOptions } from '@/types/portfolio';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filterState: FilterState;
  filterOptions: FilterOptions;
  onToggleFilter: (type: keyof Omit<FilterState, 'searchQuery'>, value: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  className?: string;
}

type FilterCategory = 'languages' | 'topics' | 'customTags';

const CATEGORY_LABELS: Record<FilterCategory, string> = {
  languages: 'Languages',
  topics: 'Topics',
  customTags: 'Tags',
};

export function FilterBar({
  filterState,
  filterOptions,
  onToggleFilter,
  onSearchChange,
  onClearFilters,
  hasActiveFilters,
  activeFilterCount,
  className,
}: FilterBarProps) {
  const [expandedCategory, setExpandedCategory] = useState<FilterCategory | null>(null);

  const toggleCategory = (category: FilterCategory) => {
    setExpandedCategory((prev) => (prev === category ? null : category));
  };

  const renderFilterSection = (category: FilterCategory) => {
    const options = filterOptions[category];
    const activeValues = filterState[category];
    const isExpanded = expandedCategory === category;

    // Don't render section if no options available
    if (!options || options.length === 0) {
      return null;
    }

    return (
      <div key={category} className="relative">
        <button
          onClick={() => toggleCategory(category)}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
            'border border-emerald-500/30 hover:border-emerald-500/50',
            'bg-slate-900/50 hover:bg-slate-800/50',
            activeValues.length > 0 && 'border-emerald-500 bg-emerald-500/10',
            isExpanded && 'border-emerald-400'
          )}
          aria-expanded={isExpanded}
          aria-haspopup="listbox"
        >
          <span className="text-emerald-400">{CATEGORY_LABELS[category]}</span>
          {activeValues.length > 0 && (
            <span className="px-1.5 py-0.5 text-xs bg-emerald-500/20 text-emerald-300 rounded">
              {activeValues.length}
            </span>
          )}
          <svg
            className={cn(
              'w-4 h-4 text-emerald-500 transition-transform',
              isExpanded && 'rotate-180'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isExpanded && (
          <div
            className={cn(
              'absolute z-10 mt-2 p-2 min-w-[200px] max-w-[300px]',
              'bg-slate-900 border border-emerald-500/30 rounded-lg shadow-xl',
              'animate-in fade-in slide-in-from-top-2 duration-200'
            )}
            role="listbox"
            aria-label={`${CATEGORY_LABELS[category]} filter options`}
          >
            <div className="flex flex-wrap gap-1.5">
              {options.map((option) => (
                <FilterChip
                  key={option}
                  label={option}
                  isActive={activeValues.includes(option)}
                  onClick={() => onToggleFilter(category, option)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'p-4 bg-slate-950/80 border border-emerald-500/20 rounded-lg',
        'backdrop-blur-sm',
        className
      )}
    >
      {/* Search Input */}
      <div className="relative mb-4">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search projects..."
          value={filterState.searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={cn(
            'w-full pl-10 pr-4 py-2 rounded-md',
            'bg-slate-900/50 border border-emerald-500/30',
            'text-slate-200 placeholder:text-slate-500',
            'focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50',
            'transition-colors'
          )}
        />
      </div>

      {/* Filter Categories */}
      <div className="flex flex-wrap items-center gap-3">
        {(['languages', 'topics', 'customTags'] as FilterCategory[]).map(renderFilterSection)}

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm',
              'text-red-400 hover:text-red-300',
              'border border-red-500/30 hover:border-red-500/50',
              'bg-red-500/5 hover:bg-red-500/10',
              'transition-colors'
            )}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear ({activeFilterCount})
          </button>
        )}
      </div>
    </div>
  );
}
