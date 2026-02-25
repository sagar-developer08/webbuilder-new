import { useQuery } from '@tanstack/react-query'
import { postsApi } from '../api/posts.api'
import { postsKeys } from '../api/posts.keys'
import { Post } from '../types'

/**
 * Hook to fetch all posts
 */
export function usePosts() {
  return useQuery<Post[], Error>({
    queryKey: postsKeys.lists(),
    queryFn: postsApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

