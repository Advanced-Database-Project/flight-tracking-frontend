//

import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { io } from "socket.io-client";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import { getAirports } from "../../redux/slices/airports";
// component
import LocationMarker from "./component/LocationMarker";

// ----------------------------------------

const socket = io("http://127.0.0.1:5003", {
  transports: ["websocket"],
});

export default function Dashboard() {
  const dispatch = useDispatch();

  const [liveFlightData, setLiveFlightData] = useState([]);

  const { airports } = useSelector((state) => state.airports);

  useEffect(() => {
    // dispatch(getAirports());

    socket.on("connect", () => {
      console.log("-- socket connected: ", socket.id);
    });

    socket.on("initial-flight-data", (data) => {
      setLiveFlightData(data?.slice(0, 50));
    });

    const sendWsMessage = () => socket.emit("request-initial-state");
    sendWsMessage();

    return () => socket.close();
  }, [dispatch]);

  console.log(liveFlightData);

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
      </MapContainer>
    </div>
  );
}
