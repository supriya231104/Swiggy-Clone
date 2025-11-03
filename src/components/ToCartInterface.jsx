import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import CartItemCard from "./CartItemCard";
import SubCard from "./SubCard";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../utils/cartSlice";
import toast from "react-hot-toast";
import { clearInfo } from "../utils/restaurantInfoSlice";
import { toggleLogin } from "../utils/toggleSlice";

function ToCartInterface() {
  // const { cartData, SetCartData } = useContext(CartContext);
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const navigate = useNavigate();
  const { isSignIn } = useSelector((state) => state.userInfoSlice.userInfo);
  const restaurantInfo = useSelector((state) => state.restaurantInfoSlice.info);
  const dispatch = useDispatch();
  // console.log(restaurantInfo);
  const {
    city,areaName,id
  }=restaurantInfo
  // const {info:{id}}=restaurantInfo

  let total = 0;
  function findTotal(p) {
    // console.log(p);
    total += p;
  }

  function handleRemoveFromCart(i) {
    // console.log(i);
    dispatch(removeFromCart(i));
    toast.success("Item removed sucessfully");
  }
  function handlePlaceOrder() {
    if (isSignIn) {
      toast.success("Order has been placed successfully");
    } else {
      toast.error("Please login before proceeding...");
      dispatch(toggleLogin());
    }
  }
  function handleClearCart() {
    dispatch(clearCart());
    dispatch(clearInfo());
    toast.success("Cart is cleared");
  }
  return (
    <div className="w-full flex flex-col  justify-center min-h-screen items-center ">
      <div className="w-[58%] second:w-[85%] flex flex-col items-center">
     {cartData.length>0 && <div className="w-full flex flex-col">
     <Link to={`/restaurantMenu/city/${city?city:''}/${areaName?areaName:''}/${id?id:''}`}>
     <div  className="pt-10 flex  items-center w-full gap-5">
          <img
            className="w-32 h-32 rounded-md exsmall:w-28 exsmall:h-28"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${restaurantInfo?.cloudinaryImageId}`}
            alt=""
          />
          <div className="flex flex-col ">
            <p className="text-2xl font-semibold pb-1 border-black border-b-[1px] exsmall:text-[18px]">
              {restaurantInfo.name}
            </p>
            <p className="text-black/50 font-medium exsmall:text-[12px]">
              {restaurantInfo.areaName}
            </p>
          </div>
        </div>
     </Link>
        <hr className="w-full mt-5 border-black/70" />
      </div>}
        <div className="w-full flex flex-col gap-3 py-5 px-2 items-center h-full justify-center">
          {cartData?.length > 0 ? (
            <>
              <div className="w-full flex flex-col gap-3 ">
                {cartData.map((two, i) => {
                  // console.log(two);
                  const main = two?.card || two?.dish || two;
                  const {
                    info: { price, defaultPrice },
                  } = main;
                  findTotal(price ? price / 100 : defaultPrice / 100);
                  return (
                    <div key={i}>
                      <div className="flex w-full justify-between items-center gap-6 relative pt-2 ">
                        <div className="flex w-full flex-col">
                          <CartItemCard data={main}></CartItemCard>
                          {/* <SubCard two={two} ></SubCard> */}
                          {i != cartData.length - 1 && (
                            <hr className="w-full  h-[1px]" />
                          )}
                        </div>

                        <i
                          onClick={() => {
                            handleRemoveFromCart(i);
                          }}
                          className="fa-solid fa-xmark absolute right-0 top-0 text-black/40 text-[15px] pb-2"
                        ></i>
                      </div>
                      {/* <p>{totalPrice}</p> */}
                    </div>
                  );
                })}
              </div>
              <hr className="w-full bg-black/60 border-none h-[1px] my-2" />
              <div className="w-full flex flex-col items-end gap-5">
                <p className="font-bold exsmall:text-[14px]">Total - ₹{Math.round(total)}</p>

                <div className="w-full flex justify-between items-center">
                  <button
                    onClick={() => handlePlaceOrder()}
                    className="exsmall:px-3 exsmall:py-1 exsmall:text-[14px] px-5 py-2  rounded-md bg-[#fe5105] text-white text-lg font-semibold shadow-lg  transition-all duration-200 cursor-pointer"
                  >
                    Place Order
                  </button>

                  <button
                    onClick={() => handleClearCart()}
                    className="exsmall:px-3 exsmall:py-1 exsmall:text-[14px] px-5 py-2 rounded-md bg-[#ff0000d9] text-white text-lg font-semibold shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 cursor-pointer"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-screen w-full flex flex-col items-center gap-6 justify-center ">
              <img
                className="w-36 -rotate-12 exsmall:w-28"
                src="https://cdn-icons-png.flaticon.com/512/9917/9917470.png"
                alt=""
              />
              <div className="flex w-full flex-col gap-2 items-center">
                <p className="text-[20px] text-black/70 font-bold text-center exsmall:text-[18px]">
                  Hey it feels so light ...
                </p>
                <p className="text-black/50 text-center exsmall:text-[14px]">
                  There is nothing in your cart.Let's add some items.{" "}
                </p>
              </div>
              <Link to={"/"}>
                {" "}
                <p className="exsmall:text-[14px] px-6 py-2 font-semibold border border-orange-600/60 text-orange-600 hover:bg-orange-600 hover:border-transparent hover:cursor-pointer hover:text-white  ">
                  Add items to cart
                </p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToCartInterface;
