import { httpClient } from '@/shared/services/http'
import { LoginCredentials, LoginResponse, User } from '../types'

/**
 * Demo credentials (shown in login form for convenience)
 */
export const DEMO_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'demo123',
} as const

/**
 * Auth API functions — calls real backend at /api/auth/*
 */
export const authApi = {
  /**
   * Login user via backend
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await httpClient.post('/auth/login', credentials)
    return {
      user: { ...data.user, role: 'user' },
      token: data.token,
      refreshToken: '',
    }
  },

  /**
   * Register a new user via backend
   */
  register: async (credentials: LoginCredentials & { name?: string }): Promise<LoginResponse> => {
    const { data } = await httpClient.post('/auth/register', credentials)
    return {
      user: { ...data.user, role: 'user' },
      token: data.token,
      refreshToken: '',
    }
  },

  /**
   * Get current user from backend
   */
  getMe: async (): Promise<User> => {
    const { data } = await httpClient.get('/auth/me')
    return { ...data.user, role: 'user' }
  },

  /**
   * Logout user (clears local storage)
   */
  logout: async (): Promise<void> => {
    // No backend logout endpoint needed — just clear tokens client-side
  },
}
