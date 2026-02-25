import { HeroSection } from '../components/HeroSection'
import { FeaturesSection } from '../components/FeaturesSection'
import { ArchitectureSection } from '../components/ArchitectureSection'
import styles from './LandingPage.module.scss'

export function LandingPage() {
  return (
    <div className={styles.landingPage}>
      <HeroSection />
      <FeaturesSection />
      <ArchitectureSection />
    </div>
  )
}

