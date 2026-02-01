import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { motion } from 'framer-motion';

function ProfileSettings() {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleUpdate = () => {
    // Simulate update (in real app, call API)
    const updatedUser = { ...user, name, email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Profile updated!');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2>Profile Settings</h2>
      <div className="card">
        <h3>User Details</h3>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button onClick={handleUpdate} className="btn">Update Profile</button>
      </div>
      <div className="card" style={{ marginTop: '20px' }}>
        <button onClick={logout} className="btn" style={{ background: '#ff5252' }}>Logout</button>
      </div>
    </motion.div>
  );
}

export default ProfileSettings;