import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postsApi } from '../api/posts.api'
import { postsKeys } from '../api/posts.keys'
import { Post, CreatePostDto } from '../types'

/**
 * Hook to create a new post
 */
export function useCreatePost() {
  const queryClient = useQueryClient()

  return useMutation<Post, Error, CreatePostDto>({
    mutationFn: postsApi.create,
    onSuccess: () => {
      // Invalidate and refetch posts list
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() })
    },
  })
}

