// Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./css/login.css";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("doctor");
  const [error, setError] = useState("");  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/login`, {
        username,
        password,
        role,
      });

      if (response.data.user) {
        localStorage.setItem("token", response.data.token); // Store the token
        navigate(`/user/${response.data.user.username}`);
      } else {
        console.error("User not found by login");
      }
    } catch (error) {
      setError("Invalid credentials");
      console.error("Login error", error);
    }
  };

  return (
    <div class="full_height">
      <Header />
      <div id="login_div">
        <div id="login_console">
          <h1>LOGIN</h1>
          <div id="role">
            <input
              type="radio"
              name="role"
              value="doctor"
              checked={role === "doctor"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="doctor">Doctor</label>
            <img src="./doctor.png" alt="Doctor" />
            <input
              type="radio"
              name="role"
              value="receptionist"
              checked={role === "receptionist"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="receptionist">Receptionist</label>
            <img src="./receptionist.png" alt="Receptionist" />
          </div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="doctor">Doctor</option>
            <option value="receptionist">Receptionist</option>
          </select> */}
          <button onClick={handleLogin}>Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p>Don't have an account? Contact Admin</p>
        </div>
      </div>
     <Footer />
    </div>
  );
};

export default Login;
