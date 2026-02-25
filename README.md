# React Template

A production-ready React project template with modern tooling and feature-based architecture.

## 📚 Quick Start Guide

**New to the project?** Start here:

1. **Read the [Feature Creation Guide](./FEATURE_CREATION_GUIDE.md)** - Complete step-by-step guide to create features in less than an hour
2. **Follow the setup instructions** below
3. **Use AI prompt templates** from the guide to generate code quickly

The Feature Creation Guide includes:
- ✅ Complete setup instructions
- ✅ Step-by-step feature creation workflow
- ✅ AI prompt templates for quick code generation
- ✅ Common patterns and examples
- ✅ Troubleshooting guide
- ✅ Best practices

**Perfect for developers of all levels - from freshers to experienced developers!**

## 🚀 Features

- ⚡ **Vite** - Lightning-fast build tool and dev server
- ⚛️ **React 18** - Latest React with TypeScript
- 🎨 **SCSS** - Modular SCSS architecture with variables and utilities
- 🔁 **TanStack Query** - Powerful data synchronization for React
- 🧩 **ShadCN UI** - Beautiful, accessible component library
- 📦 **TypeScript** - Full type safety
- 🎯 **Path Aliases** - Clean imports with `@/` prefix
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📁 **Feature-Based Architecture** - Scalable project structure
- ✅ **Code Quality** - ESLint + Prettier configured

## 📁 Project Structure

```
src/
├── app/                          # App bootstrap layer
│   ├── App.tsx                   # Root component
│   ├── main.tsx                  # Application entry point
│   ├── providers.tsx             # QueryClientProvider, ThemeProvider
│   └── routes.tsx                 # Route definitions
│
├── features/                     # Domain modules (core architecture)
│   ├── auth/                     # Authentication feature
│   │   ├── api/                  # API functions and query keys
│   │   ├── hooks/                # Custom hooks
│   │   ├── components/           # Feature components
│   │   ├── pages/                # Page components
│   │   ├── types.ts              # TypeScript types
│   │   └── index.ts              # Public API
│   └── dashboard/                # Dashboard feature
│
├── shared/                       # Cross-feature reusable layer
│   ├── components/               # Pure reusable components
│   ├── hooks/                    # useDebounce, useToggle
│   ├── utils/                    # formatDate, helpers
│   ├── constants/                # Shared constants
│   ├── types/                    # Common types
│   ├── lib/                      # Library utilities
│   └── services/                 # HTTP service, interceptors
│
├── ui/                           # ShadCN UI components
│   ├── button.tsx
│   ├── card.tsx
│   └── ...
│
├── styles/                       # Global SCSS architecture
│   ├── abstracts/                # variables, mixins
│   ├── base/                     # reset, typography
│   ├── layout/                   # grid, containers
│   ├── themes/                   # light/dark themes
│   └── main.scss                 # Main stylesheet
│
└── config/                       # Environment config, feature flags
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ (see `.nvmrc`)
- npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## ⚙️ Configuration

### Global Configurations

This project has **stable global configurations** that should not be modified without review:

- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.cjs` - Linting rules
- `.prettierrc.json` - Code formatting
- `tailwind.config.js` - Tailwind CSS configuration
- `components.json` - ShadCN UI configuration

**⚠️ Important**: These configurations are stable and should not be modified without review and approval.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Main API Configuration
VITE_API_URL=http://localhost:3001/api

# Mock API Configuration (for JSONPlaceholder)
VITE_MOCK_API_URL=https://jsonplaceholder.typicode.com

# Application Environment
VITE_APP_ENV=development

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_MOCK_API=false
```

**Note**: See `.env.example` (if available) or create `.env` manually with the above template.

## 🏗️ Architecture

This project follows a **feature-based architecture** where:

- **Features** are self-contained modules with their own API, hooks, components, and pages
- **Shared** code is used across multiple features
- **App** layer handles bootstrap and providers
- **UI** components are from ShadCN UI

See [FEATURE_CREATION_GUIDE.md](./FEATURE_CREATION_GUIDE.md) for detailed architecture documentation and step-by-step feature creation guide.

## 🎨 Styling

### SCSS Architecture

The project uses a modular SCSS architecture:

- **Abstracts** (`abstracts/`) - Variables, mixins, functions
- **Base** (`base/`) - Reset, typography
- **Layout** (`layout/`) - Grid, containers
- **Themes** (`themes/`) - Light/dark theme styles

### Using SCSS

```scss
// In your component SCSS file
@use '../../../styles/abstracts/variables' as *;

.my-component {
  padding: $spacing-md;
  color: $primary-color;
  
  &__element {
    margin-top: $spacing-sm;
  }
}
```

## 🔁 TanStack Query

API calls are organized by feature:

```typescript
// features/auth/api/auth.api.ts
export const authApi = {
  login: async (credentials: LoginCredentials) => { ... }
}

// features/auth/hooks/useLogin.ts
export function useLogin() {
  return useMutation({
    mutationFn: authApi.login,
    ...
  })
}
```

## 🧩 ShadCN UI Components

ShadCN UI components are in `src/ui/`. To add more components:

```bash
npx shadcn@latest add [component-name]
```

## 📦 Path Aliases

Import paths use the `@/` prefix:

```typescript
import { Button } from '@/ui/button'
import { useLogin } from '@/features/auth'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { formatDate } from '@/shared/utils/formatDate'
import { config } from '@/config'
```

## 🏗️ Building for Production

The production build is optimized with:
- Code splitting
- Tree shaking
- Minification
- Source maps

## 📄 License

MIT
