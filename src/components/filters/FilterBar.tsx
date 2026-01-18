'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { FilterChip } from './FilterChip';
import { FilterState, FilterType } from '@/types/portfolio';
import { ChevronDown, Search, X, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  availableFilters: {
    languages: string[];
    topics: string[];
    customTags: string[];
  };
  onToggleFilter: (type: FilterType, value: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  isInitialized?: boolean;
  className?: string;
}

export function FilterBar({
  filters,
  availableFilters,
  onToggleFilter,
  onSearchChange,
  onClearFilters,
  hasActiveFilters,
  activeFilterCount,
  isInitialized = true,
  className,
}: FilterBarProps) {
  const [expandedSection, setExpandedSection] = useState<FilterType | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const toggleSection = useCallback((section: FilterType) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(e.target.value);
    },
    [onSearchChange]
  );

  const clearSearch = useCallback(() => {
    onSearchChange('');
  }, [onSearchChange]);

  const filterSections: { type: FilterType; label: string; items: string[] }[] = [
    { type: 'language', label: 'Languages', items: availableFilters.languages },
    { type: 'topic', label: 'Topics', items: availableFilters.topics },
    { type: 'customTag', label: 'Categories', items: availableFilters.customTags },
  ];

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search and Filter Header */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors',
              isSearchFocused ? 'text-emerald-400' : 'text-gray-500'
            )}
          />
          <input
            type="text"
            placeholder="Search projects..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            disabled={!isInitialized}
            className={cn(
              'w-full pl-10 pr-10 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg',
              'text-gray-100 placeholder-gray-500',
              'focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25',
              'transition-all duration-200',
              !isInitialized && 'opacity-50 cursor-not-allowed'
            )}
          />
          {filters.searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg',
              'bg-red-500/10 border border-red-500/30 text-red-400',
              'hover:bg-red-500/20 hover:border-red-500/50',
              'transition-all duration-200'
            )}
          >
            <X className="w-4 h-4" />
            <span>Clear ({activeFilterCount})</span>
          </button>
        )}
      </div>

      {/* Filter Sections */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2 text-gray-500 mr-2">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm">Filters:</span>
        </div>

        {filterSections.map(({ type, label, items }) => (
          <div key={type} className="relative">
            <button
              onClick={() => toggleSection(type)}
              disabled={!isInitialized || items.length === 0}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm',
                'border transition-all duration-200',
                expandedSection === type
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                  : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-600',
                (!isInitialized || items.length === 0) && 'opacity-50 cursor-not-allowed'
              )}
            >
              <span>{label}</span>
              {filters[`${type}s` as keyof Omit<FilterState, 'searchQuery'>]?.length > 0 && (
                <span className="px-1.5 py-0.5 bg-emerald-500/30 rounded text-xs">
                  {(filters[`${type}s` as keyof Omit<FilterState, 'searchQuery'>] as string[]).length}
                </span>
              )}
              <ChevronDown
                className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  expandedSection === type && 'rotate-180'
                )}
              />
            </button>

            {/* Dropdown */}
            {expandedSection === type && items.length > 0 && (
              <div
                className={cn(
                  'absolute top-full left-0 mt-2 p-2 min-w-48 max-h-64 overflow-y-auto',
                  'bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50',
                  'animate-in fade-in slide-in-from-top-2 duration-200'
                )}
              >
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => {
                    const filterKey = `${type}s` as keyof Omit<FilterState, 'searchQuery'>;
                    const isActive = (filters[filterKey] as string[]).includes(item);

                    return (
                      <FilterChip
                        key={item}
                        label={item}
                        isActive={isActive}
                        onClick={() => onToggleFilter(type, item)}
                        type={type}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-800">
          <span className="text-xs text-gray-500 py-1">Active:</span>
          {filterSections.map(({ type }) => {
            const filterKey = `${type}s` as keyof Omit<FilterState, 'searchQuery'>;
            const activeItems = filters[filterKey] as string[];

            return activeItems.map((item) => (
              <FilterChip
                key={`active-${type}-${item}`}
                label={item}
                isActive={true}
                onClick={() => onToggleFilter(type, item)}
                type={type}
                showRemove
              />
            ));
          })}
        </div>
      )}
    </div>
  );
}
