//

import { createSlice } from "@reduxjs/toolkit";
// config
import { FLIGHTS_API_ENDPOINT } from "../../../config";
// utils
import axios from "../../utils/axios";
//
import { dispatch } from "../store";

// ----------------------------------------

const initialState = {
  isLoading: false,
  error: null,
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

    // GET USERS
    getAirportSuccess(state, action) {
      state.isLoading = false;
      state.flights = action?.payload ?? [];
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

// AIRPORTS: GET FLIGHTS
export function getFlights(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(FLIGHTS_API_ENDPOINT, {
        params: payload,
      });

      console.log(response);

      dispatch(slice.actions.getAirportSuccess(response?.data ?? []));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
