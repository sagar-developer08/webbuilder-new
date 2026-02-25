# 🚀 Feature Creation Guide - Become a 10x Developer

**Complete Step-by-Step Guide to Create Features in Less Than an Hour**

This guide is designed for developers of all levels - from freshers to experienced developers. Follow these steps precisely, and you'll be able to create production-ready features quickly and efficiently.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Setup](#project-setup)
3. [Understanding the Architecture](#understanding-the-architecture)
4. [Feature Creation Workflow](#feature-creation-workflow)
5. [Step-by-Step Feature Creation](#step-by-step-feature-creation)
6. [AI Prompt Templates](#ai-prompt-templates)
7. [Common Patterns & Examples](#common-patterns--examples)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software

Before you start, ensure you have the following installed:

1. **Node.js** (Version 18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: Open terminal/command prompt and run:
     ```bash
     node --version
     ```
   - Should show: `v18.x.x` or higher

2. **Git** (For cloning the repository)
   - Download from: https://git-scm.com/
   - Verify installation:
     ```bash
     git --version
     ```

3. **Code Editor** (Recommended: VS Code)
   - Download from: https://code.visualstudio.com/
   - Recommended extensions:
     - ESLint
     - Prettier
     - TypeScript and JavaScript Language Features

4. **Terminal/Command Prompt**
   - Windows: PowerShell or Command Prompt
   - Mac/Linux: Terminal

### Required Knowledge

- Basic understanding of JavaScript/TypeScript (you can learn as you go)
- Basic understanding of React (concepts like components, props, state)
- Basic understanding of HTTP requests (GET, POST, PUT, DELETE)

**Don't worry if you're new!** This guide will walk you through everything step by step.

---

## Project Setup

### Step 1: Clone the Repository

1. Open your terminal/command prompt
2. Navigate to where you want to store the project:
   ```bash
   cd Desktop
   # or
   cd Documents
   ```

3. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
   Replace `<repository-url>` with the actual repository URL provided by your team.

4. Navigate into the project folder:
   ```bash
   cd react-template
   ```

### Step 2: Install Dependencies

1. Install all required packages:
   ```bash
   npm install
   ```
   This will take 1-3 minutes. Wait for it to complete.

2. Verify installation:
   ```bash
   npm list --depth=0
   ```
   You should see a list of packages without errors.

### Step 3: Environment Setup

1. Create a `.env` file in the root directory (same level as `package.json`)

2. Copy this template into your `.env` file:
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

3. Update the values according to your project requirements

### Step 4: Start the Development Server

1. Run the development server:
   ```bash
   npm run dev
   ```

2. You should see output like:
   ```
   VITE v6.0.1  ready in 500 ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

3. Open your browser and go to: `http://localhost:5173`

4. You should see the landing page!

**✅ Setup Complete!** You're ready to create features.

---

## Understanding the Architecture

### Project Structure Overview

```
src/
├── app/                    # Application bootstrap (routing, providers)
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Entry point
│   ├── providers.tsx      # React Query, Theme providers
│   └── routes.tsx         # Route definitions
│
├── features/              # ⭐ YOUR FEATURES GO HERE
│   ├── auth/             # Example: Authentication feature
│   ├── dashboard/        # Example: Dashboard feature
│   └── [your-feature]/    # Your new feature
│
├── shared/               # Reusable code across features
│   ├── components/      # Reusable components
│   ├── hooks/           # Reusable hooks
│   ├── utils/           # Utility functions
│   ├── constants/       # Shared constants
│   └── services/        # HTTP service, interceptors
│
├── ui/                   # ShadCN UI components
├── styles/               # Global SCSS styles
└── config/               # Configuration files
```

### Key Concepts

1. **Feature-Based Architecture**: Each feature is self-contained with its own:
   - API functions
   - Hooks (for data fetching)
   - Components
   - Pages
   - Types

2. **Shared Layer**: Code used by multiple features goes in `shared/`

3. **Path Aliases**: Use `@/` prefix for imports:
   - `@/features/auth` → `src/features/auth`
   - `@/shared/components` → `src/shared/components`
   - `@/ui/button` → `src/ui/button`

---

## Feature Creation Workflow

### The 7-Step Process

1. **Plan** - Understand what you're building
2. **Create Feature Folder** - Set up the structure
3. **Define Types** - TypeScript interfaces
4. **Create API Functions** - Data fetching logic
5. **Create Hooks** - React Query hooks
6. **Create Components** - UI components
7. **Create Page & Route** - Connect everything

**Time Estimate**: 30-60 minutes for a complete feature

---

## Step-by-Step Feature Creation

Let's create a **"Products"** feature as an example. You'll follow the same steps for any feature.

### Step 1: Plan Your Feature

**Before coding, answer these questions:**

1. **What is the feature name?**
   - Example: `products`

2. **What data do you need?**
   - Example: Product with `id`, `name`, `price`, `description`

3. **What API endpoints do you need?**
   - Example: `GET /products`, `POST /products`, `PUT /products/:id`, `DELETE /products/:id`

4. **What pages/components do you need?**
   - Example: Products list page, Create product form, Edit product form

5. **What routes do you need?**
   - Example: `/products` (list), `/products/new` (create), `/products/:id/edit` (edit)

**Write this down before proceeding!**

---

### Step 2: Create Feature Folder Structure

1. Navigate to `src/features/` folder

2. Create a new folder with your feature name (use lowercase, kebab-case):
   ```bash
   mkdir products
   ```

3. Create the following subfolders:
   ```bash
   cd products
   mkdir api
   mkdir hooks
   mkdir components
   mkdir pages
   mkdir schemas
   ```

4. Your structure should look like:
   ```
   src/features/products/
   ├── api/
   ├── hooks/
   ├── components/
   ├── pages/
   ├── schemas/
   ├── types.ts
   └── index.ts
   ```

---

### Step 3: Define Types (`types.ts`)

1. Create `types.ts` in `src/features/products/`

2. Define your data types:

```typescript
/**
 * Products feature types
 */

export interface Product {
  id: number
  name: string
  price: number
  description: string
  category?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateProductDto {
  name: string
  price: number
  description: string
  category?: string
}

export interface UpdateProductDto {
  name?: string
  price?: number
  description?: string
  category?: string
}
```

**Key Points:**
- `Product` = Full product data (what you get from API)
- `CreateProductDto` = Data needed to create (no `id`)
- `UpdateProductDto` = Partial data for updates (all fields optional)

---

### Step 4: Add API Endpoints to Constants

1. Open `src/shared/constants/index.ts`

2. Add your endpoints to `API_ENDPOINTS`:

```typescript
export const API_ENDPOINTS = {
  // ... existing endpoints ...
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: number) => `/products/${id}`,
    CREATE: '/products',
    UPDATE: (id: number) => `/products/${id}`,
    PATCH: (id: number) => `/products/${id}`,
    DELETE: (id: number) => `/products/${id}`,
  },
} as const
```

3. Add query keys:

```typescript
export const QUERY_KEYS = {
  // ... existing keys ...
  PRODUCTS: {
    ALL: ['products'] as const,
    DETAIL: (id: number) => ['products', id] as const,
  },
} as const
```

---

### Step 5: Create API Functions (`api/products.api.ts`)

1. Create `api/products.api.ts`

2. Copy this template and customize:

```typescript
import { httpClient, ApiResponse } from '@/shared/services/http'
import { config } from '@/config'
import { API_ENDPOINTS } from '@/shared/constants'
import { Product, CreateProductDto, UpdateProductDto } from '../types'

/**
 * Products API functions
 */
export const productsApi = {
  /**
   * Get all products
   */
  getAll: async (): Promise<Product[]> => {
    const response = await httpClient.get<Product[]>(API_ENDPOINTS.PRODUCTS.LIST)
    return response.data
  },

  /**
   * Get a single product by ID
   */
  getById: async (id: number): Promise<Product> => {
    const response = await httpClient.get<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id))
    return response.data
  },

  /**
   * Create a new product
   */
  create: async (data: CreateProductDto): Promise<Product> => {
    const response = await httpClient.post<Product>(API_ENDPOINTS.PRODUCTS.CREATE, data)
    return response.data
  },

  /**
   * Update a product (PUT - full update)
   */
  update: async (id: number, data: Product): Promise<Product> => {
    const response = await httpClient.put<Product>(API_ENDPOINTS.PRODUCTS.UPDATE(id), data)
    return response.data
  },

  /**
   * Partially update a product (PATCH - partial update)
   */
  patch: async (id: number, data: UpdateProductDto): Promise<Product> => {
    const response = await httpClient.patch<Product>(API_ENDPOINTS.PRODUCTS.PATCH(id), data)
    return response.data
  },

  /**
   * Delete a product
   */
  delete: async (id: number): Promise<void> => {
    await httpClient.delete(API_ENDPOINTS.PRODUCTS.DELETE(id))
  },
}
```

**Key Points:**
- Use `httpClient` from `@/shared/services/http`
- Use `API_ENDPOINTS` constants
- Return typed responses

---

### Step 6: Create Query Keys (`api/products.keys.ts`)

1. Create `api/products.keys.ts`

2. Add query keys:

```typescript
import { QUERY_KEYS } from '@/shared/constants'

/**
 * Products query keys
 */
export const productsKeys = {
  all: QUERY_KEYS.PRODUCTS.ALL,
  lists: () => [...productsKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...productsKeys.lists(), filters] as const,
  details: () => [...productsKeys.all, 'detail'] as const,
  detail: (id: number) => [...productsKeys.details(), id] as const,
}
```

---

### Step 7: Create Hooks

#### 7a. Create `hooks/useProducts.ts` (List)

```typescript
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/products.api'
import { productsKeys } from '../api/products.keys'

/**
 * Hook to fetch all products
 */
export function useProducts() {
  return useQuery({
    queryKey: productsKeys.lists(),
    queryFn: productsApi.getAll,
  })
}
```

#### 7b. Create `hooks/useProduct.ts` (Single)

```typescript
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/products.api'
import { productsKeys } from '../api/products.keys'

/**
 * Hook to fetch a single product by ID
 */
export function useProduct(id: number) {
  return useQuery({
    queryKey: productsKeys.detail(id),
    queryFn: () => productsApi.getById(id),
    enabled: !!id, // Only fetch if id exists
  })
}
```

#### 7c. Create `hooks/useCreateProduct.ts` (Create)

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../api/products.api'
import { productsKeys } from '../api/products.keys'
import { CreateProductDto } from '../types'

/**
 * Hook to create a new product
 */
export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() })
    },
  })
}
```

#### 7d. Create `hooks/useUpdateProduct.ts` (Update)

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../api/products.api'
import { productsKeys } from '../api/products.keys'
import { Product, UpdateProductDto } from '../types'

/**
 * Hook to update a product
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProductDto }) =>
      productsApi.patch(id, data),
    onSuccess: (_, variables) => {
      // Invalidate both list and detail queries
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() })
      queryClient.invalidateQueries({ queryKey: productsKeys.detail(variables.id) })
    },
  })
}
```

#### 7e. Create `hooks/useDeleteProduct.ts` (Delete)

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../api/products.api'
import { productsKeys } from '../api/products.keys'

/**
 * Hook to delete a product
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      // Invalidate products list
      queryClient.invalidateQueries({ queryKey: productsKeys.lists() })
    },
  })
}
```

---

### Step 8: Create Validation Schema (`schemas/product.schema.ts`)

1. Create `schemas/product.schema.ts`

2. Add Zod validation:

```typescript
import { z } from 'zod'

/**
 * Product validation schemas
 */
export const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  price: z.number().min(0, 'Price must be positive'),
  description: z.string().min(1, 'Description is required').max(500, 'Description is too long'),
  category: z.string().optional(),
})

export const updateProductSchema = createProductSchema.partial()

export type CreateProductFormData = z.infer<typeof createProductSchema>
export type UpdateProductFormData = z.infer<typeof updateProductSchema>
```

---

### Step 9: Create Components

#### 9a. Create Component Folder Structure

For each component, create its own folder:

```bash
mkdir components/ProductCard
mkdir components/ProductsTable
mkdir components/CreateProductForm
mkdir components/EditProductForm
```

Each component folder should have:
- `ComponentName.tsx` - Component file
- `ComponentName.module.scss` - Styles
- `index.ts` - Export file

#### 9b. Example: ProductCard Component

**`components/ProductCard/ProductCard.tsx`:**

```typescript
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'
import { Product } from '../../types'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
  isDeleting?: boolean
}

export function ProductCard({ product, onEdit, onDelete, isDeleting }: ProductCardProps) {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>${product.price.toFixed(2)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className={styles.description}>{product.description}</p>
        {product.category && (
          <span className={styles.category}>{product.category}</span>
        )}
        <div className={styles.actions}>
          <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(product.id)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

**`components/ProductCard/ProductCard.module.scss`:**

```scss
@use '../../../../styles/abstracts/variables' as *;

.card {
  margin-bottom: $spacing-md;
}

.description {
  color: hsl(var(--muted-foreground));
  margin-bottom: $spacing-sm;
}

.category {
  display: inline-block;
  padding: $spacing-xs $spacing-sm;
  background: hsl(var(--muted));
  border-radius: $radius-sm;
  font-size: 0.875rem;
  margin-bottom: $spacing-sm;
}

.actions {
  display: flex;
  gap: $spacing-xs;
  margin-top: $spacing-md;
}
```

**`components/ProductCard/index.ts`:**

```typescript
export { ProductCard } from './ProductCard'
```

#### 9c. Create Form Components

Follow the same pattern for `CreateProductForm` and `EditProductForm`. See the dashboard feature (`src/features/dashboard/components/CreatePostForm`) for a complete example.

---

### Step 10: Create Page Component

1. Create `pages/ProductsPage.tsx`:

```typescript
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Button } from '@/ui/button'
import { useProducts } from '../hooks/useProducts'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { Product } from '../types'
import { ProductsTable } from '../components/ProductsTable'
import { CreateProductForm } from '../components/CreateProductForm'
import { EditProductForm } from '../components/EditProductForm'
import styles from './ProductsPage.module.scss'

export function ProductsPage() {
  const { data: products = [], isLoading, error } = useProducts()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const deleteProduct = useDeleteProduct()

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setShowCreateForm(false)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct.mutate(id)
    }
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error loading products: {error.message}</p>
      </div>
    )
  }

  return (
    <div className={styles.productsPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Products</h1>
            <CardDescription>Manage your products</CardDescription>
          </div>
          {!showCreateForm && !editingProduct && (
            <Button onClick={() => setShowCreateForm(true)}>Create New Product</Button>
          )}
        </header>

        <div className={styles.content}>
          {showCreateForm && (
            <Card className={styles.formCard}>
              <CardHeader>
                <CardTitle>Create New Product</CardTitle>
              </CardHeader>
              <CardContent>
                <CreateProductForm onSuccess={() => setShowCreateForm(false)} />
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          )}

          {editingProduct && (
            <Card className={styles.formCard}>
              <CardHeader>
                <CardTitle>Edit Product</CardTitle>
              </CardHeader>
              <CardContent>
                <EditProductForm
                  product={editingProduct}
                  onSuccess={() => setEditingProduct(null)}
                  onCancel={() => setEditingProduct(null)}
                />
              </CardContent>
            </Card>
          )}

          <Card className={styles.productsCard}>
            <CardHeader>
              <CardTitle>Products ({products.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductsTable
                products={products}
                onEdit={handleEdit}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
```

2. Create `pages/ProductsPage.module.scss` (similar to DashboardPage styles)

---

### Step 11: Create Feature Index (`index.ts`)

Create `index.ts` in `src/features/products/`:

```typescript
/**
 * Products feature exports
 * This file serves as the public API for the products feature
 */

export * from './types'
export * from './schemas/product.schema'
export * from './api/products.api'
export * from './api/products.keys'
export * from './hooks/useProducts'
export * from './hooks/useProduct'
export * from './hooks/useCreateProduct'
export * from './hooks/useUpdateProduct'
export * from './hooks/useDeleteProduct'
export * from './components/ProductCard'
export * from './components/ProductsTable'
export * from './components/CreateProductForm'
export * from './components/EditProductForm'
export * from './pages/ProductsPage'
```

---

### Step 12: Add Route

1. Open `src/app/routes.tsx`

2. Add your route to `ROUTES`:

```typescript
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products', // Add this
} as const
```

3. Add lazy import:

```typescript
const ProductsPage = lazy(() =>
  import('@/features/products/pages/ProductsPage').then((m) => ({
    default: m.ProductsPage,
  }))
)
```

4. Add route definition:

```typescript
export const router = createBrowserRouter([
  // ... existing routes ...
  {
    path: ROUTES.PRODUCTS,
    element: <ProductsPage />,
  },
])
```

---

### Step 13: Test Your Feature

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Navigate to your route (e.g., `http://localhost:5173/products`)

3. Test all functionality:
   - ✅ View list
   - ✅ Create new item
   - ✅ Edit item
   - ✅ Delete item

4. Check for errors in the browser console

---

## AI Prompt Templates

Use these AI prompts to generate code quickly. **Copy and paste, then customize with your feature details.**

### Template 1: Complete Feature Generation

```
I need to create a [FEATURE_NAME] feature for a React + TypeScript application following this architecture:

Project Structure:
- Features are in src/features/[feature-name]/
- Each feature has: api/, hooks/, components/, pages/, schemas/, types.ts, index.ts
- Uses TanStack Query for data fetching
- Uses ShadCN UI components
- Uses SCSS modules for styling
- Uses Zod for validation
- Uses path aliases (@/ for src/)

Feature Requirements:
- Feature Name: [FEATURE_NAME]
- Data Model: [Describe your data model - fields, types]
- API Endpoints: [List your endpoints - GET /items, POST /items, etc.]
- Pages Needed: [List pages - List page, Create page, etc.]
- Components Needed: [List components - Table, Form, Card, etc.]

Please generate:
1. types.ts with TypeScript interfaces
2. API functions in api/[feature].api.ts
3. Query keys in api/[feature].keys.ts
4. All necessary hooks (use[Feature], useCreate[Feature], useUpdate[Feature], useDelete[Feature])
5. Validation schema in schemas/[feature].schema.ts
6. All components with SCSS modules
7. Page component
8. index.ts exports
9. Route configuration

Follow the exact patterns from the existing auth and dashboard features. Use the same code style and structure.
```

### Template 2: API Functions Only

```
Generate API functions for [FEATURE_NAME] feature with these endpoints:
- GET /[endpoint] - Get all items
- GET /[endpoint]/:id - Get single item
- POST /[endpoint] - Create item
- PUT /[endpoint]/:id - Update item
- PATCH /[endpoint]/:id - Partial update
- DELETE /[endpoint]/:id - Delete item

Data Model:
[Describe your data model]

Use:
- httpClient from @/shared/services/http
- API_ENDPOINTS from @/shared/constants
- TypeScript types from ../types

Follow the pattern from src/features/dashboard/api/posts.api.ts
```

### Template 3: Hooks Only

```
Generate TanStack Query hooks for [FEATURE_NAME] feature:

1. use[Feature]s() - Query hook to fetch all items
2. use[Feature](id) - Query hook to fetch single item
3. useCreate[Feature]() - Mutation hook to create item
4. useUpdate[Feature]() - Mutation hook to update item
5. useDelete[Feature]() - Mutation hook to delete item

Use:
- productsApi from ../api/[feature].api
- productsKeys from ../api/[feature].keys
- useQuery and useMutation from @tanstack/react-query
- Invalidate queries on mutations

Follow the pattern from src/features/dashboard/hooks/
```

### Template 4: Component Generation

```
Create a [ComponentName] component for [FEATURE_NAME] feature:

Requirements:
- Props: [List props and their types]
- Functionality: [Describe what it does]
- Styling: [Describe styling requirements]
- Uses: ShadCN UI components, SCSS modules

Structure:
- ComponentName.tsx
- ComponentName.module.scss
- index.ts

Follow the pattern from src/features/dashboard/components/[similar-component]/
```

### Template 5: Form Component

```
Create a [Create/Edit][Feature]Form component:

Requirements:
- Fields: [List all form fields]
- Validation: [Validation rules]
- Uses: react-hook-form, zod resolver, ShadCN UI components
- On submit: Calls useCreate[Feature] or useUpdate[Feature] hook
- On success: Calls onSuccess callback

Follow the pattern from src/features/dashboard/components/CreatePostForm/
```

### Template 6: Table Component with Pagination

```
Create a [Feature]sTable component with pagination:

Requirements:
- Display: [List columns to display]
- Actions: Edit, Delete buttons
- Pagination: 10 items per page
- Loading state
- Empty state

Use:
- Table components from @/ui/table
- Pagination from @/shared/components/Pagination
- Follow pattern from src/features/dashboard/components/PostsTable/
```

### Template 7: Complete Page Component

```
Create [Feature]Page component:

Requirements:
- Displays list of items using [Feature]sTable
- Create button that shows Create[Feature]Form
- Edit functionality that shows Edit[Feature]Form
- Delete functionality with confirmation
- Loading and error states
- Uses Card components from ShadCN UI

Follow the pattern from src/features/dashboard/pages/DashboardPage.tsx
```

---

## Common Patterns & Examples

### Pattern 1: CRUD Feature Structure

```
feature-name/
├── api/
│   ├── [feature].api.ts      # API functions
│   └── [feature].keys.ts     # Query keys
├── hooks/
│   ├── use[Feature]s.ts      # List query
│   ├── use[Feature].ts       # Single query
│   ├── useCreate[Feature].ts # Create mutation
│   ├── useUpdate[Feature].ts # Update mutation
│   └── useDelete[Feature].ts # Delete mutation
├── components/
│   ├── [Feature]Card/        # Card component
│   ├── [Feature]sTable/      # Table component
│   ├── Create[Feature]Form/  # Create form
│   └── Edit[Feature]Form/    # Edit form
├── pages/
│   └── [Feature]sPage.tsx    # Main page
├── schemas/
│   └── [feature].schema.ts   # Zod schemas
├── types.ts                   # TypeScript types
└── index.ts                   # Exports
```

### Pattern 2: Import Statements

```typescript
// UI Components
import { Button } from '@/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card'

// Shared
import { useDebounce } from '@/shared/hooks/useDebounce'
import { formatDate } from '@/shared/utils/formatDate'
import { API_ENDPOINTS } from '@/shared/constants'

// Feature
import { useProducts } from '@/features/products'
import { Product } from '@/features/products'

// Styles
import styles from './Component.module.scss'
```

### Pattern 3: Query Hook Pattern

```typescript
import { useQuery } from '@tanstack/react-query'
import { featureApi } from '../api/feature.api'
import { featureKeys } from '../api/feature.keys'

export function useFeatures() {
  return useQuery({
    queryKey: featureKeys.lists(),
    queryFn: featureApi.getAll,
  })
}
```

### Pattern 4: Mutation Hook Pattern

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { featureApi } from '../api/feature.api'
import { featureKeys } from '../api/feature.keys'

export function useCreateFeature() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: featureApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: featureKeys.lists() })
    },
  })
}
```

### Pattern 5: Form Component Pattern

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFeatureSchema } from '../schemas/feature.schema'
import { useCreateFeature } from '../hooks/useCreateFeature'

export function CreateFeatureForm({ onSuccess }: { onSuccess: () => void }) {
  const createFeature = useCreateFeature()
  const form = useForm({
    resolver: zodResolver(createFeatureSchema),
    defaultValues: {
      // ... defaults
    },
  })

  const onSubmit = (data: CreateFeatureFormData) => {
    createFeature.mutate(data, {
      onSuccess: () => {
        form.reset()
        onSuccess()
      },
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

---

## Best Practices

### 1. Naming Conventions

- **Folders**: lowercase, kebab-case (`product-card`)
- **Files**: PascalCase for components (`ProductCard.tsx`), camelCase for utilities (`formatDate.ts`)
- **Types**: PascalCase (`Product`, `CreateProductDto`)
- **Hooks**: camelCase starting with `use` (`useProducts`, `useCreateProduct`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS`, `STORAGE_KEYS`)

### 2. File Organization

- Each component gets its own folder
- Always create `index.ts` for barrel exports
- Keep related files together

### 3. TypeScript

- Always define types in `types.ts`
- Use interfaces for objects
- Use `as const` for constants
- Avoid `any` type

### 4. Styling

- Use SCSS modules (`.module.scss`)
- Import variables: `@use '../../../styles/abstracts/variables' as *;`
- Use BEM-like naming: `.component__element--modifier`

### 5. API Calls

- Always use `httpClient` from `@/shared/services/http`
- Use constants from `API_ENDPOINTS`
- Handle errors properly
- Use TypeScript types for responses

### 6. React Query

- Always invalidate queries after mutations
- Use query keys consistently
- Handle loading and error states
- Use `enabled` option for conditional queries

### 7. Components

- Keep components small and focused
- Use props for data, callbacks for actions
- Handle loading and error states
- Use ShadCN UI components when possible

### 8. Forms

- Use `react-hook-form` for form management
- Use Zod for validation
- Show validation errors
- Disable submit button while submitting

---

## Troubleshooting

### Common Issues and Solutions

#### Issue 1: Module Not Found

**Error**: `Cannot find module '@/features/products'`

**Solution**:
1. Check if `index.ts` exists in the feature folder
2. Check if exports are correct in `index.ts`
3. Restart the dev server: `npm run dev`

#### Issue 2: TypeScript Errors

**Error**: `Property 'name' does not exist on type...`

**Solution**:
1. Check `types.ts` - ensure the property is defined
2. Check if you're using the correct type
3. Run `npm run type-check` to see all errors

#### Issue 3: API Not Working

**Error**: `Network Error` or `404 Not Found`

**Solution**:
1. Check `.env` file - ensure `VITE_API_URL` is correct
2. Check `API_ENDPOINTS` in `src/shared/constants/index.ts`
3. Check browser Network tab for actual request URL
4. Verify API server is running

#### Issue 4: Styling Not Applied

**Error**: Styles not showing

**Solution**:
1. Check if SCSS module is imported: `import styles from './Component.module.scss'`
2. Check if class names match: `className={styles.className}`
3. Check SCSS syntax - ensure `@use` is used, not `@import`

#### Issue 5: Query Not Refreshing

**Error**: Data not updating after mutation

**Solution**:
1. Check if `invalidateQueries` is called in `onSuccess`
2. Check query keys match
3. Check if mutation is successful (check Network tab)

#### Issue 6: Route Not Working

**Error**: Page not found or blank

**Solution**:
1. Check `routes.tsx` - ensure route is added
2. Check lazy import path is correct
3. Check if component is exported from `index.ts`
4. Check browser console for errors

---

## Quick Reference Checklist

Use this checklist when creating a new feature:

- [ ] Created feature folder structure
- [ ] Defined types in `types.ts`
- [ ] Added API endpoints to `src/shared/constants/index.ts`
- [ ] Created API functions in `api/[feature].api.ts`
- [ ] Created query keys in `api/[feature].keys.ts`
- [ ] Created all hooks (use[Feature]s, use[Feature], useCreate, useUpdate, useDelete)
- [ ] Created validation schema in `schemas/[feature].schema.ts`
- [ ] Created all components with SCSS modules
- [ ] Created page component
- [ ] Created `index.ts` with all exports
- [ ] Added route to `src/app/routes.tsx`
- [ ] Tested all functionality
- [ ] Checked for TypeScript errors: `npm run type-check`
- [ ] Checked for linting errors: `npm run lint`
- [ ] Formatted code: `npm run format`

---

## Time-Saving Tips

1. **Use AI Prompts**: Copy the templates above and customize
2. **Copy Existing Features**: Use `auth` or `dashboard` as templates
3. **Component Library**: Use ShadCN UI components - don't build from scratch
4. **Code Snippets**: Save common patterns as snippets in your editor
5. **TypeScript**: Let TypeScript guide you - it will show errors early

---

## Getting Help

If you're stuck:

1. **Check Existing Features**: Look at `auth` or `dashboard` features for examples
2. **Check Documentation**: Read this guide again
3. **Check Console**: Browser console shows errors
4. **Ask AI**: Use the prompt templates with AI tools
5. **Ask Team**: Reach out to your team lead

---

## Final Notes

- **Follow the Architecture**: Don't deviate from the structure
- **Be Consistent**: Use the same patterns across features
- **Test Thoroughly**: Test all CRUD operations
- **Code Quality**: Run `npm run lint` and `npm run format` before committing
- **Documentation**: Add comments for complex logic

**Remember**: The goal is to create features quickly while maintaining code quality. Use AI tools, follow patterns, and don't reinvent the wheel!

---

**Happy Coding! 🚀**

