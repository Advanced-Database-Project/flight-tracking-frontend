//

import { useRoutes, Navigate } from "react-router-dom";
// pages
import Dashboard from "../pages/dashboard";

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
      path: "dashboard",
      element: <Dashboard />,
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
