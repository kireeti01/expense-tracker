import React from 'react'
import { useExpense } from '../contexts/ExpenseContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  TrendingUp, 
  TrendingDown, 
  IndianRupee,
  PieChart as PieChartIcon
} from 'lucide-react'
import StatCard from '../components/Dashboard/StatCard'
import RecentTransactions from '../components/Dashboard/RecentTransactions'
import BudgetProgress from '../components/Dashboard/BudgetProgress'
import { formatCurrency } from '../utils/helpers'
import './Dashboard.css'

const Dashboard = () => {
  const { getTotals, getRecentTransactions, getCategoryTotals, budgets } = useExpense()
  const { user } = useAuth()
  
  const totals = getTotals()
  const recentTransactions = getRecentTransactions()
  const categoryTotals = getCategoryTotals()
  
  const monthlyBudget = budgets.find(b => b.categoryId === 'all')
  const budgetProgress = monthlyBudget ? (monthlyBudget.spent / monthlyBudget.limit) * 100 : 0

  const currency = user?.currency || 'INR'

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user?.name}!</h1>
          <p className="subtitle">Here's your financial overview for January 2024</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Balance"
          value={formatCurrency(totals.balance, currency)}
          icon={<IndianRupee size={24} />}
          trend={totals.balance > 0 ? 'up' : 'down'}
          trendValue={`${((totals.balance / totals.income) * 100).toFixed(1)}%`}
          color="primary"
        />
        <StatCard
          title="Total Income"
          value={formatCurrency(totals.income, currency)}
          icon={<TrendingUp size={24} />}
          trend="up"
          trendValue="This month"
          color="success"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(totals.expenses, currency)}
          icon={<TrendingDown size={24} />}
          trend="down"
          trendValue="From budget"
          color="error"
        />
        <StatCard
          title="Budget Used"
          value={`${budgetProgress.toFixed(1)}%`}
          icon={<PieChartIcon size={24} />}
          trend={budgetProgress > 90 ? 'up' : 'down'}
          trendValue={budgetProgress > 90 ? 'High' : 'Good'}
          color="warning"
        />
      </div>

      {/* Recent Transactions and Budget Progress */}
      <div className="dashboard-bottom">
        <RecentTransactions transactions={recentTransactions} />
        <BudgetProgress budgets={budgets.filter(b => b.categoryId !== 'all')} />
      </div>

      {/* Category Summary */}
      <div className="category-summary">
        <h3>Expense by Category</h3>
        <div className="categories-list">
          {categoryTotals.map((category, index) => (
            <div key={index} className="category-item">
              <div className="category-info">
                <div 
                  className="category-color" 
                  style={{ backgroundColor: '#4CAF50' }}
                />
                <span className="category-name">{category.name}</span>
              </div>
              <span className="category-amount">{formatCurrency(category.total, currency)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard