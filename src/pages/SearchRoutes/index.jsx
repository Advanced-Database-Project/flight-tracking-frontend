//

import React, { useState } from "react";
// @component
import SearchComponent from "./components/SearchComponent";

// ----------------------------------------

export default function index() {
  const [selectedDepartAirport, setSelectedDepartAirport] = useState({});
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState({});

  const getSelectedAirport = (airport, key) => {
    if (key === "departAirport") {
      setSelectedDepartAirport(airport);
    }

    if (key === "arrivalAirport") {
      setSelectedArrivalAirport(airport);
    }
  };

  return (
    <div>
      <div>Airport route finder</div>

      <div style={{ display: "flex", marginTop: "20px", gap: "40px" }}>
        <SearchComponent
          getSelectedAirport={getSelectedAirport}
          placeHolder="Departure airport ..."
          ident="departAirport"
        />

        <SearchComponent
          getSelectedAirport={getSelectedAirport}
          placeHolder="Arrival airport ..."
          ident="arrivalAirport"
        />
      </div>

      <hr />

      <div style={{ marginTop: "20px" }}>
        {!selectedDepartAirport?.iata && !selectedArrivalAirport?.iata && (
          <div>Please select the Departure and Arrival airport</div>
        )}
      </div>
    </div>
  );
}
