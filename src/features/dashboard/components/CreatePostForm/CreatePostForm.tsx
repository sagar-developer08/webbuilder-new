import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/ui/button'
import { FormField } from '@/shared/components/FormField'
import { useCreatePost } from '../../hooks/useCreatePost'
import { createPostSchema, type CreatePostFormData } from '../../schemas/post.schema'
import styles from './CreatePostForm.module.scss'

interface CreatePostFormProps {
  onSuccess?: () => void
  userId?: number
}

/**
 * Form component for creating a new post
 * Uses React Hook Form + Zod for validation
 */
export function CreatePostForm({ onSuccess, userId = 1 }: CreatePostFormProps) {
  const createPost = useCreatePost()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      body: '',
      userId,
    },
  })

  const onSubmit = (data: CreatePostFormData) => {
    createPost.mutate(data, {
      onSuccess: () => {
        reset()
        onSuccess?.()
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormField
        {...register('title')}
        type="text"
        label="Title"
        placeholder="Enter post title"
        error={errors.title?.message}
      />

      <FormField
        {...register('body')}
        isTextarea
        label="Content"
        placeholder="Enter post content"
        rows={4}
        error={errors.body?.message}
      />

      {createPost.isError && (
        <div className={styles.error}>
          {createPost.error?.message || 'Failed to create post'}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || createPost.isPending}
        className={styles.submitButton}
      >
        {isSubmitting || createPost.isPending ? 'Creating...' : 'Create Post'}
      </Button>
    </form>
  )
}
