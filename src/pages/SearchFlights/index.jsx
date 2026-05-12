//

import { useState } from "react";
// redux
import { getFlightDetail } from "../../redux/slices/flights";
import { useDispatch, useSelector } from "../../redux/store";

// ----------------------------------------

export default function index() {
  const dispatch = useDispatch();

  const { flightDetail } = useSelector((state) => state.flights);

  const [flightData, setFlightData] = useState({
    flight_id: "",
    departure_date: new Date().toISOString().slice(0, 10),
  });

  const inputChange = (e) =>
    setFlightData({ ...flightData, [e.target.name]: e.target.value });

  const searchFlight = () => {
    const params = {
      iata: flightData.flight_id,
      date: flightData.departure_date,
    };

    dispatch(getFlightDetail(params));
  };

  const LoadFlightDetails = ({ flightDetail }) => {
    if (!flightDetail?.flight?.iata) {
      return <div>No flight found</div>;
    }

    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <div>Flight ID: {flightDetail?.flight?.iata}</div>
          <div>Airline: {flightDetail?.airline?.name}</div>
          <div>Flight status: {flightDetail?.flight_status}</div>

          <hr />

          <div>Departure </div>
          <div>
            Estimated Departure Time: {flightDetail?.departure?.estimated}
          </div>
          <div>Airport: {flightDetail?.departure?.airport}</div>
          <div>Entry Gate: {flightDetail?.departure?.gate}</div>

          <hr />

          <div>Arrival</div>
          <div>Estimated Arrival Time: {flightDetail?.arrival?.scheduled}</div>
          <div>Airport: {flightDetail?.arrival?.airport}</div>
        </div>
      </div>
    );
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

      <hr />

      <div style={{ marginTop: "20px" }}>
        <LoadFlightDetails flightDetail={flightDetail} />
      </div>
    </div>
  );
}
