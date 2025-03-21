import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function LoginPage({ setIsAdmin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temp login credentials
    if (username === "admin" && password === "CPT_S451") {
      setIsAdmin(true);
      navigate("/");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}