import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Lock, AlertCircle, LogIn } from 'lucide-react'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
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
    if (authError) setAuthError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    setAuthError('')
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const success = login(formData.email, formData.password)
    
    if (success) {
      navigate('/dashboard')
    } else {
      setAuthError('Invalid email or password')
    }
    
    setLoading(false)
  }

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@example.com',
      password: 'demopass123'
    })
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <div className="logo-icon">
              <LogIn size={32} />
            </div>
            <h1>Expense Tracker</h1>
          </div>
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to your account to continue</p>
        </div>

        {authError && (
          <div className="alert alert-error">
            <AlertCircle size={18} />
            <span>{authError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
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
              placeholder="Enter your password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              required
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="form-options">
            <label className="checkbox">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="demo-login">
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleDemoLogin}
            >
              Use Demo Account
            </button>
          </div>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="register-link">
              Sign up now
            </Link>
          </p>
        </div>
      </div>

      <div className="login-illustration">
        <div className="illustration-content">
          <h2>Track Your Expenses Effortlessly</h2>
          <p className="illustration-text">
            Manage your finances, set budgets, and get insights into your spending habits all in one place.
          </p>
          <div className="features">
            <div className="feature">
              <div className="feature-icon">💰</div>
              <span>Smart Budgeting</span>
            </div>
            <div className="feature">
              <div className="feature-icon">📊</div>
              <span>Detailed Reports</span>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login