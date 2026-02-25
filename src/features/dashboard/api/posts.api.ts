import axios, { AxiosInstance } from 'axios'
import { config } from '@/config'
import { API_ENDPOINTS } from '@/shared/constants'
import { Post, CreatePostDto, UpdatePostDto } from '../types'

/**
 * Create a separate axios instance for mock API (JSONPlaceholder)
 * This allows using a different base URL than the main API
 */
const createMockApiClient = (): AxiosInstance => {
  return axios.create({
    baseURL: config.mockApiUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  })
}

const mockApiClient = createMockApiClient()

/**
 * Posts API functions
 * Using JSONPlaceholder mock API configured via VITE_MOCK_API_URL
 */
export const postsApi = {
  /**
   * Get all posts
   */
  getAll: async (): Promise<Post[]> => {
    const response = await mockApiClient.get<Post[]>(API_ENDPOINTS.POSTS.LIST)
    return response.data
  },

  /**
   * Get a single post by ID
   */
  getById: async (id: number): Promise<Post> => {
    const response = await mockApiClient.get<Post>(API_ENDPOINTS.POSTS.DETAIL(id))
    return response.data
  },

  /**
   * Create a new post
   */
  create: async (data: CreatePostDto): Promise<Post> => {
    const response = await mockApiClient.post<Post>(API_ENDPOINTS.POSTS.CREATE, data)
    return response.data
  },

  /**
   * Update a post (PUT - full update)
   */
  update: async (id: number, data: Post): Promise<Post> => {
    const response = await mockApiClient.put<Post>(API_ENDPOINTS.POSTS.UPDATE(id), data)
    return response.data
  },

  /**
   * Partially update a post (PATCH - partial update)
   */
  patch: async (id: number, data: UpdatePostDto): Promise<Post> => {
    const response = await mockApiClient.patch<Post>(API_ENDPOINTS.POSTS.PATCH(id), data)
    return response.data
  },

  /**
   * Delete a post
   */
  delete: async (id: number): Promise<void> => {
    await mockApiClient.delete(API_ENDPOINTS.POSTS.DELETE(id))
  },
}

