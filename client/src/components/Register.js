import React, { useState } from "react";
import axios from "axios";
import "../css/login.css";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/register`, {
        username,
        password,
        role,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error registering user");
    }
  };

  return (
    <div id="register_console">
      <h1>Register</h1>
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
  );
};

export default Register;
