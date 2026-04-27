//

import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
//
import Router from "./routes";
//
import "leaflet/dist/leaflet.css";

// --------------------------------------------------

function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
