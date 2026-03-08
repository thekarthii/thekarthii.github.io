# Circuitfolio Component Guide

## UI Components

### CircuitCard

A card component styled like an electronic component on a circuit board.

```tsx
import { CircuitCard } from '@/components/ui';

<CircuitCard
  variant="primary" // 'primary' | 'secondary' | 'ghost'
  glowing={true}    // Enable glow effect
  hoverable={true}  // Enable hover animations
  className="custom-class"
>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</CircuitCard>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style variant |
| `glowing` | `boolean` | `false` | Enable animated glow effect |
| `hoverable` | `boolean` | `true` | Enable hover state animations |
| `className` | `string` | - | Additional CSS classes |
| `children` | `ReactNode` | - | Card content |

---

### CircuitNode

Represents a connection point or component node on the circuit board.

```tsx
import { CircuitNode } from '@/components/ui';

<CircuitNode
  type="connection" // 'connection' | 'component' | 'power' | 'ground'
  active={true}
  size="md"         // 'sm' | 'md' | 'lg'
  label="VCC"
/>
```

---

### CircuitTrace

Animated trace line connecting circuit elements.

```tsx
import { CircuitTrace } from '@/components/ui';

<CircuitTrace
  from={{ x: 0, y: 50 }}
  to={{ x: 100, y: 50 }}
  animated={true}
  color="primary" // 'primary' | 'secondary' | 'accent'
  width={2}
/>
```

---

### TraceLines

Background component that renders decorative circuit traces.

```tsx
import { TraceLines } from '@/components/ui';

<TraceLines
  density="medium"  // 'low' | 'medium' | 'high'
  animated={true}
  className="absolute inset-0 -z-10"
/>
```

---

### LoadingSpinner

Circuit-themed loading indicator.

```tsx
import { LoadingSpinner } from '@/components/ui';

<LoadingSpinner
  size="md"    // 'sm' | 'md' | 'lg'
  label="Loading projects..."
/>
```

---

### Skeleton

Placeholder loading component.

```tsx
import { Skeleton } from '@/components/ui';

<Skeleton
  variant="card"  // 'text' | 'card' | 'avatar' | 'button'
  lines={3}       // For text variant
/>
```

---

## Project Components

### ProjectGrid

Displays projects in a responsive grid layout.

```tsx
import { ProjectGrid } from '@/components/projects';

<ProjectGrid
  projects={projects}
  loading={isLoading}
  emptyMessage="No projects found"
  columns={{ sm: 1, md: 2, lg: 3 }}
/>
```

---

### ProjectStats

Displays repository statistics (stars, forks, language).

```tsx
import { ProjectStats } from '@/components/projects';

<ProjectStats
  stars={42}
  forks={12}
  language="TypeScript"
  showLabels={true}
/>
```

---

## Filter Components

### FilterBar

Container for filter controls.

```tsx
import { FilterBar } from '@/components/filters';

<FilterBar
  filters={filters}
  onFilterChange={setFilter}
  onClear={clearFilters}
  availableLanguages={['TypeScript', 'C', 'Python']}
  availableCategories={['embedded', 'firmware', 'web']}
/>
```

---

### FilterChip

Individual filter toggle button.

```tsx
import { FilterChip } from '@/components/filters';

<FilterChip
  label="TypeScript"
  active={true}
  onClick={() => toggleFilter('TypeScript')}
  onRemove={() => removeFilter('TypeScript')}
/>
```

---

## Layout Components

### Header

Site header with navigation.

```tsx
import { Header } from '@/components/layout';

<Header
  transparent={true}  // Transparent background
  sticky={true}       // Stick to top on scroll
/>
```

---

### Footer

Site footer with links and credits.

```tsx
import { Footer } from '@/components/layout';

<Footer showSocials={true} />
```

---

## Section Components

### HeroSection

Landing page hero with animated circuit elements.

```tsx
import { HeroSection } from '@/components/hero';

<HeroSection
  title="Your Name"
  subtitle="Electrical Engineer"
  showStats={true}
  stats={githubStats}
/>
```

---

### SkillsSection

Displays skills as circuit nodes.

```tsx
import { SkillsSection } from '@/components/skills';

<SkillsSection
  skills={[
    { name: 'PCB Design', level: 90, category: 'hardware' },
    { name: 'Embedded C', level: 85, category: 'firmware' },
  ]}
/>
```

---

### ContactForm

Contact form with validation.

```tsx
import { ContactForm } from '@/components/contact';

<ContactForm
  onSubmit={handleSubmit}
  showSocials={true}
/>
```

---

## Accessibility Components

### SkipLink

Skip to main content link for keyboard users.

```tsx
import { SkipLink } from '@/components/ui';

<SkipLink href="#main-content">
  Skip to main content
</SkipLink>
```

---

## Best Practices

1. **Always provide loading states** - Use `Skeleton` or `LoadingSpinner` during data fetching
2. **Use semantic HTML** - Components render appropriate elements by default
3. **Respect motion preferences** - Animations check `prefers-reduced-motion`
4. **Provide alt text** - All images require descriptive alt text
5. **Test with keyboard** - Ensure all interactive elements are focusable
