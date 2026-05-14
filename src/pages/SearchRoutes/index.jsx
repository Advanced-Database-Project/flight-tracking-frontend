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

  useEffect(() => {
    if (selectedDepartAirport?.iata && selectedArrivalAirport?.iata) {
      const params = {
        source: selectedDepartAirport?.iata,
        destination: selectedArrivalAirport?.iata,
      };

      dispatch(getFlightRoutes(params));
    }
  }, [selectedDepartAirport, selectedArrivalAirport]);

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
        {!selectedDepartAirport?.iata ||
          (!selectedArrivalAirport?.iata && (
            <div>Please select the Departure and Arrival airport</div>
          ))}

        {flightRoutes?.source && flightRoutes?.destination && (
          <FlightConnection flightRoutes={flightRoutes} />
        )}
      </div>
    </div>
  );
}
