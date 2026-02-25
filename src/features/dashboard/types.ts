/**
 * Dashboard feature types
 */

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface CreatePostDto {
  title: string
  body: string
  userId: number
}

export interface UpdatePostDto {
  title?: string
  body?: string
}

export interface PostsResponse {
  data: Post[]
  total: number
}

