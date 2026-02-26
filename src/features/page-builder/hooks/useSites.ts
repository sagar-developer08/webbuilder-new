import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { sitesApi, Site, SiteListItem } from '../api/sites.api'

const SITES_KEY = ['sites'] as const

/** Fetch all sites for the current user */
export function useSites() {
  return useQuery<SiteListItem[], Error>({
    queryKey: SITES_KEY,
    queryFn: sitesApi.list,
  })
}

/** Fetch a single site by id */
export function useSite(id: string | null) {
  return useQuery<Site, Error>({
    queryKey: [...SITES_KEY, id],
    queryFn: () => sitesApi.get(id!),
    enabled: !!id,
  })
}

/** Create a new site */
export function useCreateSite() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: { title: string; subdomain: string }) => sitesApi.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: SITES_KEY }),
  })
}

/** Save (update) a site */
export function useSaveSite() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      ...payload
    }: {
      id: string
      title?: string
      content?: string
      pages?: Array<{ id: string; slug: string; title?: string; content?: string }>
      previewImage?: string
      favicon?: string
      visible?: boolean
    }) => sitesApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: SITES_KEY }),
  })
}

/** Delete a site */
export function useDeleteSite() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => sitesApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: SITES_KEY }),
  })
}
