//

import React from "react";

// ----------------------------------------

export const FlightAlertDetails = ({ alertFlightData }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: 4,
        maxHeight: 820,
        scrollBehavior: "auto",
        overflowY: "scroll",
      }}
    >
      <p style={{ fontWeight: "bold", paddingLeft: 8 }}>Flight Collision</p>

      <hr />

      {alertFlightData?.map((flight, i) => {
        return (
          <div
            key={`alert-flight-${i}`}
            style={{
              borderBottom: "1px solid black",
              padding: 8,
            }}
          >
            <div>Flight A: {flight?.a?.icao24?.toUpperCase()}</div>
            <div>Flight B: {flight?.b?.icao24?.toUpperCase()}</div>

            <div>Severity: {flight?.severity}</div>

            <div>Distance: {flight?.distanceKm} km</div>
            <div>Altitude diff: {flight?.altDiffM} km</div>
          </div>
        );
      })}

      {!alertFlightData?.length && <p>No Collision Records</p>}
    </div>
  );
};
