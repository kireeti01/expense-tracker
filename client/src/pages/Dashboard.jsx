import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const COLORS = {
  Food: '#4dabf7',
  Transport: '#63e6be',
  Shopping: '#b197fc',
  Bills: '#ff8787',
  Entertainment: '#ffa94d',
};

const chartData = [
  { name: 'Food', value: 4000 },
  { name: 'Transport', value: 2500 },
  { name: 'Shopping', value: 3000 },
  { name: 'Bills', value: 2000 },
  { name: 'Entertainment', value: 1500 },
];

const transactions = [
  {
    id: 1,
    title: 'Groceries',
    category: 'Food',
    amount: 1200,
    date: '2026-01-28',
  },
  {
    id: 2,
    title: 'Bus Pass',
    category: 'Transport',
    amount: 500,
    date: '2026-01-27',
  },
  {
    id: 3,
    title: 'Netflix',
    category: 'Entertainment',
    amount: 799,
    date: '2026-01-26',
  },
  {
    id: 4,
    title: 'Electricity Bill',
    category: 'Bills',
    amount: 2200,
    date: '2026-01-25',
  },
];

const Dashboard = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1d1e22',
        padding: '2rem',
        color: '#d4d4dc',
      }}
    >
      <h1 style={{ marginBottom: '2rem', color: '#feda6a' }}>
        Dashboard
      </h1>

      {/* 🔹 Recent Transactions */}
      <div
        style={{
          backgroundColor: '#393f4d',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          marginBottom: '2.5rem',
        }}
      >
        <h3 style={{ color: '#feda6a', marginBottom: '1rem' }}>
          Recent Transactions
        </h3>

        <div style={{ maxHeight: '260px', overflowY: 'auto' }}>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.8rem 0',
                borderBottom: '1px solid #4f5565',
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{tx.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#9aa0b4' }}>
                  {tx.date}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span
                  style={{
                    backgroundColor: COLORS[tx.category],
                    color: '#1d1e22',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    marginRight: '12px',
                  }}
                >
                  {tx.category}
                </span>

                <span style={{ fontWeight: 700 }}>
                  ₹{tx.amount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 View All Button */}
        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <Link
            to="/transactions"
            style={{
              backgroundColor: '#feda6a',
              color: '#1d1e22',
              padding: '10px 18px',
              borderRadius: '12px',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            View All
          </Link>
        </div>
      </div>

      {/* 🔹 Charts Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}
      >
        {/* Bar Chart */}
        <div
          style={{
            backgroundColor: '#393f4d',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          }}
        >
          <h3 style={{ color: '#feda6a', marginBottom: '1rem' }}>
            Expenses by Category
          </h3>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#d4d4dc" />
              <YAxis stroke="#d4d4dc" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1d1e22',
                  borderRadius: '10px',
                  border: 'none',
                }}
                labelStyle={{ color: '#ffffff' }}
                itemStyle={{ color: '#ffffff' }}
              />
              <Bar dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[entry.name]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div
          style={{
            backgroundColor: '#393f4d',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          }}
        >
          <h3 style={{ color: '#feda6a', marginBottom: '1rem' }}>
            Expense Breakdown
          </h3>

          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={95}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[entry.name]} />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor: '#1d1e22',
                  borderRadius: '10px',
                  border: 'none',
                }}
                labelStyle={{ color: '#ffffff' }}
                itemStyle={{ color: '#ffffff' }}
              />

              <Legend
                formatter={(value) => (
                  <span style={{ color: '#d4d4dc' }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
