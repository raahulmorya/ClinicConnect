import React from "react";
import "./totalpatient.css";

const TotalPatient = () => {
    return (
      <div class="center-row padding_small top_margin">
        <div id="patient" class="center-column square">
          <img src="./hospitalisation.png" alt="" />
          Total Patient visited 46
        </div>

        <div id="search" class="center-column white_border square">
          <img src="./search.png" alt="" />
          Search Health records
        </div>
        <div id="tips" class="center-column white_border square">
          <img src="./health.png" alt="" />
           Health Tips
        </div>
      </div>
    );
};

export default TotalPatient;