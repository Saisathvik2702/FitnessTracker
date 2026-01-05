import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // LOGIN
  const handleLogin = () => {
    if (!username || !password) {
      alert("Enter username and password");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!existingUser) {
      alert("Invalid username or password");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(existingUser));

    // FIX: navigate + force refresh so navbar updates
    navigate("/dashboard");
    setTimeout(() => window.location.reload(), 50);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <label>Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p className="toggle-text">
        New user?{" "}
        <span onClick={() => navigate("/signup")}>Create account</span>
      </p>
    </div>
  );
};

export default Login;
