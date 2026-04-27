//

import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
// slices
import airportReducer from "./slices/airports";

// ----------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  airport: airportReducer,
});

export { rootPersistConfig, rootReducer };
