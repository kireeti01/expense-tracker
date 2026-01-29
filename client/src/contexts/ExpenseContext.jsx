import React, { createContext, useContext, useState } from 'react'

const ExpenseContext = createContext()

export const useExpense = () => useContext(ExpenseContext)

const initialTransactions = [
  { id: '1', amount: 450.5, category: 'Food & Dining', date: '2024-01-15', type: 'expense', description: 'Lunch' },
  { id: '2', amount: 2875.75, category: 'Transportation', date: '2024-01-14', type: 'expense', description: 'Fuel' },
  { id: '3', amount: 120000, category: 'Salary', date: '2024-01-10', type: 'income', description: 'Salary' },
]

const initialBudgets = [
  { id: '1', categoryId: 'Food & Dining', limit: 15000, spent: 1950.5 },
  { id: '2', categoryId: 'Transportation', limit: 10000, spent: 2875.75 },
  { id: '3', categoryId: 'all', limit: 50000, spent: 13324.25 },
]

export const ExpenseProvider = ({ children }) => {
  const [transactions] = useState(initialTransactions)
  const [budgets] = useState(initialBudgets)

  const getTotals = () => {
    let income = 0
    let expenses = 0

    transactions.forEach(t => {
      t.type === 'income' ? (income += t.amount) : (expenses += t.amount)
    })

    return {
      income,
      expenses,
      balance: income - expenses
    }
  }

  const getRecentTransactions = () => {
    return transactions.slice(0, 5)
  }

  const getCategoryTotals = () => {
    const map = {}

    transactions.forEach(t => {
      if (t.type === 'expense') {
        map[t.category] = (map[t.category] || 0) + t.amount
      }
    })

    return Object.keys(map).map(key => ({
      name: key,
      total: map[key]
    }))
  }

  return (
    <ExpenseContext.Provider
      value={{
        transactions,
        budgets,
        getTotals,
        getRecentTransactions,
        getCategoryTotals
      }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}
