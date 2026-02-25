import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/utils'
import styles from './FormField.module.scss'

interface BaseFormFieldProps {
  label: string
  error?: string
}

interface FormFieldInputProps
  extends BaseFormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  isTextarea?: false
}

interface FormFieldTextareaProps
  extends BaseFormFieldProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  isTextarea: true
}

type FormFieldProps = FormFieldInputProps | FormFieldTextareaProps

/**
 * Reusable form field component with error handling
 * Works seamlessly with React Hook Form
 */
export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>(({ label, error, className, isTextarea, ...props }, ref) => {
  const fieldId = props.id || props.name || `field-${Math.random().toString(36).substring(7)}`

  if (isTextarea) {
    const textareaProps = props as FormFieldTextareaProps
    return (
      <div className={styles.formGroup}>
        <label htmlFor={fieldId} className={styles.label}>
          {label}
        </label>
        <textarea
          {...(textareaProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          id={fieldId}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={cn(styles.input, styles.textarea, error && styles.error, className)}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
        />
        {error && (
          <span id={`${fieldId}-error`} className={styles.errorMessage} role="alert">
            {error}
          </span>
        )}
      </div>
    )
  }

  const inputProps = props as FormFieldInputProps
  return (
    <div className={styles.formGroup}>
      <label htmlFor={fieldId} className={styles.label}>
        {label}
      </label>
      <input
        {...(inputProps as InputHTMLAttributes<HTMLInputElement>)}
        id={fieldId}
        ref={ref as React.Ref<HTMLInputElement>}
        className={cn(styles.input, error && styles.error, className)}
        aria-invalid={!!error}
        aria-describedby={error ? `${fieldId}-error` : undefined}
      />
      {error && (
        <span id={`${fieldId}-error`} className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  )
})

FormField.displayName = 'FormField'
