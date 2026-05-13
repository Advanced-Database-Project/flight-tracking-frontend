//

import { useMapEvents } from "react-leaflet";
import { FLIGHT_PUB_CHANNEL_UPDATES } from "../../config";

// ----------------------------------------

export const ViewportTracker = (socket) => {
  const map = useMapEvents({
    moveend: sendViewport,
    zoomend: sendViewport,
  });

  function sendViewport() {
    const bounds = map.getBounds();

    const payload = {
      minLat: bounds.getSouthWest().lat,
      maxLat: bounds.getNorthEast().lat,
      minLng: bounds.getSouthWest().lng,
      maxLng: bounds.getNorthEast().lng,
      zoom: map.getZoom(),
    };

    socket.emit(FLIGHT_PUB_CHANNEL_UPDATES, payload);
  }

  return null;
};
