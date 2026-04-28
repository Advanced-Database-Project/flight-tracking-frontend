//

import { useState } from "react";
// redux
import { getFlights } from "../../redux/slices/flights";
import { useDispatch, useSelector } from "../../redux/store";

// ----------------------------------------

export default function index() {
  const dispatch = useDispatch();

  const { flights } = useSelector((state) => state.flights);

  const [flightData, setFlightData] = useState({
    flight_id: "",
    departure_date: new Date().toISOString().slice(0, 10),
  });

  const inputChange = (e) =>
    setFlightData({ ...flightData, [e.target.name]: e.target.value });

  const searchFlight = () => {
    const params = {
      iata: flightData.flight_id,
      flight_date: flightData.departure_date,
    };

    dispatch(getFlights(params));
  };

  return (
    <div>
      <div>Search flight</div>

      <div style={{ display: "flex", marginTop: "20px" }}>
        <input
          placeholder="Please enter the Flight ID (for ex: OQ2104)"
          name="flight_id"
          onChange={inputChange}
          value={flightData.flight_id}
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f8f8f8",
            color: "#333",
          }}
        />

        <input
          placeholder="Please enter the Departure date"
          name="departure_date"
          type="date"
          onChange={inputChange}
          value={flightData.departure_date}
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f8f8f8",
            color: "#333",
          }}
        />

        <button
          style={{
            padding: "4px 20px",
            backgroundColor: "#000000",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            disabled: {
              backgroundColor: "#ccc",
              cursor: "not-allowed",
            },
          }}
          onClick={searchFlight}
          disabled={!flightData.flight_id || !flightData.departure_date}
        >
          Search
        </button>
      </div>
    </div>
  );
}
