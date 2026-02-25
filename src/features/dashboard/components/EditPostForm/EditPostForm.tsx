import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/ui/button'
import { FormField } from '@/shared/components/FormField'
import { usePatchPost } from '../../hooks/useUpdatePost'
import { updatePostSchema, type UpdatePostFormData } from '../../schemas/post.schema'
import { Post } from '../../types'
import styles from './EditPostForm.module.scss'

interface EditPostFormProps {
  post: Post
  onSuccess?: () => void
  onCancel?: () => void
}

/**
 * Form component for editing a post (using PATCH)
 * Uses React Hook Form + Zod for validation
 */
export function EditPostForm({ post, onSuccess, onCancel }: EditPostFormProps) {
  const patchPost = usePatchPost()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePostFormData>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  })

  useEffect(() => {
    reset({
      title: post.title,
      body: post.body,
    })
  }, [post, reset])

  const onSubmit = (data: UpdatePostFormData) => {
    patchPost.mutate(
      { id: post.id, data },
      {
        onSuccess: () => {
          onSuccess?.()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormField
        {...register('title')}
        type="text"
        label="Title"
        error={errors.title?.message}
      />

      <FormField
        {...register('body')}
        isTextarea
        label="Content"
        rows={4}
        error={errors.body?.message}
      />

      {patchPost.isError && (
        <div className={styles.error}>
          {patchPost.error?.message || 'Failed to update post'}
        </div>
      )}

      <div className={styles.actions}>
        <Button type="submit" disabled={isSubmitting || patchPost.isPending}>
          {isSubmitting || patchPost.isPending ? 'Updating...' : 'Update Post'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
