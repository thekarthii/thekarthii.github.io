import { useState, useMemo, useCallback } from 'react';
import { Repository, FilterState, FilterOptions } from '@/types/portfolio';

const DEFAULT_FILTER_STATE: FilterState = {
  languages: [],
  topics: [],
  customTags: [],
  searchQuery: '',
};

export function useProjectFilter(repositories: Repository[]) {
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER_STATE);

  // Extract available filter options from repositories
  const filterOptions = useMemo<FilterOptions>(() => {
    const languages = new Set<string>();
    const topics = new Set<string>();
    const customTags = new Set<string>();

    repositories.forEach((repo) => {
      // Handle null/undefined language gracefully
      if (repo.language && typeof repo.language === 'string') {
        languages.add(repo.language);
      }

      // Handle topics array safely
      if (Array.isArray(repo.topics)) {
        repo.topics.forEach((topic) => {
          if (topic && typeof topic === 'string') {
            topics.add(topic);
          }
        });
      }

      // Handle custom tags array safely
      if (Array.isArray(repo.customTags)) {
        repo.customTags.forEach((tag) => {
          if (tag && typeof tag === 'string') {
            customTags.add(tag);
          }
        });
      }
    });

    return {
      languages: Array.from(languages).sort(),
      topics: Array.from(topics).sort(),
      customTags: Array.from(customTags).sort(),
    };
  }, [repositories]);

  // Filter repositories based on current filter state
  const filteredRepositories = useMemo(() => {
    // Return empty array if no repositories provided
    if (!Array.isArray(repositories) || repositories.length === 0) {
      return [];
    }

    return repositories.filter((repo) => {
      // Skip invalid repository entries
      if (!repo || typeof repo !== 'object') {
        return false;
      }

      // Language filter - check if repo language matches any selected
      if (filterState.languages.length > 0) {
        if (!repo.language || !filterState.languages.includes(repo.language)) {
          return false;
        }
      }

      // Topics filter - check if repo has at least one matching topic
      if (filterState.topics.length > 0) {
        const repoTopics = Array.isArray(repo.topics) ? repo.topics : [];
        const hasMatchingTopic = filterState.topics.some((topic) =>
          repoTopics.includes(topic)
        );
        if (!hasMatchingTopic) {
          return false;
        }
      }

      // Custom tags filter - check if repo has at least one matching tag
      if (filterState.customTags.length > 0) {
        const repoTags = Array.isArray(repo.customTags) ? repo.customTags : [];
        const hasMatchingTag = filterState.customTags.some((tag) =>
          repoTags.includes(tag)
        );
        if (!hasMatchingTag) {
          return false;
        }
      }

      // Search query filter - check name and description
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase().trim();
        const name = (repo.name || '').toLowerCase();
        const description = (repo.description || '').toLowerCase();
        
        if (!name.includes(query) && !description.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [repositories, filterState]);

  // Toggle a specific filter value
  const toggleFilter = useCallback(
    (type: keyof Omit<FilterState, 'searchQuery'>, value: string) => {
      setFilterState((prev) => {
        const currentValues = prev[type];
        const newValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];

        return {
          ...prev,
          [type]: newValues,
        };
      });
    },
    []
  );

  // Set search query with debounce-friendly approach
  const setSearchQuery = useCallback((query: string) => {
    setFilterState((prev) => ({
      ...prev,
      searchQuery: query,
    }));
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilterState(DEFAULT_FILTER_STATE);
  }, []);

  // Clear specific filter type
  const clearFilterType = useCallback(
    (type: keyof Omit<FilterState, 'searchQuery'>) => {
      setFilterState((prev) => ({
        ...prev,
        [type]: [],
      }));
    },
    []
  );

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filterState.languages.length > 0 ||
      filterState.topics.length > 0 ||
      filterState.customTags.length > 0 ||
      filterState.searchQuery.trim().length > 0
    );
  }, [filterState]);

  // Get count of active filters
  const activeFilterCount = useMemo(() => {
    return (
      filterState.languages.length +
      filterState.topics.length +
      filterState.customTags.length +
      (filterState.searchQuery.trim() ? 1 : 0)
    );
  }, [filterState]);

  return {
    filterState,
    filterOptions,
    filteredRepositories,
    toggleFilter,
    setSearchQuery,
    clearFilters,
    clearFilterType,
    hasActiveFilters,
    activeFilterCount,
  };
}
