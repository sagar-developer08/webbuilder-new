import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postsApi } from '../api/posts.api'
import { postsKeys } from '../api/posts.keys'
import { Post, UpdatePostDto } from '../types'

/**
 * Hook to update a post (PUT - full update)
 */
export function useUpdatePost() {
  const queryClient = useQueryClient()

  return useMutation<Post, Error, { id: number; data: Post }>({
    mutationFn: ({ id, data }) => postsApi.update(id, data),
    onSuccess: (data) => {
      // Update the specific post in cache
      queryClient.setQueryData(postsKeys.detail(data.id), data)
      // Invalidate posts list
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() })
    },
  })
}

/**
 * Hook to partially update a post (PATCH - partial update)
 */
export function usePatchPost() {
  const queryClient = useQueryClient()

  return useMutation<Post, Error, { id: number; data: UpdatePostDto }>({
    mutationFn: ({ id, data }) => postsApi.patch(id, data),
    onSuccess: (data) => {
      // Update the specific post in cache
      queryClient.setQueryData(postsKeys.detail(data.id), data)
      // Invalidate posts list
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() })
    },
  })
}

