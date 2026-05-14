//

import { combineReducers } from "@reduxjs/toolkit";
// slices
import airportReducer from "./slices/airports";
import flightReducer from "./slices/flights";
import flightRoutesReducer from "./slices/flightRoutes";

// ----------------------------------------

const rootReducer = combineReducers({
  airports: airportReducer,
  flights: flightReducer,
  flightRoutes: flightRoutesReducer,
});

export { rootReducer };
