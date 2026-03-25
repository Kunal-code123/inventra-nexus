import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState("login");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!email || !password) {
      alert("Please fill all required fields");
      return;
    }

    if (tab === "signup") {
      if (!fullName) {
        alert("Please enter your full name");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }

    // Temporary frontend auth
    localStorage.setItem("inventra_auth", "true");
    localStorage.setItem("inventra_role", role);

    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="app-icon">📦</div>

        <h1>Welcome to Inventra Nexus</h1>
        <p className="subtitle">AI-Enabled Smart Inventory System</p>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${tab === "login" ? "active" : ""}`}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={`tab ${tab === "signup" ? "active" : ""}`}
            onClick={() => setTab("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* FULL NAME (Signup Only) */}
        {tab === "signup" && (
          <>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </>
        )}

        {/* EMAIL */}
        <label>Email</label>
        <input
          type="email"
          placeholder="admin@inventranexus.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <label>Password</label>
        <div className="password-box">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="eye"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* CONFIRM PASSWORD (Signup Only) */}
        {tab === "signup" && (
          <>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}

        {/* ROLE */}
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Admin</option>
          <option>Manager</option>
          <option>Staff</option>
        </select>

        {/* BUTTON */}
        <button className="signin-btn" onClick={handleSubmit}>
          {tab === "login" ? "Sign In" : "Create Account"}
        </button>

        {/* FORGOT PASSWORD (Login Only) */}
        {tab === "login" && (
          <p className="forgot">Forgot Password?</p>
        )}
      </div>
    </div>
  );
};

export default Login;
