// ReceptionistDetails.js
import React from "react";

const ReceptionistDetails = ({ user }) => {
  return (
    <div>
      <h2>Receptionist Details</h2>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
      {/* Add more receptionist-specific details here */}
    </div>
  );
};

export default ReceptionistDetails;
