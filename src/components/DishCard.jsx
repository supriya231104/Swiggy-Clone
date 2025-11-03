import React from "react";
import star from "../assets/star-16.ico";
import veg from "../assets/Veg Logo.jpeg";
import non_veg from "../assets/non_veg.jpg";
import {Link} from "react-router-dom"
import AddToCartBtn from "./AddToCartBtn";
import { useDispatch } from "react-redux";
import {  setSimilarRes, toggleSimilarRes } from "../utils/toggleSlice";
function DishCard({ data }) {
  const dispatch=useDispatch()
  if (!data) {
    return <p>khali hai</p>;
  }
  const two=data?.card
  const {
    card: {
      card: {
        info,
        restaurant: { info: restaurantInfo },
      },
    },
  } = data;

  const {
    avgRating,
    name,
    areaName,
    city,
    id,
    cloudinaryImageId,
    sla: { minDeliveryTime, maxDeliveryTime },
    slugs:{
      city:restaurantCity,
      restaurant
    }
  } = restaurantInfo;
  const { isVeg, name: itemName, price, defaultPrice, imageId,id:itemId } = info;
  // console.log( data);
  function handleSameRestaurant(){
    // console.log("ohoooo lelo same retaurant se ");
    dispatch(toggleSimilarRes())
    dispatch(setSimilarRes({
      isSimilarRestaurantDishes:true,
      city:restaurantCity,
      restId:id,
      itemId:itemId,
      resLocation:restaurant
    }))

  }
  return (
    <div className="fourth:w-full min-w-[320px] min-h-[240px] first:min-w-[350px] first:min-h-[240px] second:min-w-[360px] second:min-h-[210px] betSecondandThird:min-h-[230px] betSecondandThird:min-w-[300px]  px-3 flex flex-col gap-3 bg-white rounded-3xl">
      <Link to={`/restaurantMenu/city/${city?city:''}/${areaName?areaName:''}/${id?id:''}`}>
      <div className="top w-full flex items-center justify-between border-b border-dashed border-black/60 py-3 ">
        <div className="left flex flex-col ">
          <p className="text-sm font-bold text-black/60">By {name}</p>
          <div className="w-full flex gap-2 items-center">
            <img src={star} className="w-3" alt="" />
            <p className="text-[12px] text-black/70 font-semibold">
              {avgRating}
            </p>
            <p className="text-[12px] text-black/70 font-semibold">
              {" "}
              . {minDeliveryTime}-{maxDeliveryTime} MINS
            </p>
          </div>
        </div>

        <i className="fa-solid fa-arrow-right text-black/30"></i>
      </div>
      </Link>
      <div className="bottom w-full  flex justify-between pt-3 ">
        <div className="left flex flex-col gap-2 w-[40%] fourth:w-[60%]">
          <img className="w-4" src={isVeg ? veg : non_veg} alt="" />
          <div className="flex flex-col justify-center w-full">
            <p className="font-medium text-black/80 second:text-[14px] w-full">{itemName}</p>
            <p className="font-medium ">
              ₹{price ? price / 100 : defaultPrice / 100}
            </p>
          </div>
        </div>
        {imageId && <div className="right w-[125px] h-[110px] first:w-[120px] first:h-[110px] second:w-[100px] second:h-[100px] fourth:w-[125px] fourth:h-[110px] exsmall:w-[100px] exsmall:h-[100px]  rounded-xl relative">
          <img
            className="w-full h-full rounded-xl object-cover"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${imageId}`}
            alt=""
          />
          {/* <button className="vsmall:w-[50px] vsmall:px-2 vsmall:text-[8px]  absolute bottom-[-10px] left-1/2 -translate-x-1/2 shadow-[0_6px_15px_rgba(0,0,0,0.3)]   bg-white  py-[5px] px-9 rounded-md border-b border-black/30 font-bold uppercase text-green-600 hover:bg-gray-200  ">
            Add
          </button> */}
          <div onClick={handleSameRestaurant}>

          <AddToCartBtn restaurantInfo={restaurantInfo} two={two}></AddToCartBtn>
          </div>
        </div>}
      </div> 
    </div>
  );
}

export default DishCard;
