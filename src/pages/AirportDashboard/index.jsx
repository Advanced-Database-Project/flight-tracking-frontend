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

      arrData.push(element);
    }

    const depData = [];
    for (let index = 0; index < parsedData?.dep?.length; index++) {
      const element = parsedData?.dep[index];

      depData.push(element);
    }

    setFilteredScheduledFlights({
      arr: arrData,
      dep: depData,
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
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>{}</div>
        <div style={{ width: "45%" }}>
          <p>Arrival</p>

          {filteredScheduledFlights?.arr?.map((flight, i) => {
            return (
              <div
                key={`${flight?.flight?.iata}-${i}`}
                style={{
                  border: "1px solid gray",
                  borderRadius: "4px",
                  padding: "1rem",
                  marginBottom: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ margin: 0 }}>
                    <b>Flight ID: </b> {flight?.flight?.iata?.toUpperCase()}
                  </p>
                  <p style={{ margin: 0 }}>
                    <b>Airport: </b> {flight?.arrival?.airport}
                  </p>
                  <p style={{ margin: 0 }}>
                    <b>IATA: </b> {flight?.arrival?.iata}
                  </p>

                  <p style={{ margin: 0 }}>
                    <b>Scheduled Arrival Time: </b>
                    {getDateFormat(flight?.arrival?.estimated)}
                  </p>

                  <p style={{ margin: 0 }}>
                    <b>Terminal: </b>
                    {flight?.arrival?.terminal}
                  </p>

                  <p style={{ margin: 0 }}>
                    <b>Gate: </b>
                    {flight?.arrival?.gate ?? ""}
                  </p>
                </div>

                <div>
                  {flight?.arrival?.delay > 0 ? (
                    <small
                      style={{
                        backgroundColor: "orange",
                        color: "white",
                        padding: 4,
                        borderRadius: 4,
                      }}
                    >
                      Delayed
                    </small>
                  ) : (
                    <small
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: 4,
                        borderRadius: 4,
                      }}
                    >
                      On time
                    </small>
                  )}
                </div>
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
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ margin: 0 }}>
                    <b>Flight ID: </b> {flight?.flight?.iata?.toUpperCase()}
                  </p>
                  <p style={{ margin: 0 }}>
                    <b>Airport: </b> {flight?.departure?.airport}
                  </p>
                  <p style={{ margin: 0 }}>
                    <b>IATA: </b> {flight?.departure?.iata}
                  </p>

                  <p style={{ margin: 0 }}>
                    <b>Scheduled Departure Time: </b>
                    {getDateFormat(flight?.departure?.estimated)}
                  </p>

                  <p style={{ margin: 0 }}>
                    <b>Terminal: </b>
                    {flight?.arrival?.terminal}
                  </p>

                  <p style={{ margin: 0 }}>
                    <b>Gate: </b>
                    {flight?.arrival?.gate ?? ""}
                  </p>
                </div>

                <div>
                  <div>
                    {flight?.departure?.delay > 0 ? (
                      <small
                        style={{
                          backgroundColor: "orange",
                          color: "white",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        Delayed
                      </small>
                    ) : (
                      <small
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        On time
                      </small>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
