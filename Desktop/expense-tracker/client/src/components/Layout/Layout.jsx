import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { motion } from 'framer-motion';

function Layout({ children }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-container">
      <header className="card" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Expense Tracker</h1>
        <nav>
          <Link to="/dashboard" className="btn" style={{ margin: '0 10px' }}>Dashboard</Link>
          <Link to="/transactions" className="btn" style={{ margin: '0 10px' }}>Transactions</Link>
          <Link to="/categories" className="btn" style={{ margin: '0 10px' }}>Categories</Link>
          <Link to="/budgets" className="btn" style={{ margin: '0 10px' }}>Budgets</Link>
          <Link to="/reports" className="btn" style={{ margin: '0 10px' }}>Reports</Link>
          <Link to="/profile" className="btn" style={{ margin: '0 10px' }}>Profile</Link>
          <button onClick={handleLogout} className="btn" style={{ margin: '0 10px' }}>Logout</button>
        </nav>
      </header>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </div>
  );
}

export default Layout;