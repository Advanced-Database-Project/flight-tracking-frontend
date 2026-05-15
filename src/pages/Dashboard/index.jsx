//

import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  CircleMarker,
} from "react-leaflet";
import { io } from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-rotatedmarker";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import { getAirports } from "../../redux/slices/airports";
// component
import LocationMarker from "./component/LocationMarker";
import { FlightAlertDetails } from "./component/FlightAlertDetails";
import { FLIGHT_PUB_CHANNEL_TRACKING } from "../../../config";
// utils
import { ViewportTracker } from "../../utils/ViewportTracker";
import { getFlights } from "../../redux/slices/flights";

// ----------------------------------------

const socket = io("http://127.0.0.1:5003", {
  transports: ["websocket"],
});

const planeIcon = new L.Icon({
  iconUrl: "./plane.svg", // or SVG
  iconSize: [25, 25],
  iconAnchor: [20, 20],
});

export default function Dashboard() {
  const dispatch = useDispatch();

  const [liveFlightData, setLiveFlightData] = useState([]);
  const [position, setPosition] = useState([0, 0]);
  const [alertFlightData, setAlertFlightData] = useState([]);

  const { airports } = useSelector((state) => state.airports);

  useEffect(() => {
    dispatch(getAirports());
    dispatch(getFlights());

    socket.on("connect", () => {
      console.log("-- socket connected: ", socket.id);
    });

    socket.on(FLIGHT_PUB_CHANNEL_TRACKING, (data) => {
      // console.log("-- live flight data: ", JSON.parse(JSON.stringify(data)));

      const flightData = JSON.parse(JSON.stringify(data?.currentFlights || []));
      const alertData = JSON.parse(JSON.stringify(data?.alerts || []));

      if (flightData?.length) {
        setLiveFlightData(
          JSON.parse(JSON.stringify(data?.currentFlights))?.filter(
            (item) => item?.latitude && item?.longitude,
          ),
        );

        setAlertFlightData(alertData);
      }
    });

    const sendWsMessage = () => socket.emit("request-initial-state");
    sendWsMessage();

    navigator?.geolocation?.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error(err);
      },
    );

    return () => socket.close();
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "8px",
      }}
    >
      <>
        <div></div>

        <MapContainer
          center={[49.48, 8.46]}
          zoom={10}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {airports?.length && <LocationMarker airports={airports} />}

          {liveFlightData?.map((plane, i) => {
            return (
              <>
                {plane.altitude ? (
                  <Marker
                    key={`plane-${plane.latitude}-${i}`}
                    position={[plane?.latitude || 0, plane?.longitude] || 0}
                    icon={planeIcon}
                    rotationAngle={plane?.true_track}
                    rotationOrigin="center"
                  >
                    <Tooltip
                      direction="top"
                      offset={[0, -10]}
                      opacity={1}
                    >
                      <div>
                        <div>
                          <b>{plane.callsign}</b>
                        </div>
                        <div>Velocity: {plane.velocity} km/h</div>
                        <div>Altitude: {plane.altitude} ft</div>
                        <div>Direction: {plane.true_track} deg</div>
                      </div>
                    </Tooltip>
                  </Marker>
                ) : null}
              </>
            );
          })}

          <CircleMarker
            center={position}
            radius={8}
            pathOptions={{
              color: "white",
              fillColor: "blue",
              fillOpacity: 0.8,
            }}
          />

          <ViewportTracker socket={socket} />
        </MapContainer>

        <div style={{ width: "16%" }}>
          <FlightAlertDetails alertFlightData={alertFlightData} />
        </div>
      </>
    </div>
  );
}
