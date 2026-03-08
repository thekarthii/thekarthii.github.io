# Circuitfolio API Documentation

## GitHub Integration

### `fetchGitHubRepos(username: string)`

Fetches all public repositories for a given GitHub username.

**Parameters:**
- `username` (string): GitHub username to fetch repositories for

**Returns:** `Promise<Repository[]>`

**Example:**
```typescript
import { fetchGitHubRepos } from '@/lib/github';

const repos = await fetchGitHubRepos('johndoe');
```

### `fetchRepoDetails(owner: string, repo: string)`

Fetches detailed information about a specific repository.

**Parameters:**
- `owner` (string): Repository owner's username
- `repo` (string): Repository name

**Returns:** `Promise<RepositoryDetails>`

---

## Types

### `Repository`

```typescript
interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}
```

### `PortfolioProject`

```typescript
interface PortfolioProject {
  id: string;
  name: string;
  displayName: string;
  description: string;
  longDescription?: string;
  url: string;
  demoUrl?: string;
  language: string;
  languages?: Record<string, number>;
  stars: number;
  forks: number;
  topics: string[];
  category: ProjectCategory;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  stats: ProjectStats;
}
```

### `ProjectCategory`

```typescript
type ProjectCategory = 
  | 'embedded'
  | 'power-systems'
  | 'digital-design'
  | 'pcb'
  | 'firmware'
  | 'web'
  | 'other';
```

### `FilterOptions`

```typescript
interface FilterOptions {
  languages: string[];
  topics: string[];
  categories: ProjectCategory[];
  searchQuery: string;
  sortBy: 'stars' | 'updated' | 'name' | 'created';
  sortOrder: 'asc' | 'desc';
}
```

---

## Hooks

### `useProjectFilter(projects, initialFilters?)`

Manages filtering and sorting of projects.

**Parameters:**
- `projects` (PortfolioProject[]): Array of projects to filter
- `initialFilters` (Partial<FilterOptions>): Optional initial filter state

**Returns:**
```typescript
{
  filteredProjects: PortfolioProject[];
  filters: FilterOptions;
  setFilter: (key: keyof FilterOptions, value: any) => void;
  clearFilters: () => void;
  activeFilterCount: number;
}
```

**Example:**
```typescript
const { filteredProjects, setFilter, clearFilters } = useProjectFilter(projects);

// Filter by language
setFilter('languages', ['TypeScript', 'C']);

// Filter by category
setFilter('categories', ['embedded', 'firmware']);
```

### `useBreakpoint()`

Returns current responsive breakpoint information.

**Returns:**
```typescript
{
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}
```

### `useHydration()`

Returns whether the component has been hydrated on the client.

**Returns:** `boolean`

---

## Utilities

### `cn(...inputs)`

Merges Tailwind CSS classes with conflict resolution.

```typescript
import { cn } from '@/lib/utils';

const className = cn(
  'base-class',
  isActive && 'active-class',
  variant === 'primary' ? 'primary' : 'secondary'
);
```

### `getBreakpoint(width)`

Returns breakpoint name for a given width.

```typescript
import { getBreakpoint } from '@/lib/responsive';

const bp = getBreakpoint(768); // 'md'
```

---

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | GitHub Personal Access Token for API requests | Yes |
| `NEXT_PUBLIC_GITHUB_USERNAME` | Default GitHub username to display | Yes |
| `NEXT_PUBLIC_SITE_URL` | Production site URL | No |

See `.env.example` for a complete template.
