import React from 'react';
import { useExpense } from '../contexts/ExpenseContext.jsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts';
import { motion } from 'framer-motion';

function Reports() {
  const { transactions } = useExpense();

  // Category-wise expenses
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
  const barData = Object.entries(categoryData).map(([category, amount]) => ({ category, amount }));

  // Monthly expenses (simplified: group by month)
  const monthlyData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const month = new Date(t.date).toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + t.amount;
      return acc;
    }, {});
  const lineData = Object.entries(monthlyData).map(([month, amount]) => ({ month, amount }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2>Reports</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <div className="card">
          <h3>Expenses by Category</h3>
          <BarChart width={350} height={250} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="card">
          <h3>Monthly Expenses</h3>
          <LineChart width={350} height={250} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </motion.div>
  );
}

export default Reports;