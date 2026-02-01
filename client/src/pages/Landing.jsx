import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bgImage from '../assets/pexels-olia-danilevich-5466809.jpg'; // import your image

function Landing() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`, // use imported image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
        position: 'relative',
      }}
    >
      {/* Optional overlay for better text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 0,
        }}
      />

      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{ fontSize: '3rem', marginBottom: '10px', position: 'relative', zIndex: 1 }}
      >
        Expense Tracker
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{ fontSize: '1.5rem', marginBottom: '20px', position: 'relative', zIndex: 1 }}
      >
        Manage your finances effortlessly.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <Link to="/login" className="btn" style={{ fontSize: '1.2rem', padding: '15px 30px' }}>
          Explore
        </Link>
      </motion.div>
    </div>
  );
}

export default Landing;
