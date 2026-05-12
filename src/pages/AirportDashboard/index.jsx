//

import { useEffect } from "react";
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
  transports: ["websocket"],
});

export default function AirportDashboard() {
  const dispatch = useDispatch();

  const airport = {
    city: "EDDF",
  };

  const { airports } = useSelector((state) => state.airports);
  const { flights } = useSelector((state) => state.flights);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("📢 live dashboard socket connected: ", socket.id);

      const initChannel = () => {
        console.log("📢 requesting initial state for live dashboard");

        socket.emit(AIRPORT_LIVE_DASHBOARD_CHANNEL_INIT, airport);
      };
      initChannel();
    });

    socket.on(AIRPORT_LIVE_DASHBOARD_CHANNEL, (data) => {
      console.log(
        "📢 live dashboard update: ",
        JSON.parse(JSON.stringify(data)),
      );
    });

    if (!airports?.length || !flights?.length) {
      dispatch(getAirports());
      dispatch(getFlights());
    }

    return () => socket.close();
  }, [io, dispatch]);

  return (
    <div>
      <div>AirportDashboard</div>
    </div>
  );
}
