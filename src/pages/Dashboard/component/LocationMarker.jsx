//

import { Marker, Popup, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// ----------------------------------------

export default function LocationMarker({ airports }) {
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
