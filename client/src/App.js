// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import AboutUs from "./AboutUs";
import Services from "./Services";
import UserPage from "./UserPage";
import NotFound from "./components/NotFound";


const App = () => {
  return (
    <Router>
      <div class="full_height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="*" element={<NotFound />} />{" "}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
