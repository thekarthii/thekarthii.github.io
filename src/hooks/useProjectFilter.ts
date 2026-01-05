import { useState, useMemo, useCallback } from 'react';
import { Repository, FilterOptions, FilterState } from '@/types/portfolio';

const DEFAULT_FILTER_STATE: FilterState = {
  languages: [],
  topics: [],
  customTags: [],
  searchQuery: '',
  sortBy: 'updated',
  sortOrder: 'desc',
};

export function useProjectFilter(repositories: Repository[]) {
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER_STATE);

  const availableFilters = useMemo((): FilterOptions => {
    const languages = new Set<string>();
    const topics = new Set<string>();
    const customTags = new Set<string>();

    repositories.forEach((repo) => {
      if (repo.language) languages.add(repo.language);
      repo.topics?.forEach((topic) => topics.add(topic));
      repo.customTags?.forEach((tag) => customTags.add(tag));
    });

    return {
      languages: Array.from(languages).sort(),
      topics: Array.from(topics).sort(),
      customTags: Array.from(customTags).sort(),
    };
  }, [repositories]);

  const filteredRepositories = useMemo(() => {
    let filtered = [...repositories];

    // Filter by search query
    if (filterState.searchQuery) {
      const query = filterState.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(query) ||
          repo.description?.toLowerCase().includes(query)
      );
    }

    // Filter by languages
    if (filterState.languages.length > 0) {
      filtered = filtered.filter(
        (repo) => repo.language && filterState.languages.includes(repo.language)
      );
    }

    // Filter by topics
    if (filterState.topics.length > 0) {
      filtered = filtered.filter((repo) =>
        repo.topics?.some((topic) => filterState.topics.includes(topic))
      );
    }

    // Filter by custom tags
    if (filterState.customTags.length > 0) {
      filtered = filtered.filter((repo) =>
        repo.customTags?.some((tag) => filterState.customTags.includes(tag))
      );
    }

    // Sort repositories
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (filterState.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'stars':
          comparison = a.stargazersCount - b.stargazersCount;
          break;
        case 'updated':
          comparison =
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'created':
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return filterState.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [repositories, filterState]);

  const setLanguages = useCallback((languages: string[]) => {
    setFilterState((prev) => ({ ...prev, languages }));
  }, []);

  const setTopics = useCallback((topics: string[]) => {
    setFilterState((prev) => ({ ...prev, topics }));
  }, []);

  const setCustomTags = useCallback((customTags: string[]) => {
    setFilterState((prev) => ({ ...prev, customTags }));
  }, []);

  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilterState((prev) => ({ ...prev, searchQuery }));
  }, []);

  const setSortBy = useCallback((sortBy: FilterState['sortBy']) => {
    setFilterState((prev) => ({ ...prev, sortBy }));
  }, []);

  const setSortOrder = useCallback((sortOrder: FilterState['sortOrder']) => {
    setFilterState((prev) => ({ ...prev, sortOrder }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilterState(DEFAULT_FILTER_STATE);
  }, []);

  const toggleFilter = useCallback(
    (type: 'languages' | 'topics' | 'customTags', value: string) => {
      setFilterState((prev) => {
        const current = prev[type];
        const updated = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
        return { ...prev, [type]: updated };
      });
    },
    []
  );

  return {
    filterState,
    filteredRepositories,
    availableFilters,
    setLanguages,
    setTopics,
    setCustomTags,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    resetFilters,
    toggleFilter,
  };
}
