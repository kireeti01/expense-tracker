import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react'
import './Register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  
  const { register } = useAuth()
  const navigate = useNavigate()

  const checkPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (passwordStrength < 2) {
      newErrors.password = 'Password is too weak'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value))
    }
    
    if (serverError) setServerError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    setServerError('')
    
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const userData = {
      name: formData.name.trim(),
      email: formData.email,
      password: formData.password
    }
    
    const success = register(userData)
    
    if (success) {
      navigate('/dashboard')
    } else {
      setServerError('Registration failed. Please try again.')
    }
    
    setLoading(false)
  }

  const getStrengthColor = (strength) => {
    if (strength === 0) return 'transparent'
    if (strength === 1) return '#ef4444'
    if (strength === 2) return '#f59e0b'
    if (strength === 3) return '#10b981'
    if (strength === 4) return '#3b82f6'
  }

  const getStrengthText = (strength) => {
    if (strength === 0) return 'Enter a password'
    if (strength === 1) return 'Very Weak'
    if (strength === 2) return 'Weak'
    if (strength === 3) return 'Good'
    if (strength === 4) return 'Strong'
  }

  const passwordRequirements = [
    { id: 1, text: 'At least 8 characters', met: formData.password.length >= 8 },
    { id: 2, text: 'Contains uppercase letter', met: /[A-Z]/.test(formData.password) },
    { id: 3, text: 'Contains number', met: /[0-9]/.test(formData.password) },
    { id: 4, text: 'Contains special character', met: /[^A-Za-z0-9]/.test(formData.password) },
  ]

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="logo">
            <div className="logo-icon">
              <CheckCircle size={32} />
            </div>
            <h1>Create Account</h1>
          </div>
          <p className="subtitle">Join us to start tracking your expenses</p>
        </div>

        {serverError && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label className="form-label">
              <User size={18} className="form-icon" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`form-input ${errors.name ? 'error' : ''}`}
              required
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Mail size={18} className="form-icon" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={18} className="form-icon" />
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              required
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
            
            {formData.password && (
              <div className="password-strength">
                <div className="strength-meter">
                  {[1, 2, 3, 4].map(level => (
                    <div
                      key={level}
                      className="strength-bar"
                      style={{
                        backgroundColor: passwordStrength >= level 
                          ? getStrengthColor(passwordStrength) 
                          : 'var(--border-color)'
                      }}
                    />
                  ))}
                </div>
                <span className="strength-text" style={{ color: getStrengthColor(passwordStrength) }}>
                  {getStrengthText(passwordStrength)}
                </span>
              </div>
            )}

            <div className="password-requirements">
              {passwordRequirements.map(req => (
                <div key={req.id} className="requirement">
                  <div className={`requirement-icon ${req.met ? 'met' : ''}`}>
                    {req.met ? <CheckCircle size={14} /> : '○'}
                  </div>
                  <span className={`requirement-text ${req.met ? 'met' : ''}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock size={18} className="form-icon" />
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              required
            />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>

          <div className="terms-agreement">
            <label className="checkbox">
              <input type="checkbox" required />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="terms-link">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="terms-link">
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      <div className="register-illustration">
        <div className="illustration-content">
          <h2>Start Your Financial Journey</h2>
          <p className="illustration-text">
            Join thousands of users who are taking control of their finances with our intuitive expense tracker.
          </p>
          <div className="benefits">
            <div className="benefit">
              <div className="benefit-icon">📈</div>
              <div>
                <h3>Visual Insights</h3>
                <p>Understand your spending patterns with beautiful charts</p>
              </div>
            </div>
            <div className="benefit">
              <div className="benefit-icon">🎯</div>
              <div>
                <h3>Smart Budgeting</h3>
                <p>Set and track budgets for different categories</p>
              </div>
            </div>
            <div className="benefit">
              <div className="benefit-icon">📱</div>
              <div>
                <h3>Cross-Platform</h3>
                <p>Access your data anywhere, on any device</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register