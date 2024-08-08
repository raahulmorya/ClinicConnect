import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TotalPatient from "./components/TotalPatient";

const Services = () => {
  return (
    <div>
      <Header/>
      <h1 style={{ textAlign: "center", marginTop: "120px" }}>Services</h1>
      <TotalPatient />
      <Footer />
    </div>
  );
};

export default Services;
