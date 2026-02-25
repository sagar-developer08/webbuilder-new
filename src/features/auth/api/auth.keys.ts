/**
 * TanStack Query keys for auth feature
 */

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
  user: (id: string) => [...authKeys.all, 'user', id] as const,
} as const

