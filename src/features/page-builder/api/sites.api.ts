import { httpClient } from '@/shared/services/http'

export interface Site {
  id: string
  title: string
  subdomain: string
  content: string | null
  pages: Array<{ id: string; slug: string; title?: string; content?: string }> | null
  previewImage: string | null
  favicon: string | null
  visible: boolean
  createdAt: string
  updatedAt: string
}

export interface SiteListItem {
  id: string
  title: string
  subdomain: string
  previewImage: string | null
  visible: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Sites API — calls real backend at /api/sites/*
 */
export const sitesApi = {
  /** List all sites for the authenticated user */
  list: async (): Promise<SiteListItem[]> => {
    const { data } = await httpClient.get('/sites')
    return data.sites
  },

  /** Get a single site with full content */
  get: async (id: string): Promise<Site> => {
    const { data } = await httpClient.get(`/sites/${id}`)
    return data.site
  },

  /** Create a new site */
  create: async (payload: { title: string; subdomain: string }): Promise<Site> => {
    const { data } = await httpClient.post('/sites', payload)
    return data.site
  },

  /** Update a site (partial update) */
  update: async (
    id: string,
    payload: {
      title?: string
      content?: string
      pages?: Array<{ id: string; slug: string; title?: string; content?: string }>
      previewImage?: string
      favicon?: string
      visible?: boolean
      subdomain?: string
    }
  ): Promise<Site> => {
    const { data } = await httpClient.put(`/sites/${id}`, payload)
    return data.site
  },

  /** Delete a site */
  delete: async (id: string): Promise<void> => {
    await httpClient.delete(`/sites/${id}`)
  },
}
