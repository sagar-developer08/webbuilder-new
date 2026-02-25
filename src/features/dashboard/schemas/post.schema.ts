import { z } from 'zod'

/**
 * Create post validation schema
 */
export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  body: z
    .string()
    .min(1, 'Content is required')
    .min(10, 'Content must be at least 10 characters'),
  userId: z.number().int().positive(),
})

export type CreatePostFormData = z.infer<typeof createPostSchema>

/**
 * Update post validation schema (partial)
 */
export const updatePostSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters')
    .optional(),
  body: z
    .string()
    .min(10, 'Content must be at least 10 characters')
    .optional(),
})

export type UpdatePostFormData = z.infer<typeof updatePostSchema>

/**
 * Full update post schema (for PUT requests)
 */
export const fullUpdatePostSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  body: z
    .string()
    .min(1, 'Content is required')
    .min(10, 'Content must be at least 10 characters'),
})

export type FullUpdatePostFormData = z.infer<typeof fullUpdatePostSchema>

