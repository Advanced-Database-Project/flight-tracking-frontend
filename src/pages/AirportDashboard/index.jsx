//

import { useEffect, useState } from "react";
// @lib
import { io } from "socket.io-client";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import { generateEndPoint } from "../../utils/generateEndPoint";
import {
  AIRPORT_LIVE_DASHBOARD_SERVICE_PORT,
  AIRPORT_LIVE_DASHBOARD_CHANNEL,
  AIRPORT_LIVE_DASHBOARD_CHANNEL_INIT,
} from "../../../config";
import { getAirports } from "../../redux/slices/airports";
import { getFlights } from "../../redux/slices/flights";

// ----------------------------------------

const socket = io(generateEndPoint(AIRPORT_LIVE_DASHBOARD_SERVICE_PORT, "/"), {
  // autoConnect: false,
  transports: ["websocket"],
});

export default function AirportDashboard() {
  const dispatch = useDispatch();

  const [scheduledFlights, setScheduledFlights] = useState({});
  const [filteredScheduledFlights, setFilteredScheduledFlights] = useState({});
  const [searchAirport, setSearchAirport] = useState(null);

  const { airports } = useSelector((state) => state.airports);
  const { flights } = useSelector((state) => state.flights);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("📢 live dashboard socket connected: ", socket.id);
    });

    socket.on(AIRPORT_LIVE_DASHBOARD_CHANNEL, (data) => {
      const parsedData = JSON.parse(data);

      setScheduledFlights(parsedData);
    });

    if (!airports?.length || !flights?.length) {
      dispatch(getAirports());
      dispatch(getFlights());
    }

    return () => socket.close();
  }, [socket, dispatch]);

  useEffect(() => {
    const parsedData = scheduledFlights;

    const arrData = [];
    for (let index = 0; index < parsedData?.arr?.length; index++) {
      const element = parsedData?.arr[index];

      const flightDetails = flights?.find((row) => {
        return (
          row?.flight_status === "scheduled" &&
          row?.aircraft?.icao?.trim()?.toLowerCase() ===
            element?.icao24?.trim()?.toLowerCase()
        );
      });

      const airportDetails = airports?.find(
        (row) =>
          row?.icao_code?.trim()?.toLowerCase() ===
          element?.estDepartureAirport?.trim()?.toLowerCase(),
      );

      if (flightDetails) {
        element.flight = flightDetails;
      }

      if (airportDetails) {
        element.airport = airportDetails;
      }

      arrData.push(element);
    }

    const depData = [];
    for (let index = 0; index < parsedData?.dep?.length; index++) {
      const element = parsedData?.dep[index];

      const flightDetails = flights?.find(
        (row) =>
          row?.aircraft?.icao24?.trim()?.toLowerCase() ===
          element?.icao24?.trim()?.toLowerCase(),
      );

      const airportDetails = airports?.find(
        (row) =>
          row?.icao_code?.trim()?.toLowerCase() ===
          element?.estDepartureAirport?.trim()?.toLowerCase(),
      );

      if (flightDetails) {
        element.flight = flightDetails;
      }

      if (airportDetails) {
        element.airport = airportDetails;
      }

      depData.push(element);
    }

    setFilteredScheduledFlights({
      arr: arrData?.sort((a, b) => a?.firstSeen - b?.firstSeen),
      dep: depData?.sort((a, b) => b?.lastSeen - a?.lastSeen),
    });
  }, [scheduledFlights, airports, flights]);

  const getDateFormat = (timestamp) => {
    const date = new Date(timestamp);

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchAirport(value);
  };

  const handleSearch = async () => {
    // socket.connect();

    console.log("📢 requesting initial state for live dashboard");
    socket.emit(AIRPORT_LIVE_DASHBOARD_CHANNEL_INIT, {
      city: searchAirport,
    });
  };

  return (
    <div>
      <div>Airport Dashboard</div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        <input
          placeholder="EDDF"
          onChange={handleChange}
          style={{
            padding: "0.5rem",
            border: "1px solid gray",
            borderRadius: "4px",
            backgroundColor: "white",
            color: "black",
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div
        style={{
          border: "1px solid black",
          borderRadius: "8px",
          padding: "1rem",
          marginTop: "1rem",
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <div style={{ width: "45%" }}>
          <p>Arrival</p>

          {filteredScheduledFlights?.arr?.map((flight, i) => {
            return (
              <div
                key={`${flight?.flight_id}-${i}`}
                style={{
                  border: "1px solid gray",
                  borderRadius: "4px",
                  padding: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                <p style={{ margin: 0 }}>
                  <b>Flight ID:</b> {flight?.icao24?.toUpperCase()}
                </p>
                <p style={{ margin: 0 }}>
                  <b>Callsign:</b> {flight?.callsign}
                </p>
                <p style={{ margin: 0 }}>
                  <b>Airport:</b> {flight?.airport?.name}
                </p>
                <p style={{ margin: 0 }}>
                  <b>Country:</b> {flight?.airport?.municipality}
                </p>

                <p style={{ margin: 0 }}>
                  <b>Scheduled Time:</b>
                  {getDateFormat(flight?.firstSeen * 1000)}
                </p>

                {/* <p style={{ margin: 0 }}>
                  <b>Estimated Arrival Time:</b>{" "}
                  {getDateFormat(flight?.lastSeen * 1000)}
                </p> */}
              </div>
            );
          })}
        </div>

        <div style={{ width: "45%" }}>
          <p>Departure</p>

          {filteredScheduledFlights?.dep?.map((flight, i) => {
            return (
              <div
                key={`${flight?.flight_id}-${i}`}
                style={{
                  border: "1px solid gray",
                  borderRadius: "4px",
                  padding: "1rem",
                  marginBottom: "0.5rem",
                  width: "100%",
                }}
              >
                <p style={{ margin: 0 }}>
                  <b>Flight ID:</b> {flight?.icao24?.toUpperCase()}
                </p>
                <p style={{ margin: 0 }}>
                  <b>Callsign:</b> {flight?.callsign}
                </p>
                <p style={{ margin: 0 }}>
                  <b>Airport:</b> {flight?.airport?.name}
                </p>
                <p style={{ margin: 0 }}>
                  <b>Country:</b> {flight?.airport?.municipality}
                </p>

                {/* <p style={{ margin: 0 }}>
                  <b>Scheduled Time:</b>
                  {getDateFormat(flight?.firstSeen * 1000)}
                </p> */}

                <p style={{ margin: 0 }}>
                  <b>Estimated Arrival Time:</b>{" "}
                  {getDateFormat(flight?.firstSeen * 1000)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
