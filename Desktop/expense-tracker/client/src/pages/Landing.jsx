import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Landing() {
  return (
    <div style={{
      backgroundImage: 'url(https://source.unsplash.com/random/1920x1080/?finance)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: '#fff'
    }}>
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{ fontSize: '3rem', marginBottom: '10px' }}
      >
        Expense Tracker
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ fontSize: '1.5rem', marginBottom: '20px' }}
      >
        Manage your finances effortlessly.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link to="/login" className="btn" style={{ fontSize: '1.2rem', padding: '15px 30px' }}>Explore</Link>
      </motion.div>
    </div>
  );
}

export default Landing;