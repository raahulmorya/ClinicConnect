// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import AboutUs from "./AboutUs";
import Services from "./Services";
import UserPage from "./UserPage";

const App = () => {
  return (
    <Router>
      <div class="full_height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/user/:username" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
