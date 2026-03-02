import { LoginCredentials, LoginResponse, User } from '../types'

/**
 * Demo credentials for login
 */
export const DEMO_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'demo123',
} as const

/**
 * Auth API functions
 * Using demo credentials - no actual API calls
 */

export const authApi = {
  /**
   * Login user (demo - no API call)
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Validate against demo credentials
    if (
      credentials.email === DEMO_CREDENTIALS.email &&
      credentials.password === DEMO_CREDENTIALS.password
    ) {
      const user: User = {
        id: '1',
        email: credentials.email,
        name: 'Demo User',
        role: 'user',
      }

      return {
        user,
        token: 'demo-token-' + Date.now(),
        refreshToken: 'demo-refresh-token-' + Date.now(),
      }
    }

    throw new Error('Invalid email or password. Please use demo credentials.')
  },

  /**
   * Get current user (demo - returns stored user)
   */
  getMe: async (): Promise<User> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      return JSON.parse(storedUser)
    }

    throw new Error('User not found')
  },

  /**
   * Logout user (demo - clears storage)
   */
  logout: async (): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))
    // Storage is cleared in the hook
  },

  /**
   * Refresh token (demo - generates new token)
   */
  refreshToken: async (_refreshToken: string): Promise<LoginResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      throw new Error('User not found')
    }

    const user: User = JSON.parse(storedUser)

    return {
      user,
      token: 'demo-token-' + Date.now(),
      refreshToken: 'demo-refresh-token-' + Date.now(),
    }
  },
}
