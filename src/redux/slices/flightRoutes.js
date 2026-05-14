//

import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { dispatch } from "../store";
import { generateEndPoint } from "../../utils/generateEndPoint";
import {
  FLIGHT_ROUTE_SERVICE_PORT,
  FLIGHT_ROUTES_API_ENDPOINT,
} from "../../../config";

// ----------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  flightRoutes: [],
};

const slice = createSlice({
  name: "flightRoutes",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USERS
    getFlightRoutesSuccess(state, action) {
      state.isLoading = false;
      state.flightRoutes = action?.payload ?? [];
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

// FLIGHTROUTES: GET FLIGHTROUTES
export function getFlightRoutes(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        generateEndPoint(FLIGHT_ROUTE_SERVICE_PORT, FLIGHT_ROUTES_API_ENDPOINT),
        {
          params: payload,
        },
      );
      console.log(response.data?.data);

      if (response.data?.status === 200) {
        dispatch(
          slice.actions.getFlightRoutesSuccess(response?.data?.data ?? {}),
        );
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
