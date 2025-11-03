import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setItemToBeAdded, setPopUp } from "../utils/toggleSlice";
import { addToCart } from "../utils/cartSlice";
import { setInfo } from "../utils/restaurantInfoSlice";
function AddToCartBtn({ restaurantInfo, two,positions }) {
 


  let id=two?.card?.info?.id || two?.dish?.info?.id || two?.info?.id
  // console.log(id);
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);
  const dispatch = useDispatch();
  function handleAddToCart() {
    // console.log(two,restaurantInfo);
    const isPresent = cartData?.some((oneItem) => {
      // console.log(oneItem?.card?.info?.id);
      return (oneItem?.card?.info?.id) === id || (oneItem?.dish?.info?.id)===id || (oneItem?.info?.id)===id;
    });
    // console.log(isPresent);
    if (isPresent) {
      // console.log(isPresent);
      toast.error("Item is already present in cart !");
      // alert("Item is already present in cart !");
    } else {
      // let resInfo = JSON.parse(localStorage.getItem("resInfo")) || {};
      let isfromDiffRestaurant = resInfo?.name !== restaurantInfo?.name;
      // console.log(isfromDiffRestaurant);
      if (isfromDiffRestaurant && resInfo.name != undefined) {
        // console.log("tring ");
        dispatch(setItemToBeAdded({ two, restaurantInfo }));
        dispatch(setPopUp(true));
      } else {
        // console.log("tring tring ");
        dispatch(addToCart({ two, restaurantInfo }));
        toast.success("Added successfully to cart..");
        dispatch(setInfo(restaurantInfo));
      }
    }
  }
  return (
    <button
      onClick={handleAddToCart}
      className={`fourth:px-5 fourth:text-[14px] exsmall:px-5 exsmall:py-[3px] exsmall:text-sm absolute  bottom-[-8px] shadow-[0_6px_15px_rgba(0,0,0,0.3)]   bg-white  py-[5px] px-9 rounded-md border-b border-black/30 font-bold uppercase text-green-600 hover:bg-gray-200 `+(positions?` right-${positions.right} `:`left-1/2 -translate-x-1/2`)}
    >
      Add
    </button>
  );
}

export default AddToCartBtn;
