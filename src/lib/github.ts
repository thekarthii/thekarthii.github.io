export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  default_branch: string;
  visibility: string;
  fork: boolean;
  archived: boolean;
}

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

const GITHUB_API_BASE = 'https://api.github.com';

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };
  
  if (process.env.GH_TOKEN_AUTH) {
    headers['Authorization'] = `Bearer ${process.env.GH_TOKEN_AUTH}`;
  }
  
  return headers;
}

export async function fetchUserRepositories(
  username: string,
  options: {
    sort?: 'created' | 'updated' | 'pushed' | 'full_name';
    direction?: 'asc' | 'desc';
    perPage?: number;
    page?: number;
  } = {}
): Promise<GitHubRepository[]> {
  const { sort = 'updated', direction = 'desc', perPage = 100, page = 1 } = options;
  
  const params = new URLSearchParams({
    sort,
    direction,
    per_page: perPage.toString(),
    page: page.toString(),
  });
  
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?${params}`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.statusText}`);
  }
  
  const repos: GitHubRepository[] = await response.json();
  
  // Filter out forks and archived repos by default
  return repos.filter(repo => !repo.fork && !repo.archived);
}

export async function fetchUserProfile(username: string): Promise<GitHubUser> {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user profile: ${response.statusText}`);
  }
  
  return response.json();
}

export async function fetchRepositoryLanguages(
  owner: string,
  repo: string
): Promise<Record<string, number>> {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`,
    {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    }
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch languages: ${response.statusText}`);
  }
  
  return response.json();
}

// EE-specific tags for categorizing projects
export const EE_TOPICS = [
  'embedded',
  'power-systems',
  'pcb',
  'fpga',
  'simulation',
  'microcontroller',
  'arduino',
  'raspberry-pi',
  'verilog',
  'vhdl',
  'signal-processing',
  'control-systems',
  'robotics',
  'iot',
  'firmware',
] as const;

export type EETopic = typeof EE_TOPICS[number];

export function categorizeRepository(repo: GitHubRepository): string[] {
  const categories: string[] = [];
  const topicsLower = repo.topics.map(t => t.toLowerCase());
  const descLower = (repo.description || '').toLowerCase();
  const nameLower = repo.name.toLowerCase();
  
  for (const topic of EE_TOPICS) {
    if (
      topicsLower.includes(topic) ||
      descLower.includes(topic) ||
      nameLower.includes(topic)
    ) {
      categories.push(topic);
    }
  }
  
  return categories;
}

