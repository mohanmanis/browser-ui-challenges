import { useState } from 'react'
import './FormWithValidation.css'

/**
 * FormWithValidation Component
 * 
 * Demonstrates form validation logic within a tab.
 * Includes various validation rules and error handling.
 */
export default function FormWithValidation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // Validation rules
  const validateField = (name, value) => {
    let error = ''

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required'
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters'
        }
        break

      case 'email':
        if (!value.trim()) {
          error = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format'
        }
        break

      case 'age':
        if (!value.trim()) {
          error = 'Age is required'
        } else {
          const ageNum = parseInt(value, 10)
          if (isNaN(ageNum) || ageNum < 18 || ageNum > 120) {
            error = 'Age must be between 18 and 120'
          }
        }
        break

      case 'password':
        if (!value) {
          error = 'Password is required'
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters'
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'Password must contain uppercase, lowercase, and number'
        }
        break

      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password'
        } else if (value !== formData.password) {
          error = 'Passwords do not match'
        }
        break

      default:
        break
    }

    return error
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouched(allTouched)

    // Validate all fields
    const newErrors = {}
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key])
      if (error) {
        newErrors[key] = error
      }
    })

    setErrors(newErrors)

    // Check if form is valid
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true)
      console.log('Form submitted:', formData)
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          age: '',
          password: '',
          confirmPassword: '',
        })
        setTouched({})
        setErrors({})
        setSubmitted(false)
      }, 3000)
    }
  }

  return (
    <div className="form-validation">
      <h2>Form Validation Example</h2>
      <p className="form-description">
        This form demonstrates validation logic with real-time error messages.
        Fields are validated on blur and on submit.
      </p>

      {submitted && (
        <div className="form-success" role="alert">
          ✓ Form submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="validation-form" noValidate>
        <div className="form-group">
          <label htmlFor="name">
            Name <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name ? 'input-error' : ''}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && touched.name && (
            <span id="name-error" className="error-message" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.email ? 'input-error' : ''}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && touched.email && (
            <span id="email-error" className="error-message" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="age">
            Age <span className="required">*</span>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.age ? 'input-error' : ''}
            aria-invalid={!!errors.age}
            aria-describedby={errors.age ? 'age-error' : undefined}
          />
          {errors.age && touched.age && (
            <span id="age-error" className="error-message" role="alert">
              {errors.age}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password ? 'input-error' : ''}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && touched.password && (
            <span id="password-error" className="error-message" role="alert">
              {errors.password}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">
            Confirm Password <span className="required">*</span>
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.confirmPassword ? 'input-error' : ''}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <span id="confirmPassword-error" className="error-message" role="alert">
              {errors.confirmPassword}
            </span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Submit Form
        </button>
      </form>
    </div>
  )
}
