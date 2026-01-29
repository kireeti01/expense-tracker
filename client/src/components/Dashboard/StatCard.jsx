import React from 'react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import './StatCard.css'

const StatCard = ({ title, value, icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'stat-primary',
    success: 'stat-success',
    error: 'stat-error',
    warning: 'stat-warning',
    info: 'stat-info'
  }

  return (
    <div className={`stat-card ${colorClasses[color]}`}>
      <div className="stat-header">
        <div className="stat-icon">
          {icon}
        </div>
        <div className={`trend-indicator ${trend}`}>
          {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{trendValue}</span>
        </div>
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  )
}

export default StatCard