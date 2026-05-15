//

import { useEffect, useState } from "react";
// @component
import SearchComponent from "./components/SearchComponent";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import { getFlightRoutes } from "../../redux/slices/flightRoutes";
import FlightConnection from "./components/FlightConnection";

// ----------------------------------------

export default function index() {
  const dispatch = useDispatch();

  const { flightRoutes } = useSelector((state) => state.flightRoutes);

  const [selectedDepartAirport, setSelectedDepartAirport] = useState({});
  const [selectedArrivalAirport, setSelectedArrivalAirport] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  const getSelectedAirport = (airport, key) => {
    if (key === "departAirport") {
      setSelectedDepartAirport(airport);
    }

    if (key === "arrivalAirport") {
      setSelectedArrivalAirport(airport);
    }
  };

  const getData = () => {
    if (selectedDepartAirport?.iata && selectedArrivalAirport?.iata) {
      const params = {
        source: selectedDepartAirport?.iata,
        destination: selectedArrivalAirport?.iata,
        departure_date: selectedDate,
      };

      dispatch(getFlightRoutes(params));
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

        <input
          type="date"
          placeholder="Departure Date"
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "8px",
            color: "black",
          }}
        />

        <button
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "black",
            border: "1px solid #ccc",
            borderRadius: "8px",
            color: "#f0f0f0",
          }}
          onClick={getData}
        >
          Search
        </button>
      </div>

      <hr />

      <div style={{ marginTop: "20px" }}>
        {!selectedDepartAirport?.iata ||
          (!selectedArrivalAirport?.iata && (
            <div>
              Please select the Departure, Arrival airport and Departure date
            </div>
          ))}

        {flightRoutes?.source && flightRoutes?.destination && (
          <FlightConnection flightRoutes={flightRoutes} />
        )}

        {selectedArrivalAirport &&
          selectedDepartAirport &&
          selectedDate &&
          !flightRoutes?.source?.length && (
            <>
              <p>
                Sorry, we dont have any matching flights in the database ...
              </p>
              <p>Please try with another routes ...</p>
            </>
          )}
      </div>
    </div>
  );
}
