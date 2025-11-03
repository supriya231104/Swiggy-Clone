import React, { useContext, useState } from "react";

import PopUpDiffRest from "./PopUpDiffRest";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../utils/cartSlice";
import { setItemToBeAdded, setPopUp } from "../utils/toggleSlice";
import toast from "react-hot-toast";
import { setInfo } from "../utils/restaurantInfoSlice";
import AddToCartBtn from "./AddToCartBtn";

function TopPicksCard({ one, restaurantInfo }) {
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);

  const dispatch = useDispatch();
  // console.log(restaurantInfo);
  // const { restaurantInfo } = useContext(ResTaurantInfo);
  //  const restaurantInfo=useSelector((state)=>state.restaurantInfoSlice.info)

  const {
    creativeId,
    dish: {
      info: { imageId, price, defaultPrice, id },
    },
  } = one;
  let two = one;
  // function handleAddToCart() {
  //   const isPresent = cartData?.some((oneItem) => {
  //     return oneItem?.dish?.info?.id === id;
  //   });
  //   if (isPresent) {
  //     toast.error("Item is already present in cart !")
  //     console.log(isPresent);
  //     // alert("Item is already present in cart !");
  //   } else {
  //     let resInfo = JSON.parse(localStorage.getItem("resInfo")) || {};
  //     let isfromDiffRestaurant = resInfo?.name !== restaurantInfo?.name;
  //     if (isfromDiffRestaurant && resInfo.name != undefined) {
  //       dispatch(setPopUp(true));
  //        dispatch(setItemToBeAdded({two,restaurantInfo}))

  //     } else {
  //       dispatch(addToCart({ two, restaurantInfo }));
  //       dispatch(setInfo(restaurantInfo))
  //       toast.success("Added successfully to cart..")
  //     }
  //   }
  // }
  return (
    <div className="w-full">
      <div className="">
        <div className="w-[300px] relative second:w-[230px] fourth:w-[180px] vsmall:w-[150px]">
          <img
            className="w-full h-full object-cover"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${creativeId}`}
            alt=""
          />
          <div className="w-full flex justify-between items-center absolute bottom-5 px-3">
            <p className="text-white third:text-[10px]">
              ₹{(price || defaultPrice) / 100}
            </p>
            {/* <button
              onClick={handleAddToCart}
              className="second:px-5 fourth:px-3 third:text-[10px] shadow-[0_6px_15px_rgba(0,0,0,0.3)]   bg-white  py-[5px] px-9 rounded-md border-b border-black/30 font-bold uppercase text-green-600 hover:bg-gray-200  "
            >
              Add
            </button> */}
            <AddToCartBtn
              restaurantInfo={restaurantInfo}
              two={two}
              positions={{ right: 3, bottom: 0 }}
            ></AddToCartBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopPicksCard;
