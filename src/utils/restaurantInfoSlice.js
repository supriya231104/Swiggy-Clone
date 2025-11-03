import { createSlice } from "@reduxjs/toolkit";

const restaurantInfoSlice = createSlice({
  name: "restaurantInfoSlice",
  initialState: {
    info: JSON.parse(localStorage.getItem("resInfo")) || {},
    isLoading: true,
  },
  reducers: {
    setInfo: (state, actions) => {
      state.info = actions.payload;
    },
    clearInfo(state) {
      state.info = {};
    },
    setIsLoading: (state, action) => {
      // console.log("loading to false is called", action.payload);
      state.isLoading = action.payload;
    },
  },
});

export const { setInfo, setIsLoading,clearInfo } = restaurantInfoSlice.actions;
export default restaurantInfoSlice.reducer;
