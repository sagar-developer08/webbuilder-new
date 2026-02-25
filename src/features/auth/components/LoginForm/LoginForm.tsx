import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/ui/button'
import { FormField } from '@/shared/components/FormField'
import { useLogin } from '../../hooks/useLogin'
import { loginSchema, type LoginFormData } from '../../schemas/login.schema'
import styles from './LoginForm.module.scss'

export function LoginForm() {
  const loginMutation = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
      <FormField
        {...register('email')}
        type="email"
        label="Email"
        placeholder="Enter your email"
        error={errors.email?.message}
      />

      <FormField
        {...register('password')}
        type="password"
        label="Password"
        placeholder="Enter your password"
        error={errors.password?.message}
      />

      {loginMutation.isError && (
        <div className={styles.error}>
          {loginMutation.error?.message || 'Login failed'}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || loginMutation.isPending}
        className={styles.submitButton}
      >
        {isSubmitting || loginMutation.isPending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}
