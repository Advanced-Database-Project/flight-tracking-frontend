//

import { combineReducers } from "@reduxjs/toolkit";
// slices
import airportReducer from "./slices/airports";
import flightReducer from "./slices/flights";

// ----------------------------------------

const rootReducer = combineReducers({
  airports: airportReducer,
  flights: flightReducer,
});

export { rootReducer };
