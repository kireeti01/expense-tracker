import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { motion } from 'framer-motion';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/categories', label: 'Categories' },
  { to: '/budgets', label: 'Budgets' },
  { to: '/reports', label: 'Reports' },
  { to: '/profile', label: 'Profile' },
];

function Layout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    /* FULL SCREEN BACKGROUND */
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#1d1e22', // Dark Slate
        padding: '1.5rem',
        boxSizing: 'border-box',
      }}
    >
      {/* FULL SCREEN DASHBOARD CONTAINER */}
      <div
        style={{
          backgroundColor: '#393f4d', // Deep Matte Grey
          minHeight: 'calc(100vh - 3rem)',
          borderRadius: '18px',
          padding: '1.5rem',
          boxShadow: '0 12px 40px rgba(0,0,0,0.9)',
          color: '#d4d4dc',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* HEADER */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.5rem',
            borderRadius: '14px',
            backgroundColor: '#393f4d',
            border: '1px solid #4a4f5b',
            marginBottom: '1.5rem',
          }}
        >
          <h1 style={{ color: '#feda6a', marginRight: '1.5rem' }}>
            Expense Tracker
          </h1>

          {/* NAV */}
          <nav style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  padding: '8px 14px',
                  borderRadius: '10px',
                  border: '2px solid #feda6a',
                  color: '#feda6a',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#feda6a';
                  e.currentTarget.style.color = '#1d1e22';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#feda6a';
                }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* LOGOUT */}
          <div style={{ marginLeft: 'auto' }}>
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 18px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#feda6a',
                color: '#1d1e22',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </div>
        </header>

        {/* PAGE CONTENT (FULL HEIGHT) */}
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ flexGrow: 1 }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}

export default Layout;
