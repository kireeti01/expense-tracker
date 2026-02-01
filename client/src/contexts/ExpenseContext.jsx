import React, { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    // Load sample data if not present
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [
      { id: 1, type: 'income', amount: 50000, description: 'Salary', category: 'Salary', date: '2023-10-01' },
      { id: 2, type: 'expense', amount: 2000, description: 'Groceries', category: 'Food', date: '2023-10-02' },
      { id: 3, type: 'expense', amount: 500, description: 'Bus Fare', category: 'Transport', date: '2023-10-03' },
    ];
    const storedCategories = JSON.parse(localStorage.getItem('categories')) || ['Food', 'Transport', 'Entertainment', 'Utilities', 'Health', 'Shopping', 'Salary'];
    const storedBudgets = JSON.parse(localStorage.getItem('budgets')) || [
      { category: 'Food', amount: 5000 },
      { category: 'Transport', amount: 2000 },
    ];

    setTransactions(storedTransactions);
    setCategories(storedCategories);
    setBudgets(storedBudgets);

    localStorage.setItem('transactions', JSON.stringify(storedTransactions));
    localStorage.setItem('categories', JSON.stringify(storedCategories));
    localStorage.setItem('budgets', JSON.stringify(storedBudgets));
  }, []);

  const addTransaction = (transaction) => {
    const newTransactions = [...transactions, { ...transaction, id: Date.now() }];
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const updateTransaction = (id, updatedTransaction) => {
    const newTransactions = transactions.map(t => t.id === id ? { ...t, ...updatedTransaction } : t);
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const deleteTransaction = (id) => {
    const newTransactions = transactions.filter(t => t.id !== id);
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const addCategory = (category) => {
    const newCategories = [...categories, category];
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  const updateCategory = (oldCategory, newCategory) => {
    const newCategories = categories.map(c => c === oldCategory ? newCategory : c);
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  const deleteCategory = (category) => {
    const newCategories = categories.filter(c => c !== category);
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));
  };

  const setBudget = (category, amount) => {
    const newBudgets = budgets.filter(b => b.category !== category).concat({ category, amount });
    setBudgets(newBudgets);
    localStorage.setItem('budgets', JSON.stringify(newBudgets));
  };

  return (
    <ExpenseContext.Provider value={{
      transactions, addTransaction, updateTransaction, deleteTransaction,
      categories, addCategory, updateCategory, deleteCategory,
      budgets, setBudget
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  return useContext(ExpenseContext);
}