# Circuitfolio ⚡

A minimalist portfolio site for Electrical Engineering students that auto-syncs and showcases GitHub projects with circuit-themed styling.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- **🔄 GitHub Auto-Sync** - Automatically fetches and displays your repositories with real-time stats
- **🎨 Circuit-Themed UI** - Beautiful PCB-inspired design with trace-line animations and component-styled cards
- **🔍 Smart Filtering** - Filter projects by language, topic, or custom tags like 'embedded' or 'power-systems'
- **📱 Fully Responsive** - Looks great on all devices from mobile to desktop
- **♿ Accessible** - Built with WCAG guidelines in mind
- **⚡ Lightning Fast** - Optimized for Core Web Vitals

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- GitHub Personal Access Token

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/circuitfolio.git
cd circuitfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Add your GitHub token to .env.local
# GITHUB_TOKEN=your_token_here
# NEXT_PUBLIC_GITHUB_USERNAME=your_username

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 📁 Project Structure

```
circuitfolio/
├── docs/                    # Documentation
│   ├── API.md              # API reference
│   └── COMPONENTS.md       # Component guide
├── src/
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── CircuitCard.tsx
│   │   │   ├── CircuitNode.tsx
│   │   │   ├── CircuitTrace.tsx
│   │   │   ├── TraceLines.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── SkipLink.tsx
│   │   ├── projects/       # Project display components
│   │   ├── filters/        # Filter components
│   │   ├── hero/           # Hero section
│   │   ├── skills/         # Skills section
│   │   ├── contact/        # Contact form
│   │   └── layout/         # Header, Footer
│   ├── hooks/              # Custom React hooks
│   │   ├── useProjectFilter.ts
│   │   ├── useBreakpoint.ts
│   │   └── useHydration.ts
│   ├── lib/                # Utilities and helpers
│   │   ├── github.ts       # GitHub API integration
│   │   ├── utils.ts        # General utilities
│   │   ├── constants.ts    # App constants
│   │   ├── animations.ts   # Animation configs
│   │   ├── responsive.ts   # Responsive utilities
│   │   └── accessibility.ts # A11y helpers
│   ├── styles/
│   │   └── globals.css     # Global styles
│   └── types/
│       └── portfolio.ts    # TypeScript types
├── .env.example            # Environment template
├── tailwind.config.ts      # Tailwind configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Customization

### Theming

Edit `tailwind.config.ts` to customize the circuit theme:

```typescript
theme: {
  extend: {
    colors: {
      circuit: {
        primary: '#10b981',    // Main trace color
        secondary: '#06b6d4',  // Secondary elements
        board: '#1e293b',      // PCB background
        copper: '#f59e0b',     // Copper traces
      }
    }
  }
}
```

### Project Categories

Customize categories in `src/lib/constants.ts`:

```typescript
export const PROJECT_CATEGORIES = [
  'embedded',
  'power-systems',
  'digital-design',
  'pcb',
  'firmware',
  'web',
  'other'
] as const;
```

## 📖 Documentation

- [API Reference](./docs/API.md) - Detailed API documentation
- [Component Guide](./docs/COMPONENTS.md) - Component usage and examples

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Format code
npm run format
```

## 🧪 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: CSS Animations + Tailwind
- **API**: GitHub REST API
- **Deployment**: Vercel (recommended)

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💡 Inspiration

Inspired by the beauty of printed circuit boards and the creativity of electrical engineering students worldwide.

---

Built with ⚡ by EE students, for EE students.
