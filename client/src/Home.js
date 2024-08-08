import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import TotalPatient from "./TotalPatient";

import "./style.css";


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
