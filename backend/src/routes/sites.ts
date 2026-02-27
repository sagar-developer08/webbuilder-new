import { Router } from 'express'
import { z } from 'zod'
import { prisma } from '../lib/prisma.js'
import { logInfo } from '../lib/logger.js'

const router = Router()

const createSiteSchema = z.object({
  title: z.string().min(1).max(100),
  subdomain: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Subdomain must be lowercase alphanumeric with hyphens'),
})

const updateSiteSchema = createSiteSchema.partial().extend({
  previewImage: z.string().optional(),
  favicon: z.string().optional(),
  content: z.string().optional(),
  visible: z.boolean().optional(),
  pages: z.any().optional(), // Prisma handles strict JSON validation, but we can refine if needed
})


router.get('/', async (req, res) => {
  const sites = await prisma.page.findMany({
    orderBy: { updatedAt: 'desc' },
  })
  logInfo('sites_list', 'Listed sites', { count: sites.length })
  res.json({ success: true, sites })
})

router.post('/', async (req, res) => {
  try {
    // Make schema optional for fields, or provide defaults
    // The previous schema required title and subdomain. We should allow content here too.
    const createSchemaFull = createSiteSchema.extend({
      content: z.string().optional(),
    })

    const { title, subdomain, content } = createSchemaFull.parse(req.body)

    const existing = await prisma.page.findFirst({ where: { subdomain } })
    if (existing) {
      return res.status(400).json({ success: false, msg: 'Subdomain is already in use' })
    }

    const site = await prisma.page.create({
      data: {
        title,
        subdomain,
        content: content || null,
      },
    })
    logInfo('sites_create', 'Created site', { siteId: site.id, title, subdomain })
    res.status(201).json({ success: true, site })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ success: false, msg: e.errors[0]?.message })
    }
    throw e
  }
})

router.get('/:id', async (req, res) => {
  const site = await prisma.page.findFirst({
    where: { id: req.params.id },
  })
  if (!site) return res.status(404).json({ success: false, msg: 'Site not found' })
  logInfo('sites_get', 'Fetched site', { siteId: site.id })
  res.json({ success: true, site })
})

router.put('/:id', async (req, res) => {
  try {
    const site = await prisma.page.findFirst({
      where: { id: req.params.id },
    })
    if (!site) return res.status(404).json({ success: false, msg: 'Site not found' })

    const { title, subdomain, previewImage, favicon, content, visible, pages } =
      updateSiteSchema.parse(req.body)

    if (subdomain && subdomain !== site.subdomain) {
      const existing = await prisma.page.findFirst({ where: { subdomain } })
      if (existing) {
        return res.status(400).json({ success: false, msg: 'Subdomain is already in use' })
      }
    }

    const updated = await prisma.page.update({
      where: { id: req.params.id },
      data: {
        ...(title != null && { title }),
        ...(subdomain != null && { subdomain }),
        ...(previewImage != null && { previewImage }),
        ...(favicon != null && { favicon }),
        ...(content != null && { content }),
        ...(visible != null && { visible }),
        ...(pages != null && { pages }),
      },
    })
    logInfo('sites_update', 'Updated site', { siteId: updated.id })
    res.json({ success: true, site: updated })
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({ success: false, msg: e.errors[0]?.message })
    }
    throw e
  }
})

router.delete('/:id', async (req, res) => {
  const site = await prisma.page.findFirst({
    where: { id: req.params.id },
  })
  if (!site) return res.status(404).json({ success: false, msg: 'Site not found' })

  await prisma.page.delete({ where: { id: req.params.id } })
  logInfo('sites_delete', 'Deleted site', { siteId: req.params.id })
  res.json({ success: true })
})

export { router as siteRoutes }
