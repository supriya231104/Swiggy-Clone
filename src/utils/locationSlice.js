import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "locationSlice",
  initialState: {
    lat: 28.7040592,
    lng: 77.10249019999999,
  },
  reducers: {
    changeLocation:(state,actions)=>{
        const {latitude,longitude}=actions.payload
        state.lat=latitude
        state.lng=longitude

    }
  },
});

export const {changeLocation} = locationSlice.actions;
export default locationSlice.reducer;
