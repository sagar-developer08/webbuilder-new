import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

/**
 * Route definitions and navigation utilities
 * 
 * ⚠️ IMPORTANT: This is a global routing configuration.
 * Changes affect application navigation and should be reviewed.
 * 
 * Performance: Using lazy loading for code splitting
 */

// Lazy load pages for code splitting
const LandingPage = lazy(() =>
  import('@/features/landing/pages/LandingPage').then((m) => ({
    default: m.LandingPage,
  }))
)
const LoginPage = lazy(() =>
  import('@/features/auth/pages/LoginPage').then((m) => ({
    default: m.LoginPage,
  }))
)
const DashboardPage = lazy(() =>
  import('@/features/dashboard/pages/DashboardPage').then((m) => ({
    default: m.DashboardPage,
  }))
)

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
} as const

export type Route = typeof ROUTES[keyof typeof ROUTES]

/**
 * Application router configuration
 * Uses lazy loading for optimal bundle splitting
 */
export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <LandingPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardPage />,
  },
])
