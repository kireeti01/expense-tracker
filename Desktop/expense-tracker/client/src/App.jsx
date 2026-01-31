import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext.jsx';
import { ExpenseProvider } from './contexts/ExpenseContext.jsx';

// Layout
import Layout from './components/Layout/Layout.jsx';

// Public Pages
import Landing from './pages/Landing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

// Protected Pages
import Dashboard from './pages/Dashboard.jsx';
import TransactionHistory from './pages/TransactionHistory.jsx';
import AddTransaction from './pages/AddTransaction.jsx';
import EditTransaction from './pages/EditTransaction.jsx';
import CategoryManagement from './pages/CategoryManagement.jsx';
import BudgetManagement from './pages/BudgetManagement.jsx';
import Reports from './pages/Reports.jsx';
import ProfileSettings from './pages/ProfileSettings.jsx';

function App() {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Layout>
                    <TransactionHistory />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-transaction"
              element={
                <ProtectedRoute>
                  <Layout>
                    <AddTransaction />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-transaction/:id"
              element={
                <ProtectedRoute>
                  <Layout>
                    <EditTransaction />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CategoryManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/budgets"
              element={
                <ProtectedRoute>
                  <Layout>
                    <BudgetManagement />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Reports />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ProfileSettings />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ExpenseProvider>
    </AuthProvider>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default App;
