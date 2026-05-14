//

import { useMapEvents } from "react-leaflet";
import debounce from "lodash.debounce";
import { FLIGHT_PUB_CHANNEL_UPDATES } from "../../config";

// ----------------------------------------

export const ViewportTracker = ({ socket }) => {
  const debouncedSend = debounce(() => {
    const bounds = map.getBounds();

    const viewport = {
      minLat: bounds.getSouthWest().lat,
      maxLat: bounds.getNorthEast().lat,
      minLng: bounds.getSouthWest().lng,
      maxLng: bounds.getNorthEast().lng,
      zoom: map.getZoom(),
    };

    socket.emit(FLIGHT_PUB_CHANNEL_UPDATES, viewport);
  }, 300);

  const map = useMapEvents({
    moveend: debouncedSend,
    zoomend: debouncedSend,
  });

  return null;
};
