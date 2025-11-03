// const { configureStore } = require("@reduxjs/toolkit");

import { configureStore } from "@reduxjs/toolkit"
import toggleSlice from "./toggleSlice.js"
import cartSlice  from "./cartSlice.js"
import locationSlice from "./locationSlice.js"
import restaurantInfoSlice from "./restaurantInfoSlice.js"
import filterSlice from "./filterSlice.js"
import userInfoSlice from "./userInfoSlice.js"
// import { configureStore } from "@reduxjs/toolkit"
const store=configureStore({
    reducer:{
        toggleSlice,
        cartSlice,
        locationSlice,
        restaurantInfoSlice,
        filterSlice,
        userInfoSlice
    }
})
export default store