import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postsApi } from '../api/posts.api'
import { postsKeys } from '../api/posts.keys'

/**
 * Hook to delete a post
 */
export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation<void, Error, number>({
    mutationFn: postsApi.delete,
    onSuccess: (_, deletedId) => {
      // Remove the post from cache
      queryClient.removeQueries({ queryKey: postsKeys.detail(deletedId) })
      // Invalidate posts list
      queryClient.invalidateQueries({ queryKey: postsKeys.lists() })
    },
  })
}

