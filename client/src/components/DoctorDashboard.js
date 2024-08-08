// src/components/DoctorDashboard.js

import React, { useState } from 'react';
import axios from 'axios';

const DoctorDashboard = () => {
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState(null);
  const [prescription, setPrescription] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setPatientId(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:3001/api/patients/${patientId}`);
      setPatient(response.data.patient);
      setMessage('');
    } catch (error) {
      setPatient(null);
      setMessage('Patient not found');
      console.error(error);
    }
  };

  const handleAddPrescription = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve token from storage
    console.log(`${token}`);
    try {
      const response = await axios.post(
        `http://localhost:3001/api/patients/${patientId}/prescription`,
        { prescription },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message);
      setPrescription("");
      // Optionally, update the patient state after adding prescription
      setPatient(response.data.patient);
    } catch (error) {
      setMessage("Error adding prescription");
      console.error(error);
    }
  };

  return (
    <div className='auto-width'>
      <div id='search' className='center-column small-width'> 
      <form className='background center-row' onSubmit={handleSearch}>
        <label>Enter Patient ID:</label>
        <input type="text" value={patientId} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      {patient && (
        <div className="background center-column">
          <h3>Patient Details</h3>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Address:</strong> {patient.address}</p>
          <p><strong>Symptoms:</strong> {patient.symptoms}</p>
          <p><strong>Prescriptions:</strong></p>
          <ul>
            {patient.prescriptions.map((prescription, index) => (
              <li key={index}>{prescription}</li>
            ))}
          </ul>

          <form onSubmit={handleAddPrescription}>
            <label>Add Prescription:</label>
            <textarea value={prescription} onChange={(e) => setPrescription(e.target.value)} />
          {message && <p>{message}</p>}
            <button type="submit">Add Prescription</button>
          </form>
          </div>
      )}
      </div>

    </div>
  );
};

export default DoctorDashboard;
