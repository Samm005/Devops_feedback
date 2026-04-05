import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Login Function
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
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

      console.log("Response:", data);

      if (data.includes("Login Successful")) {
        alert("Login Successful ✅");

        if (data === "Login Successful") {
          localStorage.setItem("user", username);
          navigate("/home");
        }
      } else {
        alert(data); //  show actual error
      }
    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="auth-bg">
      <div className="glass-card">
        <h1>Welcome Back 👋</h1>
        <p className="subtitle">Login to continue</p>

        {/* ✅ FORM */}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        {/* ✅ NAVIGATION */}
        <p className="footer-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
