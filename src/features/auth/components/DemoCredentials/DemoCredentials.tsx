import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/card'
import { DEMO_CREDENTIALS } from '../../api/auth.api'
import styles from './DemoCredentials.module.scss'

/**
 * Component to display demo credentials
 */
export function DemoCredentials() {
  return (
    <Card className={styles.demoCard}>
      <CardHeader>
        <CardTitle className={styles.title}>Demo Credentials</CardTitle>
        <CardDescription>
          Use these credentials to login to the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={styles.credentials}>
          <div className={styles.credentialItem}>
            <span className={styles.label}>Email:</span>
            <code className={styles.value}>{DEMO_CREDENTIALS.email}</code>
          </div>
          <div className={styles.credentialItem}>
            <span className={styles.label}>Password:</span>
            <code className={styles.value}>{DEMO_CREDENTIALS.password}</code>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

