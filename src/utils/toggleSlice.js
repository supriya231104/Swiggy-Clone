import { createSlice } from "@reduxjs/toolkit";

// const { createSlice } = require("@reduxjs/toolkit");

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: {
    searchBarToggle: false,
    loginToggle: false,
    popUpStatus: false,
    itemToBeAddedInfo: {
      itemToBeAdded:{},
      itemToBeAddedResInfo:{}
    },
    similarResClick:{
      isSimilarRestaurantDishes:false,
      city:'',
      restId:'',
      itemId:'',
      resLocation:''

    },
    toShowSimilarDishes:false
  },
  reducers: {
    toggleSerchBar: (state) => {
      state.searchBarToggle = !state.searchBarToggle;
    },
    toggleLogin: (state) => {
      state.loginToggle = !state.loginToggle;
    },
    setPopUp: (state, actions) => {
      // console.log(actions.payload);
      console.log("ohoooooooo");
      state.popUpStatus = actions.payload;
    },
    setItemToBeAdded:(state,actions)=>{
      console.log(actions.payload);
      const {two,restaurantInfo}=actions.payload
      state.itemToBeAddedInfo.itemToBeAdded=two
      state.itemToBeAddedInfo.itemToBeAddedResInfo=restaurantInfo

    },
    toggleSimilarRes:(state,actions)=>{
        state.similarResClick.isSimilarRestaurantDishes=!state.similarResClick.isSimilarRestaurantDishes
    },
    setSimilarRes:(state,actions)=>{
      console.log(actions.payload);
        state.similarResClick=actions.payload
    },
    resetSimilarRes:(state,actions)=>{
     state.similarResClick={
      isSimilarRestaurantDishes:false,
      city:'',
      restId:'',
      itemId:'',
      resLocation:''

    }
    },
    toggleShowSimDish(state,actions){
      state.toShowSimilarDishes=actions.payload
    }
  },
});
export const { toggleSerchBar, setPopUp ,setItemToBeAdded,toggleLogin,toggleSimilarRes,toggleShowSimDish,setSimilarRes,resetSimilarRes} = toggleSlice.actions;
export default toggleSlice.reducer;
