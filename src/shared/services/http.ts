import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { config } from '@/config'

/**
 * Create axios instance with base configuration
 */
const createHttpClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: config.apiUrl,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
    // Allow cross-origin requests for JSONPlaceholder
    withCredentials: false,
  })

  return client
}

export const httpClient = createHttpClient()

/**
 * Request interceptor
 */
httpClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * Response interceptor
 */
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

/**
 * API error response
 */
export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}

