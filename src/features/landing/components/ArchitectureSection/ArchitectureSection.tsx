import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import styles from './ArchitectureSection.module.scss'

const architecturePoints = [
  {
    title: 'app/',
    description: 'Bootstrap layer - Application entry point, providers, and routing',
  },
  {
    title: 'features/',
    description: 'Domain modules - Self-contained feature modules with API, hooks, components, and pages',
  },
  {
    title: 'shared/',
    description: 'Cross-feature utilities - Reusable components, hooks, utils, and services',
  },
  {
    title: 'ui/',
    description: 'ShadCN UI components - Generated UI components library',
  },
  {
    title: 'styles/',
    description: 'Global SCSS architecture - Variables, base styles, layouts, and themes',
  },
  {
    title: 'config/',
    description: 'Configuration - Environment variables and feature flags',
  },
]

export function ArchitectureSection() {
  return (
    <section className={styles.architecture}>
      <div className={styles.container}>
        <h2 className={styles.title}>Project Structure</h2>
        <p className={styles.subtitle}>
          This project follows a feature-based architecture for scalability and maintainability
        </p>
        <div className={styles.grid}>
          {architecturePoints.map((point, index) => (
            <Card key={index} className={styles.card}>
              <CardHeader>
                <CardTitle className={styles.cardTitle}>
                  <code>{point.title}</code>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className={styles.cardDescription}>
                  {point.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

