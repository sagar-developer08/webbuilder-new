import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/auth.api'
import { authKeys } from '../api/auth.keys'
import { LoginCredentials, LoginResponse } from '../types'
import { STORAGE_KEYS } from '@/shared/constants'

/**
 * Hook for user login
 */
export function useLogin() {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // Store tokens
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token)
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, data.refreshToken)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user))

      // Redirect to dashboard
      window.location.href = '/dashboard'
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })
}

