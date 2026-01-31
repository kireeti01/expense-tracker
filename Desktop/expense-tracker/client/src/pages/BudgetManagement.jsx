import React, { useState } from 'react';
import { useExpense } from '../contexts/ExpenseContext.jsx';
import { motion } from 'framer-motion';

function BudgetManagement() {
  const { categories, budgets, setBudget, transactions } = useExpense();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSetBudget = () => {
    if (selectedCategory && amount) {
      setBudget(selectedCategory, parseFloat(amount));
      setSelectedCategory('');
      setAmount('');
    }
  };

  const getSpent = (category) => {
    return transactions.filter(t => t.type === 'expense' && t.category === category).reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2>Budget Management</h2>
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <label>Select Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Choose Category</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Budget Amount (₹)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button onClick={handleSetBudget} className="btn">Set Budget</button>
      </div>
      <div className="card">
        <h3>Budgets & Progress</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {budgets.map(b => {
            const spent = getSpent(b.category);
            const progress = (spent / b.amount) * 100;
            return (
              <li key={b.category} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{b.category}</span>
                  <span>₹{spent.toLocaleString()} / ₹{b.amount.toLocaleString()}</span>
                </div>
                <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.2)', borderRadius: '5px', marginTop: '5px' }}>
                  <div style={{ width: `${Math.min(progress, 100)}%`, height: '100%', background: progress > 100 ? '#ff5252' : '#4caf50', borderRadius: '5px' }}></div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}

export default BudgetManagement;