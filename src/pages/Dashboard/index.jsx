//

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { AIRPORT_DATA } from "../../../demo_data/airports";

// ----------------------------------------

export default function Dashboard() {
  const [airports, setAirport] = useState([]);

  useEffect(() => {
    const bigAirportData = AIRPORT_DATA?.filter(
      (e) => e.type !== "heliport" && e.type !== "small_airport",
    );

    setAirport(bigAirportData);
  }, []);

  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
    });

    return (
      <MarkerClusterGroup>
        {airports?.map((airport) => (
          <Marker
            key={airport.id}
            position={[airport.latitude_deg, airport.longitude_deg]}
          >
            <Popup>
              <div>
                <p>Name: {airport.name}</p>
                <p>Airport type: {airport.type}</p>
                {airport.gps_code && <p>GPS code: {airport.gps_code}</p>}
                {airport.local_code && <p>Local code: {airport.local_code}</p>}
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    );
  }

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
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
