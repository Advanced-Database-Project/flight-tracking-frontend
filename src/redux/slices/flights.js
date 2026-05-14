//

import { createSlice } from "@reduxjs/toolkit";
// config
import { FLIGHT_SERVICE_PORT, FLIGHTS_API_ENDPOINT } from "../../../config";
// utils
import axios from "../../utils/axios";
//
import { dispatch } from "../store";
// util
import { generateEndPoint } from "../../utils/generateEndPoint";

// ----------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  flightDetail: {},
  flights: [],
};

const slice = createSlice({
  name: "flights",
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

    // GET FLIGHT DETAILS
    getFlightDetailsSuccess(state, action) {
      state.isLoading = false;
      state.flightDetail = action?.payload ?? [];
    },

    getFlightsSuccess(state, action) {
      state.isLoading = false;
      state.flights = action?.payload ?? [];
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

// FLIGHTS: GET FLIGHTS
export function getFlightDetail(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        generateEndPoint(
          FLIGHT_SERVICE_PORT,
          FLIGHTS_API_ENDPOINT + "/" + payload.iata,
        ),
        {
          params: payload,
        },
      );

      if (response?.data?.status === 200) {
        dispatch(
          slice.actions.getFlightDetailsSuccess(
            response?.data?.entry?.data[0] ?? [],
          ),
        );
      } else {
        dispatch(slice.actions.hasError(error));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// FLIGHTS: GET ALL FLIGHTS
export function getFlights() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        generateEndPoint(FLIGHT_SERVICE_PORT, FLIGHTS_API_ENDPOINT),
      );

      if (response?.data?.status === 200) {
        dispatch(
          slice.actions.getFlightsSuccess(response?.data?.entry?.data ?? []),
        );
      } else {
        dispatch(slice.actions.hasError(error));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
