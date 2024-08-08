import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TotalPatient from "./components/TotalPatient";

import "./css/style.css";

function Home() {
  return (
    <div id="gradient-background">
      <Header />
      <div id="tagline" class="center-column">
        Welcome to <h1 id="name"> ClinicConnect</h1> Revolutionizing Clinic
        Management
      </div>
      <TotalPatient />
      <Footer />
    </div>
  );
}

export default Home;
