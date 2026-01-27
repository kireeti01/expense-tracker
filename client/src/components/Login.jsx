import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password123");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { username, password });
  };

  return (
    <div className={`login-container ${isLoaded ? "loaded" : ""}`}>
      <div className="background-animation"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>
      
      <div className={`login-card ${isLoaded ? "slide-up" : ""}`}>
        <div className="card-header">
          <h2 className="title">Expense Tracker</h2>
          <p className="subtitle">Login in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
            <label className="input-label">Username</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <label className="input-label">Password</label>
          </div>

          {/* Changed from "Sign In" to "Login" */}
          <button type="submit" className="login-button">
            <span>Login</span>
            <div className="button-shimmer"></div>
          </button>
        </form>

        <div className="footer-text">
          <p>Don't have an account? <Link to="/Register">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
