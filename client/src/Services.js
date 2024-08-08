import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import TotalPatient from "./TotalPatient";

const Services = () => {
  return (
    <div>
      <Header
        showHome={true}
        showServices={true}
        showAboutUs={true}
        showLogin={true}
      />
      <h1 style={{ textAlign: "center", marginTop: "120px" }}>Services</h1>
      <TotalPatient />
      <Footer />
    </div>
  );
};

export default Services;
