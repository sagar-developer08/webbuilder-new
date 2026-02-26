import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/auth.api'
import { LoginCredentials, LoginResponse } from '../types'
import { STORAGE_KEYS } from '@/shared/constants'

/**
 * Hook for user login
 * Stores JWT token on success. Does NOT redirect — the caller handles navigation.
 */
export function useLogin() {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user))
    },
    onError: (error) => {
      console.error('Login failed:', error)
    },
  })
}

