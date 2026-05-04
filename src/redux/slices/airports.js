//

import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { dispatch } from "../store";
import { generateEndPoint } from "../../utils/generateEndPoint";
import { AIRPORT_SERVICE_PORT, AIRPORTS_API_ENDPOINT } from "../../../config";

// ----------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  airports: [],
};

const slice = createSlice({
  name: "airports",
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
      state.airports = action?.payload ?? [];
    },
  },
});

// Reducer
export default slice.reducer;

// ----------------------------------------

// AIRPORTS: GET AIRPORTS
export function getAirports(payload) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        generateEndPoint(AIRPORT_SERVICE_PORT, AIRPORTS_API_ENDPOINT),
        {
          params: payload,
        },
      );

      dispatch(slice.actions.getAirportSuccess(response?.data ?? []));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
