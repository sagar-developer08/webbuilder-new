import { Router, Response, Request } from 'express'
import prisma from '../lib/prisma'

const router = Router()

/**
 * GET /api/public/sites/:subdomain
 * Public route — get a published site by subdomain (no auth required)
 */
router.get('/sites/:subdomain', async (req: Request, res: Response): Promise<void> => {
  try {
    const site = await prisma.page.findFirst({
      where: {
        subdomain: req.params.subdomain,
        visible: true,
      },
      select: {
        id: true,
        title: true,
        subdomain: true,
        content: true,
        pages: true,
        favicon: true,
        previewImage: true,
      },
    })

    if (!site) {
      res.status(404).json({ error: 'Site not found' })
      return
    }

    const responseData = {
      ...site,
      pages: site.pages ?? null,
    }

    res.json({ site: responseData })
  } catch (error) {
    console.error('Public get site error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
