import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filterSlice",
  initialState: {
    filterVal: [],
    filteredData:[],

  },
  reducers: {
    removeAllFilter:(state)=>{
      state.filterVal=[]
    },
    setFilteredData:(state,action)=>{
        state.filteredData=action.payload
    },
    addFilter: (state, action) => {
       state.filterVal = [...state.filterVal, action.payload];
    },
    removeFilter: (state, action) => {
      // console.log(state.filterVal);
    if (state.filterVal.length>1) {
        let name=action.payload
        let spliceIndex=0
        for (let i = 0; i < state.filterVal.length; i++) {
          if (state.filterVal[i]===name) {
  
              spliceIndex=i
          }
          
        }
        let temp=[...state.filterVal]
        temp.splice(spliceIndex,1)
        state.filterVal=temp
    }
    else
        state.filterVal=[]
    },
  },
});

export const { addFilter,removeFilter,setFilteredData,removeAllFilter } = filterSlice.actions;
export default filterSlice.reducer;
