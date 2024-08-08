import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/patients');
        setPatients(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="full-width left">
      <h1>Patient List</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {patients.map((patient) => (
          <li className="small-padding-top" key={patient._id}>
            <p>
              <strong>ID:</strong> {patient.patientId}
            </p>
            <strong>{patient.name}</strong> - {patient.age} years old
            <p>
              <strong>Gender: </strong> {patient.gender}
            </p>
            <p>
              <strong>Address: </strong> {patient.address}
            </p>
            <p>
              <strong>Symptoms: </strong> {patient.symptoms}
            </p>
            <p>
              <strong>Prescriptions: </strong>
              <ul>
                {patient.prescriptions.map((prescription, index) => (
                  <ul key={index}>{prescription}</ul>
                ))}
              </ul>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
