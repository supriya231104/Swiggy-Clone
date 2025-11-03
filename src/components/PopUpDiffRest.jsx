import React from "react";

import { addToCart, clearCart } from "../utils/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { setPopUp, toggleShowSimDish } from "../utils/toggleSlice";
import toast from "react-hot-toast";
import { setInfo } from "../utils/restaurantInfoSlice";
function PopUpDiffRest() {
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const { itemToBeAdded, itemToBeAddedResInfo } = useSelector(
    (state) => state.toggleSlice.itemToBeAddedInfo
  );
  let two = itemToBeAdded,
    restaurantInfo = itemToBeAddedResInfo;
  // console.log(itemToBeAdded, itemToBeAddedResInfo);
  //  console.log(itemToBeAdded);
  //  console.log(itemToBeAddedResInfo);
  // const resInfo = useSelector((state) => state.cartSlice.resInfo);
  const dispatch = useDispatch();
  return (
    <div
      className="w-[35%] first:w-[40%] second:w-[60%] exsmall:w-[320px] m-auto  border  fixed bottom-10 left-1/2 -translate-x-1/2 bg-white 
 z-20  shadow-[1px_2px_10px_rgb(0,0,0,0.5)] px-6 py-5 flex flex-col gap-4"
    >
      <div className="w-full flex flex-col gap-2">
        <p className="text-black text-[18px] font-bold fourth:text-[16px]">
          Items already in cart
        </p>
        <p className="text-sm fourth:text-[12px]  ">
          Your cart contains items from other restaurant. Would you like to
          reset your cart for adding items from this restaurant?
        </p>
      </div>
      <div className="flex w-full justify-between">
        <button
          onClick={() => {
            dispatch(setPopUp(false));
          }}
          className=" text-[14px] fourth:text-[12px]   px-2 w-[40%]  exsmall:text-[10px]  py-2 border border-[#1ba672] rounded-lg cursor-pointer  font-bold text-[#1ba672]"
        >
          NO
        </button>
        <button
          onClick={() => {
            dispatch(clearCart());
            dispatch(addToCart({ two, restaurantInfo }));
            dispatch(setInfo(restaurantInfo));
            dispatch(setPopUp(false));
            dispatch(toggleShowSimDish(true))

            toast.success("Added successfully to cart..");
          }}
          className=" text-[14px] fourth:text-[12px]  uppercase px-2 w-[40%]  exsmall:text-[10px] py-2 border border-[#1ba672] rounded-lg cursor-pointer  text-white font-bold bg-[#1ba672]"
        >
          Yes, Start AFresh
        </button>
      </div>
    </div>
  );
}

export default PopUpDiffRest;
