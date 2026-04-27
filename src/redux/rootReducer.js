//

import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// slices
import airportReducer from "./slices/airport";

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
