import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 12)
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  })

  console.log(`Created demo user: ${user.email} (id: ${user.id})`)

  // Create a sample site
  const site = await prisma.page.upsert({
    where: { subdomain: 'demo-site' },
    update: {},
    create: {
      title: 'My Demo Site',
      subdomain: 'demo-site',
      userId: user.id,
      visible: false,
      content: JSON.stringify({
        root: {
          props: { title: 'My Demo Site' },
          children: [],
        },
      }),
    },
  })

  console.log(`Created demo site: ${site.title} (subdomain: ${site.subdomain})`)
  console.log('\nSeed complete!')
  console.log('Demo credentials: email=demo@example.com, password=demo123')
}

main()
  .catch(e => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
