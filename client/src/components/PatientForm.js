// src/components/PatientForm.js
import React, { useState } from "react";
import axios from "axios";
import "./PatientForm.css"; // Add your CSS file for styling

const PatientForm = () => {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    symptoms: "",
  });

  const [message, setMessage] = useState("");
  const [patientId, setPatientId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prevPatient) => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/patients",
        patient
      );
      setMessage("Patient added successfully");
      setPatientId(response.data.patient.patientId); // Get the token from the response
      setPatient({
        name: "",
        age: "",
        gender: "",
        address: "",
        symptoms: "",
      });
    } catch (error) {
      setMessage("Error adding patient");
      console.error(error);
    }
  };

  return (
    <div className="patient-form-container">
      <h2>Add Patient</h2>
      {message && <p className="message">{message}</p>}
      {patientId && <p className="patient-id">Patient ID/Token: {patientId}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={patient.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={patient.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={patient.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Symptoms:</label>
          <textarea
            name="symptoms"
            value={patient.symptoms}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
};

export default PatientForm;
