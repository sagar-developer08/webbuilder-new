import { useQuery } from '@tanstack/react-query'
import { postsApi } from '../api/posts.api'
import { postsKeys } from '../api/posts.keys'
import { Post } from '../types'

/**
 * Hook to fetch a single post by ID
 */
export function usePost(id: number) {
  return useQuery<Post, Error>({
    queryKey: postsKeys.detail(id),
    queryFn: () => postsApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

