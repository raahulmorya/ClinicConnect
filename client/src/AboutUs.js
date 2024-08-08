import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./style.css";

const AboutUs = () => {
  return (
    <div id="gradient-background">
      <Header
        showHome={true}
        showServices={true}
        showAboutUs={true}
        showLogin={true}
      />
      <div class="center-row">
        <div class="about-us center-column">
          <h2>About Us</h2>

          <p>
            ClinicConnect was founded with the vision of transforming the way
            clinics operate. Our journey began with a simple goal: to empower
            clinics with the tools they need to operate efficiently and
            effectively.
          </p>

          <ul>
            <li>
              <strong>Innovation:</strong> We believe in the power of technology
              to transform healthcare. Our team continuously strives to
              integrate the latest advancements into our platform to provide
              cutting-edge solutions for clinic management.
            </li>
            <li>
              <strong>Quality:</strong> At ClinicConnect, quality is at the
              forefront of everything we do. From our robust features to our
              user-friendly interface, we are committed to delivering a
              top-notch experience for our users.
            </li>
            <li>
              <strong>Customer Focus:</strong> Our users are at the heart of our
              business. We prioritize their needs and feedback, ensuring that
              our platform evolves to meet their ever-changing requirements.
            </li>
            <li>
              <strong>Integrity:</strong> We uphold the highest standards of
              integrity in all our actions. Our transparent and ethical approach
              ensures that our users can trust us with their critical data and
              operations.
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
