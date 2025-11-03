import React from "react";
import DishCard from "./DishCard";
import star from "../assets/star-16.ico";
import veg from "../assets/Veg Logo.jpeg";
import non_veg from "../assets/non_veg.jpg";
import { Link } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";

function SameRestaurantCompo({ selectedRes, dishesFromSameRes }) {
  // console.log(selectedRes, dishesFromSameRes);
  if (!selectedRes || !dishesFromSameRes) {
    return;
  }
  const {
    card: {
      info,
      restaurant: { info: restaurantInfo },
    },
  } = selectedRes;
  const {
    isVeg,
    name: itemName,
    price,
    defaultPrice,
    imageId,
    id: itemAddedId,
  } = info;
  const {
    avgRating,
    name,
    areaName,
    city,
    id,
    cloudinaryImageId,
    sla: { minDeliveryTime, maxDeliveryTime },
  } = restaurantInfo;
  // console.log(restaurantInfo);
  // city,areaName,id,star,avgRating,minDeliveryTime,maxDeliveryTime,isVeg,itemName,imageId
  return (
    <div className="w-full flex flex-col items-start gap-5">
      <p className="text-sm font-bold text-black/80">Item added to cart </p>
      <div className="exsmall:w-full exsmall:h-[200px] w-[350px] h-[240px]   px-3 flex flex-col gap-3 bg-white rounded-3xl mt-5">
        <Link
          to={`/restaurantMenu/city/${city ? city : ""}/${
            areaName ? areaName : ""
          }/${id ? id : ""}`}
        >
          <div className="top w-full flex items-center justify-between border-b border-dashed border-black/60 py-3 ">
            <div className="left flex flex-col ">
              <p className="text-sm font-bold text-black/60">By {name}</p>
              <div className="w-full flex gap-2 items-center">
                <img src={star} className="w-3" alt="" />
                <p className="text-[12px]  font-semibold">{avgRating}</p>
                <p className="text-[12px]  font-semibold">
                  {" "}
                  . {minDeliveryTime}-{maxDeliveryTime} MINS
                </p>
              </div>
            </div>

            <i className="fa-solid fa-arrow-right text-black/30"></i>
          </div>
        </Link>
        <div className=" w-full  flex justify-between pt-3 ">
          <div className="left flex flex-col gap-2 w-[40%]">
            <img className="w-4" src={isVeg ? veg : non_veg} alt="" />
            <div className="flex flex-col justify-center">
              <p className="font-medium text-black/80 exsmall:text-sm">{itemName}</p>
              <p className="font-medium ">
                ₹{price ? price / 100 : defaultPrice / 100}
              </p>
            </div>
          </div>
          {imageId && (
            <div className="right  exsmall:w-[110px] exsmall:h-[100px]  w-[135px] h-[125px] rounded-xl relative">
              <img
                className="w-full h-full rounded-xl object-cover"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${imageId}`}
                alt=""
              />
              {/* <button className="vsmall:w-[50px] vsmall:px-2 vsmall:text-[8px]  absolute bottom-[-10px] left-1/2 -translate-x-1/2 shadow-[0_6px_15px_rgba(0,0,0,0.3)]   bg-white  py-[5px] px-9 rounded-md border-b border-black/30 font-bold uppercase text-green-600 hover:bg-gray-200  ">
          Add
        </button> */}
            </div>
          )}
        </div>
      </div>
      <p className="font-medium">More dishes from this restaurant</p>
      <div className="w-full flex flex-col items-center gap-5">
      <div className="w-full grid  grid-cols-2 gap-y-4 gap-x-4 fourth:grid-cols-1">
        {dishesFromSameRes.map(({ card },i) => {
          const {
            info: { isVeg, name, price, defaultPrice, imageId },
          } = card;
          return (
            <div key={i} className="fourth:w-full fourth:min-h-[150px]  first:min-w-[350px] first:min-h-[200px] second:min-w-[360px] second:min-h-[210px] betSecondandThird:min-h-[210px] betSecondandThird:min-w-[320px]  min-w-[330px] min-h-[200px] rounded-3xl bg-white flex justify-between py-3 items-center px-3">
              <div className="left flex flex-col gap-2 w-[40%]">
                <img className="w-4" src={isVeg ? veg : non_veg} alt="" />
                <div className="flex flex-col justify-center gap-3 ">
                  <p className="font-medium text-black/80  exsmall:text-sm  ">{name}</p>
                  <p className="font-medium exsmall:text-sm">
                    ₹{price ? price / 100 : defaultPrice / 100}
                  </p>
                </div>
              </div>
              {imageId && (
                <div className=" right fourth:w-[100px] fourth:h-[90px] first:w-[120px] first:h-[110px] w-[135px] h-[125px]  rounded-xl relative">
                  <img
                    className="w-full h-full rounded-xl object-cover"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${imageId}`}
                    alt=""
                  />
                  <AddToCartBtn
                    restaurantInfo={restaurantInfo}
                    two={card}
                  ></AddToCartBtn>
                  {/* <button className="vsmall:w-[50px] vsmall:px-2 vsmall:text-[8px]  absolute bottom-[-10px] left-1/2 -translate-x-1/2 shadow-[0_6px_15px_rgba(0,0,0,0.3)]   bg-white  py-[5px] px-9 rounded-md border-b border-black/30 font-bold uppercase text-green-600 hover:bg-gray-200  ">
          Add
        </button> */}
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>
    </div>
    // <div>hello</div>
  );
}

export default SameRestaurantCompo;
