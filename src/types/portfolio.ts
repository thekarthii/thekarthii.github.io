import type { GitHubRepository, EETopic } from '@/lib/github';

export interface PortfolioProject {
  id: number;
  name: string;
  displayName: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  languages: Record<string, number>;
  stars: number;
  forks: number;
  topics: string[];
  eeCategories: string[];
  updatedAt: Date;
  createdAt: Date;
}

export interface PortfolioOwner {
  username: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
  bio: string;
  repoCount: number;
}

export interface FilterOptions {
  language?: string;
  topic?: string;
  eeCategory?: EETopic;
  searchQuery?: string;
}

export function transformRepository(
  repo: GitHubRepository,
  languages: Record<string, number> = {},
  eeCategories: string[] = []
): PortfolioProject {
  return {
    id: repo.id,
    name: repo.name,
    displayName: repo.name
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || 'No description provided',
    url: repo.html_url,
    homepage: repo.homepage,
    language: repo.language,
    languages,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    topics: repo.topics,
    eeCategories,
    updatedAt: new Date(repo.updated_at),
    createdAt: new Date(repo.created_at),
  };
}
