import React, { useContext } from "react";
import { useState } from "react";
import veg from "../assets/Veg Logo.jpeg";
import non_veg from "../assets/non_veg.jpg";
// import AddBtn from "./AddBtn";


import { useDispatch, useSelector } from "react-redux";

import AddToCartBtn from "./AddToCartBtn";
function SubCard(props) {
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);
  const popUpStatus = useSelector((state) => state.toggleSlice.popUpStatus);
  const dispatch = useDispatch();
  // const { restaurantInfo } = useContext(ResTaurantInfo);
  const info = useSelector((state) => state.restaurantInfoSlice.info);
  let { two, fromToCart,restaurantInfo } = props;
  // console.log(restaurantInfo);

  const {
    card: {
      info: {
        name,
        defaultPrice,
        price,
        ratings: { aggregatedRating: { rating, ratingCountV2 } = {} } = {},
        description = "",
        imageId,
        isBestseller,
        isVeg,
        id,
      },
    },
  } = two;

  let [showMoreLess, setShowMoreLess] = useState(true);
  let trimString =
    description?.substring(
      0,
      showMoreLess ? description.length / 2 : description.length
    ) + (showMoreLess ? "..." : "");
  return (
    <div className="w-full">
      {" "}
      <div className="subcard w-full flex  items-center  py-8 small:px-3">
        <div className="left flex flex-col gap-2 justify-center vsmall:w-[75%] small:w-[80%]  md:w-[80%] lg:w-[80%] pr-3">
          <div className="flex w-full justify-start gap-2 items-center">
            <img className="w-4" src={isVeg ? veg : non_veg} alt="" />
            <p className="text-red-500 text-sm ">
              {isBestseller ? "BestSeller" : ""}
            </p>
          </div>
          <p className="font-bold text-black/60 text-[18px] fourth:text-[16px] vsmall:text-[12px]">{name}</p>
          <p className="font-semibold fourth:text-[14px] vsmall:text-[12px] ">
            ₹
            {(defaultPrice ? defaultPrice / 100 : "") ||
              (price ? price / 100 : "")}
          </p>
          <div className="flex gap-2 items-center text-[15px]">
            <i
              className={`fas fa-star text-[10px] ${
                rating ? "" : "hidden"
              } text-${rating > 3.5 ? "green-700" : "red-600"}`}
            ></i>
            <p className="text-green-950 font-semibold fourth:text-[14px] vsmall:text-[12px]">
              {rating ? rating : "No reviews"}
            </p>
            <p
              className={`text-black/80 font-semibold ${
                ratingCountV2 ? "" : "hidden"
              }`}
            >
              ({ratingCountV2})
            </p>
          </div>

          {description?.length > 130 ? (
            <div className="">
              <p
                className={` text-black/60 text-[16px] font-semibold w-[70%] third:w-[80%] fourth:w-[90%] fourth:text-[14px] vsmall:text-[12px] `}
              >
                {trimString}
                <span
                  onClick={() => {
                    setShowMoreLess(!showMoreLess);
                  }}
                  className="font-semibold text-black/90 cursor-pointer text-sm vsmall:text-[12px]"
                >
                  {showMoreLess ? " Show more" : " Show less"}
                </span>
              </p>
            </div>
          ) : (
            <p className="w-[70%] text-black/60 fourth:text-sm vsmall:text-[12px]">{description}</p>
          )}
        </div>
        <div className="right vsmall:w-[25%]   small:w-[19%]  md:w-[20%] lg:w-[20%]   aspect-square  rounded-xl relative flex flex-col items-center">
          {imageId && (
            <img
              className="w-full h-full object-cover rounded-xl "
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
              alt=""
            />
          )}
          {
          
           <AddToCartBtn restaurantInfo={restaurantInfo} two={two} ></AddToCartBtn>
          }
        </div>
      </div>
      <hr className="w-full  h-[1px]" />
    </div>
  );
}

export default SubCard;
