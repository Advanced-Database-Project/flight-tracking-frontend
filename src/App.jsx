//

import { BrowserRouter } from "react-router-dom";
import Router from "./routes";

import "leaflet/dist/leaflet.css";

// --------------------------------------------------

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
