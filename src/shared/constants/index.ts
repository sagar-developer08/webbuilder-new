/**
 * Shared constants
 */

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  POSTS: {
    LIST: '/posts',
    DETAIL: (id: number) => `/posts/${id}`,
    CREATE: '/posts',
    UPDATE: (id: number) => `/posts/${id}`,
    PATCH: (id: number) => `/posts/${id}`,
    DELETE: (id: number) => `/posts/${id}`,
  },
} as const

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
} as const

export const QUERY_KEYS = {
  AUTH: {
    ME: ['auth', 'me'] as const,
  },
} as const

