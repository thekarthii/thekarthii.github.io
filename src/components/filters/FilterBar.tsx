'use client';

import { FilterOptions, FilterState } from '@/types/portfolio';
import { FilterChip } from './FilterChip';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  availableFilters: FilterOptions;
  filterState: FilterState;
  onToggleFilter: (type: 'languages' | 'topics' | 'customTags', value: string) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sortBy: FilterState['sortBy']) => void;
  onSortOrderChange: (order: FilterState['sortOrder']) => void;
  onReset: () => void;
  className?: string;
}

export function FilterBar({
  availableFilters,
  filterState,
  onToggleFilter,
  onSearchChange,
  onSortChange,
  onSortOrderChange,
  onReset,
  className,
}: FilterBarProps) {
  const hasActiveFilters =
    filterState.languages.length > 0 ||
    filterState.topics.length > 0 ||
    filterState.customTags.length > 0 ||
    filterState.searchQuery !== '';

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search projects..."
            value={filterState.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-circuit-dark border border-circuit-trace/30 rounded-lg text-circuit-text placeholder:text-circuit-text/50 focus:outline-none focus:border-circuit-accent transition-colors"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-circuit-text/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Sort Controls */}
        <div className="flex gap-2">
          <select
            value={filterState.sortBy}
            onChange={(e) => onSortChange(e.target.value as FilterState['sortBy'])}
            className="px-3 py-2 bg-circuit-dark border border-circuit-trace/30 rounded-lg text-circuit-text focus:outline-none focus:border-circuit-accent transition-colors cursor-pointer"
          >
            <option value="updated">Last Updated</option>
            <option value="created">Created Date</option>
            <option value="name">Name</option>
            <option value="stars">Stars</option>
          </select>

          <button
            onClick={() =>
              onSortOrderChange(filterState.sortOrder === 'asc' ? 'desc' : 'asc')
            }
            className="px-3 py-2 bg-circuit-dark border border-circuit-trace/30 rounded-lg text-circuit-text hover:border-circuit-accent transition-colors"
            aria-label={`Sort ${filterState.sortOrder === 'asc' ? 'descending' : 'ascending'}`}
          >
            {filterState.sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="space-y-3">
        {/* Languages */}
        {availableFilters.languages.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-circuit-text/60 uppercase tracking-wider min-w-[80px]">
              Language:
            </span>
            {availableFilters.languages.map((lang) => (
              <FilterChip
                key={lang}
                label={lang}
                isActive={filterState.languages.includes(lang)}
                onClick={() => onToggleFilter('languages', lang)}
                variant="language"
              />
            ))}
          </div>
        )}

        {/* Topics */}
        {availableFilters.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-circuit-text/60 uppercase tracking-wider min-w-[80px]">
              Topics:
            </span>
            {availableFilters.topics.map((topic) => (
              <FilterChip
                key={topic}
                label={topic}
                isActive={filterState.topics.includes(topic)}
                onClick={() => onToggleFilter('topics', topic)}
                variant="topic"
              />
            ))}
          </div>
        )}

        {/* Custom Tags */}
        {availableFilters.customTags.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-circuit-text/60 uppercase tracking-wider min-w-[80px]">
              Tags:
            </span>
            {availableFilters.customTags.map((tag) => (
              <FilterChip
                key={tag}
                label={tag}
                isActive={filterState.customTags.includes(tag)}
                onClick={() => onToggleFilter('customTags', tag)}
                variant="custom"
              />
            ))}
          </div>
        )}
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="text-sm text-circuit-accent hover:text-circuit-accent/80 transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
