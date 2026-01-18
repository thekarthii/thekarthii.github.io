'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { Repository, FilterState, FilterType } from '@/types/portfolio';
import { CUSTOM_TAGS } from '@/lib/constants';

const initialFilterState: FilterState = {
  languages: [],
  topics: [],
  customTags: [],
  searchQuery: '',
};

export function useProjectFilter(repositories: Repository[]) {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize filters only on client side
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Extract available filter options from repositories
  const availableFilters = useMemo(() => {
    const languages = new Set<string>();
    const topics = new Set<string>();

    repositories.forEach((repo) => {
      if (repo.language) {
        languages.add(repo.language);
      }
      repo.topics?.forEach((topic) => topics.add(topic));
    });

    return {
      languages: Array.from(languages).sort(),
      topics: Array.from(topics).sort(),
      customTags: CUSTOM_TAGS,
    };
  }, [repositories]);

  // Filter repositories based on current filter state
  const filteredRepositories = useMemo(() => {
    if (!isInitialized) return repositories;

    return repositories.filter((repo) => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const matchesSearch =
          repo.name.toLowerCase().includes(query) ||
          repo.description?.toLowerCase().includes(query) ||
          repo.topics?.some((topic) => topic.toLowerCase().includes(query));

        if (!matchesSearch) return false;
      }

      // Language filter
      if (filters.languages.length > 0) {
        if (!repo.language || !filters.languages.includes(repo.language)) {
          return false;
        }
      }

      // Topics filter
      if (filters.topics.length > 0) {
        const hasMatchingTopic = filters.topics.some((topic) =>
          repo.topics?.includes(topic)
        );
        if (!hasMatchingTopic) return false;
      }

      // Custom tags filter (matches against topics and name)
      if (filters.customTags.length > 0) {
        const repoText = [
          repo.name,
          repo.description || '',
          ...(repo.topics || []),
        ]
          .join(' ')
          .toLowerCase();

        const hasMatchingTag = filters.customTags.some((tag) => {
          const tagKeywords = getTagKeywords(tag);
          return tagKeywords.some((keyword) => repoText.includes(keyword));
        });

        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }, [repositories, filters, isInitialized]);

  const toggleFilter = useCallback((type: FilterType, value: string) => {
    setFilters((prev) => {
      const key = `${type}s` as keyof Omit<FilterState, 'searchQuery'>;
      const currentValues = prev[key] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [key]: newValues,
      };
    });
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  const clearFilterType = useCallback((type: FilterType) => {
    setFilters((prev) => ({
      ...prev,
      [`${type}s`]: [],
    }));
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.languages.length > 0 ||
      filters.topics.length > 0 ||
      filters.customTags.length > 0 ||
      filters.searchQuery.length > 0
    );
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    return (
      filters.languages.length +
      filters.topics.length +
      filters.customTags.length +
      (filters.searchQuery ? 1 : 0)
    );
  }, [filters]);

  return {
    filters,
    filteredRepositories,
    availableFilters,
    toggleFilter,
    setSearchQuery,
    clearFilters,
    clearFilterType,
    hasActiveFilters,
    activeFilterCount,
    isInitialized,
  };
}

// Helper function to get keywords for custom tags
function getTagKeywords(tag: string): string[] {
  const keywordMap: Record<string, string[]> = {
    embedded: ['embedded', 'arduino', 'esp32', 'stm32', 'microcontroller', 'mcu', 'firmware', 'rtos'],
    'power-systems': ['power', 'battery', 'solar', 'inverter', 'converter', 'smps', 'psu'],
    pcb: ['pcb', 'kicad', 'eagle', 'altium', 'gerber', 'board'],
    fpga: ['fpga', 'verilog', 'vhdl', 'xilinx', 'altera', 'vivado'],
    analog: ['analog', 'amplifier', 'filter', 'opamp', 'adc', 'dac'],
    digital: ['digital', 'logic', 'uart', 'spi', 'i2c', 'protocol'],
    rf: ['rf', 'radio', 'antenna', 'wireless', 'bluetooth', 'wifi', 'lora'],
    automotive: ['automotive', 'can', 'lin', 'obd', 'vehicle', 'car'],
  };

  return keywordMap[tag.toLowerCase()] || [tag.toLowerCase()];
}
