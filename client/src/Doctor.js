// DoctorDetails.js
import React from "react";

const DoctorDetails = ({ user }) => {
  return (
    <div>
      <h2>Doctor Details</h2>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
      {/* Add more doctor-specific details here */}
    </div>
  );
};

export default DoctorDetails;
