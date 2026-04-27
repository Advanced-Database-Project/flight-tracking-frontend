//

import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "../../utils/axios";
//
import { dispatch } from "../store";

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
      state.airports = action.payload;
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
      const response = await axios.get("/api/airports", {
        params: payload,
      });

      console.log(response);

      dispatch(slice.actions.getAirportSuccess(response.data?.data ?? {}));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
