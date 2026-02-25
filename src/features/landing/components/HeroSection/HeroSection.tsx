import { Button } from '@/ui/button'
import { ROUTES } from '@/app/routes'
import { useNavigate } from 'react-router-dom'
import styles from './HeroSection.module.scss'

export function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>React Template</h1>
        <p className={styles.subtitle}>
          Production-ready template with Vite, React, TypeScript, SCSS, TanStack Query, and ShadCN UI
        </p>
        <p className={styles.description}>
          A modern, scalable React application template following feature-based architecture.
          Built with best practices and ready for production use.
        </p>
        <div className={styles.actions}>
          <Button
            size="lg"
            onClick={() => navigate(ROUTES.LOGIN)}
            className={styles.primaryButton}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={styles.secondaryButton}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}

