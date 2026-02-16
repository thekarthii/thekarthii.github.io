'use client';

import { useRef, useCallback } from 'react';
import { FilterChip } from './FilterChip';
import { LANGUAGES, TOPICS, CUSTOM_TAGS } from '@/lib/constants';
import { FilterType } from '@/types/portfolio';
import { KEYS, announceToScreenReader } from '@/lib/accessibility';

interface FilterBarProps {
  activeFilters: {
    languages: string[];
    topics: string[];
    tags: string[];
  };
  onFilterChange: (type: FilterType, value: string) => void;
  onClearAll: () => void;
}

export function FilterBar({ activeFilters, onFilterChange, onClearAll }: FilterBarProps) {
  const filterGroupRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const handleKeyNavigation = useCallback((event: React.KeyboardEvent, type: FilterType, items: string[]) => {
    const currentIndex = items.findIndex(item => 
      document.activeElement?.getAttribute('data-filter-value') === item
    );

    let nextIndex = currentIndex;

    switch (event.key) {
      case KEYS.ARROW_RIGHT:
      case KEYS.ARROW_DOWN:
        event.preventDefault();
        nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        break;
      case KEYS.ARROW_LEFT:
      case KEYS.ARROW_UP:
        event.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        break;
      case KEYS.HOME:
        event.preventDefault();
        nextIndex = 0;
        break;
      case KEYS.END:
        event.preventDefault();
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    const group = filterGroupRefs.current.get(type);
    const nextButton = group?.querySelector(`[data-filter-value="${items[nextIndex]}"]`) as HTMLButtonElement;
    nextButton?.focus();
  }, []);

  const handleFilterToggle = (type: FilterType, value: string) => {
    onFilterChange(type, value);
    const isActive = activeFilters[type === 'language' ? 'languages' : type === 'topic' ? 'topics' : 'tags'].includes(value);
    announceToScreenReader(`${value} filter ${isActive ? 'removed' : 'applied'}`);
  };

  const handleClearAll = () => {
    onClearAll();
    announceToScreenReader('All filters cleared');
  };

  const totalActiveFilters = 
    activeFilters.languages.length + 
    activeFilters.topics.length + 
    activeFilters.tags.length;

  return (
    <div 
      className="space-y-4 p-4 bg-circuit-dark/50 rounded-lg border border-circuit-trace/30"
      role="search"
      aria-label="Filter projects"
    >
      {/* Languages */}
      <div 
        className="space-y-2"
        role="group"
        aria-labelledby="language-filter-label"
      >
        <h3 id="language-filter-label" className="text-sm font-medium text-circuit-copper">
          Languages
        </h3>
        <div 
          ref={(el) => { if (el) filterGroupRefs.current.set('language', el); }}
          className="flex flex-wrap gap-2"
          role="listbox"
          aria-label="Filter by programming language"
          aria-multiselectable="true"
          onKeyDown={(e) => handleKeyNavigation(e, 'language', LANGUAGES)}
        >
          {LANGUAGES.map((lang) => (
            <FilterChip
              key={lang}
              label={lang}
              isActive={activeFilters.languages.includes(lang)}
              onClick={() => handleFilterToggle('language', lang)}
              data-filter-value={lang}
              aria-selected={activeFilters.languages.includes(lang)}
            />
          ))}
        </div>
      </div>

      {/* Topics */}
      <div 
        className="space-y-2"
        role="group"
        aria-labelledby="topic-filter-label"
      >
        <h3 id="topic-filter-label" className="text-sm font-medium text-circuit-copper">
          Topics
        </h3>
        <div 
          ref={(el) => { if (el) filterGroupRefs.current.set('topic', el); }}
          className="flex flex-wrap gap-2"
          role="listbox"
          aria-label="Filter by topic"
          aria-multiselectable="true"
          onKeyDown={(e) => handleKeyNavigation(e, 'topic', TOPICS)}
        >
          {TOPICS.map((topic) => (
            <FilterChip
              key={topic}
              label={topic}
              isActive={activeFilters.topics.includes(topic)}
              onClick={() => handleFilterToggle('topic', topic)}
              data-filter-value={topic}
              aria-selected={activeFilters.topics.includes(topic)}
            />
          ))}
        </div>
      </div>

      {/* Custom Tags */}
      <div 
        className="space-y-2"
        role="group"
        aria-labelledby="tag-filter-label"
      >
        <h3 id="tag-filter-label" className="text-sm font-medium text-circuit-copper">
          Specializations
        </h3>
        <div 
          ref={(el) => { if (el) filterGroupRefs.current.set('tag', el); }}
          className="flex flex-wrap gap-2"
          role="listbox"
          aria-label="Filter by specialization"
          aria-multiselectable="true"
          onKeyDown={(e) => handleKeyNavigation(e, 'tag', CUSTOM_TAGS)}
        >
          {CUSTOM_TAGS.map((tag) => (
            <FilterChip
              key={tag}
              label={tag}
              isActive={activeFilters.tags.includes(tag)}
              onClick={() => handleFilterToggle('tag', tag)}
              data-filter-value={tag}
              aria-selected={activeFilters.tags.includes(tag)}
            />
          ))}
        </div>
      </div>

      {/* Clear All Button */}
      {totalActiveFilters > 0 && (
        <div className="pt-2 border-t border-circuit-trace/20">
          <button
            onClick={handleClearAll}
            className="text-sm text-circuit-copper hover:text-circuit-glow transition-colors focus:outline-none focus:ring-2 focus:ring-circuit-glow focus:ring-offset-2 focus:ring-offset-circuit-dark rounded px-2 py-1"
            aria-label={`Clear all ${totalActiveFilters} active filters`}
          >
            Clear all filters ({totalActiveFilters})
          </button>
        </div>
      )}

      {/* Live region for filter count */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {totalActiveFilters > 0 
          ? `${totalActiveFilters} filters active` 
          : 'No filters active'}
      </div>
    </div>
  );
}

export default FilterBar;
