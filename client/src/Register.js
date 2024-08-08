import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import "./login.css";


function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        username,
        password,
        role,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error registering user");
    }
  };
    const handleLogout = () => {
      localStorage.removeItem("token"); // Clear the token from local storage
      navigate("/login"); // Redirect to the login page
    };

  return (
    <div class="full_height">
      <div id="login-header">
        <h1>
          <a href="/">
            <img id="logo" src="./logo.png" alt="" />
            ClinicConnect
          </a>
        </h1>
        <ul>
          <a href="/user/doctor">
            <i className="fas fa-user"></i> Hi! doctor
          </a>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div id="login_div">
        <div id="login_console">
          <h2>Register</h2>

          <div>
            <input
              type="text"
              value={username}
              placeholder="Set username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Set password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Role:</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="doctor">Doctor</option>
              <option value="receptionist">Receptionist</option>
            </select>
          </div>
          <button type="submit" onClick={handleRegister}>
            Register
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Register;
