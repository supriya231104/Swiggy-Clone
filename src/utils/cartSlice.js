import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
    resInfo: JSON.parse(localStorage.getItem("resInfo")) || {},
  },
  reducers: {
    addToCart: (state, actions) => {
      const { two, restaurantInfo } = actions.payload;
      console.log(two);
      let newItem = [...state.cartItems, two];
      localStorage.setItem("cartData", JSON.stringify(newItem));
      if (state.cartItems.length == 0) {
        localStorage.setItem("resInfo", JSON.stringify(restaurantInfo));
        state.resInfo = restaurantInfo;
      }

      state.cartItems = newItem;
    },
    removeFromCart: (state, actions) => {
      let i = actions.payload;
      console.log(actions.payload);
      let newItems = [...state.cartItems];
      newItems.splice(i, 1);
      console.log(newItems);
      if (state.cartItems.length == 1) {
        localStorage.setItem("resInfo", JSON.stringify({}));
        state.resInfo = {};
      }
      localStorage.setItem("cartData", JSON.stringify(newItems));

      state.cartItems = newItems;
    },
    clearCart: (state, actions) => {
      localStorage.setItem("resInfo", JSON.stringify({}));
      localStorage.setItem("cartData", JSON.stringify([]));
      state.cartItems = [];
      state.resInfo = {};
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
