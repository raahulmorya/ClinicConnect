const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import GenerateToken from "./GenerateToken";
import PatientForm from "./components/PatientForm";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientList from "./components/PatientList";
import Register from "./components/Register";
import "./css/userpage.css";

const UserPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(0);
  const [isdoctor, setIsDoctor] = useState(null);
  const [isreceptionist, setIsReceptionist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [register, setRegisterIt] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token"); // Assuming token is stored in local storage
      console.log(`${token}`);
      try {
        const response = await axios.get(
          `${apiBaseUrl}/auth/user/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserDetails(response.data);
        if (response.data.role === "doctor") {
          setIsDoctor(true);
        }
        if (response.data.role === "receptionist") {
          setIsReceptionist(true);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        if (error.response && error.response.status === 403) {
          setError("Unauthorized access. Please login.");
        } else {
          setError("Login to continue");
        }
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [username, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token from local storage
    navigate("/login"); // Redirect to the login page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h1 style={{ height: "100%" }}>{error}</h1>
      </div>
    );
  }

  if (!userDetails) {
    return <div>User not found</div>;
  }
  const registerIt = () => {
    setRegisterIt((prevState) => !prevState);
  };

  return (
    <div id="userpage">
      <div id="login-header">
        <h1>
          <a href="/">
            <img id="logo" src="./logo.png" alt="" />
            ClinicConnect
          </a>
        </h1>
        <ul>
          <a href="/login">
            <i className="fas fa-user"></i> Hi! {userDetails.username}
          </a>
        </ul>
        {isdoctor && (
          <ul>
            <button onClick={registerIt}>Register User</button>
          </ul>
        )}
        <button onClick={handleLogout}>Logout</button>
      </div>
      {isdoctor && <h1 className="small-padding-top">Doctor Dashboard</h1>}
      {isreceptionist && <h1>Receptionist Dashboard</h1>}
      <div className="center-row ">
        {isdoctor && (
          <div className="dash-component">
            <PatientList />
            {register && <Register />}
            <DoctorDashboard />
          </div>
        )}

        {isreceptionist && (
          <div className="center-row">
            <PatientList />
            {/* //   <nav className="center-row small-width menu">
          //     <ul>Add Patient</ul>
          //     <ul>Modify Patient Details</ul>
          //     <ul>List all Patients</ul>
          //   </nav>*/}
            <PatientForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
