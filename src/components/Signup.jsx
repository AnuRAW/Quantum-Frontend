import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://quantum-backend-wpyn.onrender.com/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Signup failed");
    }
  };

  // Get today's date in YYYY-MM-DD format for the max attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-header">
          <h2>Sign Up</h2>
        </div>
        <div className="auth-avatar"></div>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          max={today} // Prevent future dates
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth-button">Sign Up</button>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {message && <p className="auth-error">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;
