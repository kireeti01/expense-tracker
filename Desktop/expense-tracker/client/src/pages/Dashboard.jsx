import React from 'react';
import { Link } from 'react-router-dom';
import { useExpense } from '../contexts/ExpenseContext.jsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

function Dashboard() {
  const { transactions } = useExpense();

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const recentTransactions = transactions.slice(-5).reverse();

  // Chart data: Category-wise expenses
  const categoryData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
  const chartData = Object.entries(categoryData).map(([category, amount]) => ({ category, amount }));

  const pieData = chartData.map((entry, index) => ({ ...entry, fill: ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c'][index % 4] }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
        <div className="card">
          <h3>Total Income</h3>
          <p>₹{totalIncome.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Total Expenses</h3>
          <p>₹{totalExpenses.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Balance</h3>
          <p>₹{balance.toLocaleString()}</p>
        </div>
      </div>
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3>Recent Transactions</h3>
        <ul>
          {recentTransactions.map(t => (
            <li key={t.id}>{t.description} - ₹{t.amount} ({t.date})</li>
          ))}
        </ul>
        <Link to="/transactions" className="btn">View All</Link>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <div className="card">
          <h3>Expenses by Category</h3>
          <BarChart width={350} height={200} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="card">
          <h3>Expense Breakdown</h3>
          <PieChart width={350} height={200}>
            <Pie data={pieData} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80} />
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;