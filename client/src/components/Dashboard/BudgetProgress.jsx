import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { formatCurrency } from '../../utils/helpers'
import './BudgetProgress.css'

const BudgetProgress = ({ budgets }) => {
  const { user } = useAuth()
  const currency = user?.currency || 'INR'

  const getCategoryName = (categoryId) => {
    const categories = {
      '1': 'Food & Dining',
      '2': 'Transportation',
      '3': 'Shopping'
    }
    return categories[categoryId] || 'Category'
  }

  const getCategoryColor = (categoryId) => {
    const colors = {
      '1': '#4CAF50',
      '2': '#2196F3',
      '3': '#9C27B0'
    }
    return colors[categoryId] || '#64748b'
  }

  return (
    <div className="budget-progress">
      <h3>Budget Overview</h3>
      <div className="budgets-list">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.limit) * 100
          const isOverBudget = percentage > 100
          
          return (
            <div key={budget.id} className="budget-item">
              <div className="budget-header">
                <span className="budget-category">{getCategoryName(budget.categoryId)}</span>
                <span className="budget-spent">
                  {formatCurrency(budget.spent, currency)} / {formatCurrency(budget.limit, currency)}
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${isOverBudget ? 'over' : ''}`}
                  style={{ 
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: getCategoryColor(budget.categoryId)
                  }}
                />
              </div>
              <div className="budget-footer">
                <span className={`budget-percentage ${isOverBudget ? 'over' : ''}`}>
                  {percentage.toFixed(1)}%
                </span>
                <span className="budget-period">{budget.period}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BudgetProgress