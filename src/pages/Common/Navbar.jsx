//

import { Link, Outlet } from "react-router-dom";
import { USER_PATHS } from "../../routes/paths";

// ----------------------------------------

export default function Navbar() {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          display: "flex",
          padding: "10px",
          gap: "20px",
          marginInline: "28px",
          borderBottom: "1px solid grey",
        }}
      >
        <Link to={USER_PATHS.dashboard}>Flight Radar</Link>
        <Link to={USER_PATHS.searchFlights}>Search Flight</Link>
      </div>

      <div
        style={{
          padding: "10px",
          gap: "20px",
          marginInline: "28px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
