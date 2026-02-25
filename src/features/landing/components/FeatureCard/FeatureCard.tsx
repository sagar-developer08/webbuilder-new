import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { Feature } from '../../types'
import styles from './FeatureCard.module.scss'

interface FeatureCardProps {
  feature: Feature
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card className={styles.featureCard}>
      <CardHeader>
        <div className={styles.icon}>{feature.icon}</div>
        <CardTitle className={styles.title}>{feature.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className={styles.description}>
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

