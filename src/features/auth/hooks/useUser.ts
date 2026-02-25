import { useQuery } from '@tanstack/react-query'
import { authApi } from '../api/auth.api'
import { authKeys } from '../api/auth.keys'
import { User } from '../types'
import { STORAGE_KEYS } from '@/shared/constants'

/**
 * Hook to get current authenticated user
 */
export function useUser() {
  const storedUser = localStorage.getItem(STORAGE_KEYS.USER)
  const initialUser = storedUser ? JSON.parse(storedUser) : null

  return useQuery<User, Error>({
    queryKey: authKeys.me(),
    queryFn: authApi.getMe,
    enabled: !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
    initialData: initialUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

