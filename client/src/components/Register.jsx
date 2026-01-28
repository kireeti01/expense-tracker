import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!password) return "Password is required";
    if (!regex.test(password))
      return "Min 8 chars, uppercase, lowercase, number & symbol";
    return "";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.username.length < 3)
      newErrors.username = "Username must be at least 3 characters";

    if (!formData.email.includes("@"))
      newErrors.email = "Enter a valid email";

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Registration Successful ✅");
    }
  };

  return (
    <div className="registration-container">
      <form className="registration-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
          <small>{errors.username}</small>
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <small>{errors.email}</small>
        </div>

        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          <span className="eye" onClick={() => setShowPassword(!showPassword)}>
            👁
          </span>
          <small>{errors.password}</small>
        </div>

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <small>{errors.confirmPassword}</small>
        </div>

        <button type="submit">Register</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
