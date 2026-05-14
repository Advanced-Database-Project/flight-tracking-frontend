//

// base API end-point
export const BASE_URL =
  import.meta.env.REACT_APP_HOST_API_KEY || "http://localhost";

export const BASE_URL_IMG =
  "http://localhost:8080/public/attachment?file_name=";

// PORTS
// 5001 - Airport Service
export const AIRPORT_SERVICE_PORT = 5001;
export const AIRPORTS_API_ENDPOINT = "api/airports";

// 5002 - Flight Service
export const FLIGHT_SERVICE_PORT = 5002;
export const FLIGHTS_API_ENDPOINT = "api/flights";

// 5003 - Flight Live tracing Service
export const FLIGHT_LIVE_TRACING_SERVICE_PORT = 5003;
export const FLIGHT_LIVE_TRACING_API_ENDPOINT = "api/flights/live-tracing";
export const FLIGHT_PUB_CHANNEL_TRACKING = "live-flight-tracking";
export const FLIGHT_PUB_CHANNEL_UPDATES = "live-flight-updates";

// 5004 - Route Service
export const FLIGHT_ROUTE_SERVICE_PORT = 5004;
export const FLIGHT_ROUTES_API_ENDPOINT = "api/routes";

// 5006 - Airport Live Dashboard Service
export const AIRPORT_LIVE_DASHBOARD_SERVICE_PORT = 5006;
// export const AIRPORT_LIVE_DASHBOARD_API_ENDPOINT = "api/live-dashboard";
export const AIRPORT_LIVE_DASHBOARD_CHANNEL = "live-dashboard-updates";
export const AIRPORT_LIVE_DASHBOARD_CHANNEL_INIT =
  "live-dashboard-updates-initial";
