import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [repass, setRepass] = useState("");

  const handleSignup = () => {
    if (!username || !email || !pass || !repass) {
      alert("Please fill all fields");
      return;
    }

    if (pass !== repass) {
      alert("Passwords do not match");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.username === username)) {
      alert("Username already exists");
      return;
    }
    if (users.some((u) => u.email === email)) {
      alert("Email already registered");
      return;
    }

    const newUser = {
      id: Date.now(),
      username,
      email,
      password: pass,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created! Please log in.");
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
      <h2>Create Account</h2>

      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <label>Password</label>
      <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} />

      <label>Retype Password</label>
      <input type="password" value={repass} onChange={(e) => setRepass(e.target.value)} />

      <button onClick={handleSignup}>Sign Up</button>

      <p className="signup-text">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
    </div>
  );
}
