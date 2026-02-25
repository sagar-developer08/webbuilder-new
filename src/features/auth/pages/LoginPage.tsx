import { LoginForm } from '../components/LoginForm'
import { DemoCredentials } from '../components/DemoCredentials'
import styles from './LoginPage.module.scss'

export function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Please sign in to your account</p>
        <LoginForm />
        <DemoCredentials />
      </div>
    </div>
  )
}
