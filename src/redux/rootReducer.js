//

import { combineReducers } from "@reduxjs/toolkit";
// slices
import airportReducer from "./slices/airports";

// ----------------------------------------

const rootReducer = combineReducers({
  airports: airportReducer,
});

export { rootReducer };
