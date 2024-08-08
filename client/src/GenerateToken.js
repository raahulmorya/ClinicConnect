import React, { useState } from "react";
import axios from "axios";
import "./generateToken.css";

const GenerateToken = () => {
  const [patientId, setPatientId] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Assuming you store JWT in local storage
      const response = await axios.post(
        "http://localhost:3001/tokens/generate",
        { patientId },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      setToken(response.data.token);
      setSuccess("Token generated successfully!");
      setError("");
    } catch (err) {
      setError(
        "Error generating token: " +
          (err.response?.data?.message || err.message)
      );
      setSuccess("");
    }
  };

  return (
    <div className="generate-token-container">
      <h2>Generate Token</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="patientId">Patient ID:</label>
        <input
          type="text"
          id="patientId"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
        />
        <button type="submit">Generate Token</button>
      </form>
      {token && <p>Generated Token: {token}</p>}
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  );
};

export default GenerateToken;
