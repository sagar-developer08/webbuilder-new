import { Router, Response } from 'express'
import { z } from 'zod'
import prisma from '../lib/prisma'
import { authenticateToken, AuthRequest } from '../middleware/auth'

const router = Router()

// All sites routes require authentication
router.use(authenticateToken)

// --------------- Validation Schemas ---------------

const createSiteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  subdomain: z
    .string()
    .min(1, 'Subdomain is required')
    .max(63, 'Subdomain must be 63 characters or less')
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      'Subdomain must be lowercase alphanumeric with hyphens only'
    ),
})

const updateSiteSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  content: z.string().optional(),
  pages: z
    .array(
      z.object({
        id: z.string(),
        slug: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
      })
    )
    .optional(),
  previewImage: z.string().optional(),
  favicon: z.string().optional(),
  visible: z.boolean().optional(),
  subdomain: z
    .string()
    .min(1)
    .max(63)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    .optional(),
})

// --------------- Routes ---------------

/**
 * POST /api/sites
 * Create a new website
 */
router.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const parsed = createSiteSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0]?.message || 'Validation failed' })
      return
    }

    const { title, subdomain } = parsed.data

    // Check subdomain uniqueness
    const existing = await prisma.page.findFirst({
      where: { subdomain },
    })

    if (existing) {
      res.status(409).json({ error: 'Subdomain is already taken' })
      return
    }

    // Create site
    const site = await prisma.page.create({
      data: {
        title,
        subdomain,
        userId: req.userId!,
      },
    })

    console.log(`[sites_create] User ${req.userId} created site ${site.id}`)

    res.status(201).json({ site })
  } catch (error) {
    console.error('Create site error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * GET /api/sites
 * List all websites belonging to the authenticated user
 */
router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const sites = await prisma.page.findMany({
      where: { userId: req.userId },
      select: {
        id: true,
        title: true,
        subdomain: true,
        previewImage: true,
        visible: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    })

    res.json({ sites })
  } catch (error) {
    console.error('List sites error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * GET /api/sites/:id
 * Get a single website with full content
 */
router.get('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const site = await prisma.page.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    })

    if (!site) {
      res.status(404).json({ error: 'Site not found' })
      return
    }

    // Parse pages JSON if present
    const parsed = {
      ...site,
      pages: site.pages ?? null,
    }

    res.json({ site: parsed })
  } catch (error) {
    console.error('Get site error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * PUT /api/sites/:id
 * Update a website (partial update)
 */
router.put('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Verify ownership
    const existing = await prisma.page.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    })

    if (!existing) {
      res.status(404).json({ error: 'Site not found' })
      return
    }

    // Validate input
    const parsed = updateSiteSchema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0]?.message || 'Validation failed' })
      return
    }

    const { title, content, pages, previewImage, favicon, visible, subdomain } = parsed.data

    // If subdomain is being changed, check uniqueness
    if (subdomain && subdomain !== existing.subdomain) {
      const subdomainTaken = await prisma.page.findFirst({
        where: { subdomain },
      })
      if (subdomainTaken) {
        res.status(409).json({ error: 'Subdomain is already taken' })
        return
      }
    }

    // Build update data — only include provided fields
    const updateData: Record<string, unknown> = {}
    if (title !== undefined) updateData.title = title
    if (content !== undefined) updateData.content = content
    if (pages !== undefined) updateData.pages = pages
    if (previewImage !== undefined) updateData.previewImage = previewImage
    if (favicon !== undefined) updateData.favicon = favicon
    if (visible !== undefined) updateData.visible = visible
    if (subdomain !== undefined) updateData.subdomain = subdomain

    const site = await prisma.page.update({
      where: { id: req.params.id },
      data: updateData,
    })

    console.log(`[sites_update] User ${req.userId} updated site ${site.id}`)

    // Parse pages for response
    const responseData = {
      ...site,
      pages: site.pages ?? null,
    }

    res.json({ site: responseData })
  } catch (error) {
    console.error('Update site error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * DELETE /api/sites/:id
 * Delete a website
 */
router.delete('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Verify ownership
    const existing = await prisma.page.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    })

    if (!existing) {
      res.status(404).json({ error: 'Site not found' })
      return
    }

    await prisma.page.delete({
      where: { id: req.params.id },
    })

    console.log(`[sites_delete] User ${req.userId} deleted site ${existing.id}`)

    res.json({ message: 'Site deleted successfully' })
  } catch (error) {
    console.error('Delete site error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

/**
 * GET /api/sites/by-subdomain/:subdomain
 * Public route — get a published site by subdomain (no auth required)
 * Note: This is mounted separately to allow unauthenticated access
 */

export default router
