import { FeatureCard } from '../FeatureCard'
import { features } from '../../constants'
import styles from './FeaturesSection.module.scss'

export function FeaturesSection() {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <h2 className={styles.title}>Features</h2>
        <p className={styles.subtitle}>
          Everything you need to build modern React applications
        </p>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

