// src/components/NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // Optional: Add some styling

const NotFound = () => {
    console.log("Not Found");
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
