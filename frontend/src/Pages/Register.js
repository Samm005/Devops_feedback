import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Passwords do not match ❌");
    return;
  }

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.text();

    if (data === "Registered Successfully") {
      alert("Registered Successfully ✅");
      navigate("/");
    } else {
      alert(data);
    }
  } catch (err) {
    alert("Server Error ❌");
  }
};

  return (
    <div className="auth-bg">
      <div className="glass-card">
        <h1>Create Account 🚀</h1>
        <p className="subtitle">Join us today</p>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* ✅ NEW FIELD */}
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>

        <p className="footer-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;