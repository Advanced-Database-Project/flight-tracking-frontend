//

import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { io } from "socket.io-client";
import L from "leaflet";
import "leaflet-rotatedmarker";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import { getAirports } from "../../redux/slices/airports";
// component
import LocationMarker from "./component/LocationMarker";
import { FLIGHT_PUB_CHANNEL_TRACKING } from "../../../config";

// ----------------------------------------

const socket = io("http://127.0.0.1:5003", {
  transports: ["websocket"],
});

const planeIcon = new L.Icon({
  iconUrl: "./plane.svg", // or SVG
  iconSize: [25, 25],
});

export default function Dashboard() {
  const dispatch = useDispatch();

  const [liveFlightData, setLiveFlightData] = useState([]);

  const { airports } = useSelector((state) => state.airports);

  useEffect(() => {
    dispatch(getAirports());

    socket.on("connect", () => {
      console.log("-- socket connected: ", socket.id);
    });

    socket.on(FLIGHT_PUB_CHANNEL_TRACKING, (data) => {
      setLiveFlightData(
        JSON.parse(data)?.filter((item) => item?.latitude && item?.longitude),
      );
    });

    const sendWsMessage = () => socket.emit("request-initial-state");
    sendWsMessage();

    return () => socket.close();
  }, [dispatch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <MapContainer
        center={[52.51, 13.38]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {airports?.length && <LocationMarker airports={airports} />}

        {liveFlightData.map((plane, i) => (
          <Marker
            key={`plane-${i}`}
            position={[plane?.latitude || 0, plane?.longitude] || 0}
            icon={planeIcon}
            rotationAngle={plane?.true_track || 0}
            rotationOrigin="center"
          />
        ))}
      </MapContainer>
    </div>
  );
}
