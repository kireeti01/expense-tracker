import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpense } from '../contexts/ExpenseContext.jsx';
import { motion } from 'framer-motion';

function AddTransaction() {
  const [form, setForm] = useState({ type: 'expense', amount: '', description: '', category: '', date: '' });
  const { addTransaction, categories } = useExpense();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({ ...form, amount: parseFloat(form.amount) });
    navigate('/transactions');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2>Add Transaction</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Type</label>
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{ textDecoration: 'none' }} // Removes underline from button text
          >
            Add Transaction
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default AddTransaction;
