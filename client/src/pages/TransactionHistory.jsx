import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useExpense } from '../contexts/ExpenseContext.jsx';
import { motion } from 'framer-motion';

function TransactionHistory() {
  const { transactions, deleteTransaction } = useExpense();
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');

  let filteredTransactions = transactions.filter(t =>
    !filter || t.category.toLowerCase().includes(filter.toLowerCase())
  );

  filteredTransactions.sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'amount') return b.amount - a.amount;
    return 0;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2>Transaction History</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Filter by category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: '10px', borderRadius: '10px', border: 'none' }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ padding: '10px', borderRadius: '10px', border: 'none' }}
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
        <Link to="/add-transaction" className="btn" style={{ textDecoration: 'none' }}>
          Add Transaction
        </Link>
      </div>
      <div className="card">
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTransactions.map(t => (
            <li
              key={t.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <div>
                <strong>{t.description}</strong> - {t.category} - ₹{t.amount} ({t.date})
              </div>
              <div>
                <Link
                  to={`/edit-transaction/${t.id}`}
                  className="btn"
                  style={{ marginRight: '10px', textDecoration: 'none' }}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteTransaction(t.id)}
                  className="btn"
                  style={{ background: '#ff5252', textDecoration: 'none' }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default TransactionHistory;
