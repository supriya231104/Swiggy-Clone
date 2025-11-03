import { createSlice } from "@reduxjs/toolkit";

const userInfoSlice = createSlice({
  name: "userInfoSlice",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || {
      photoURL: "",
      displayName: "",
      isSignIn: false,
    },
  },
  reducers: {
    setUserInfo(state, action) {
      // console.log(action.payload);
      const { displayName, photoURL } = action.payload;
      const newObj = {
        ...action.payload,
        isSignIn: true,
      };
      localStorage.setItem("userInfo", JSON.stringify(newObj));
      state.userInfo=newObj
    },
    clearUserInfo(state) {
        localStorage.removeItem("userInfo");
        state.userInfo = {
          photoURL: "",
          displayName: "",
          isSignIn: false,
        };
      }
      
  },
});

export const { setUserInfo,clearUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
