//

import { useRoutes, Navigate } from "react-router-dom";
// common
import NavBar from "../pages/Common/Navbar";
// pages
import Dashboard from "../pages/Dashboard";
import SearchFlights from "../pages/SearchFlights";
import SearchRoutes from "../pages/SearchRoutes";
import AirportDashboard from "../pages/AirportDashboard";
// default path
import NotFound from "../pages/NotFound";

// ----------------------------------------

export default function Router() {
  return useRoutes([
    // redirect to dashboard
    {
      path: "/",
      element: (
        <Navigate
          to="/dashboard"
          replace
        />
      ),
    },

    {
      path: "/",
      element: <NavBar />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "search-flights",
          element: <SearchFlights />,
        },
        {
          path: "search-routes",
          element: <SearchRoutes />,
        },
        {
          path: "airport-dashboard",
          element: <AirportDashboard />,
        },
      ],
    },

    // default path ...
    { path: "not-found", element: <NotFound /> },
    {
      path: "*",
      element: (
        <Navigate
          to="/not-found"
          replace
        />
      ),
    },
  ]);
}
