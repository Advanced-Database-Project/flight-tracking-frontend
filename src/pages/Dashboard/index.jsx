//

import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
// redux
import { useDispatch, useSelector } from "../../redux/store";
import { getAirports } from "../../redux/slices/airports";
// component
import LocationMarker from "./component/LocationMarker";

// ----------------------------------------

export default function Dashboard() {
  const dispatch = useDispatch();

  const { airports } = useSelector((state) => state.airports);

  useEffect(() => {
    dispatch(getAirports());
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
      </MapContainer>
    </div>
  );
}
