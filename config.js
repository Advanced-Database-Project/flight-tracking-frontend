//

// base API end-point
export const BASE_URL =
  import.meta.env.REACT_APP_HOST_API_KEY || "http://localhost";

export const BASE_URL_IMG =
  "http://localhost:8080/public/attachment?file_name=";

// PORTS
// 5001 - Airport Service
export const AIRPORT_SERVICE_PORT = 5001;
// 5002 - Flight Service
export const FLIGHT_SERVICE_PORT = 5002;

// API END-POINTS
export const AIRPORTS_API_ENDPOINT = "api/airports";
export const FLIGHTS_API_ENDPOINT = "api/flights";
