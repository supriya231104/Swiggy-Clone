import React from "react";
import star from "../assets/star-16.ico";
import { Link } from "react-router-dom";
function RestaurantCard({ data }) {
  // console.log(data);
  const {
    cloudinaryImageId,
    name,
    areaName,
    city,
    id,
    avgRating,
    sla: { minDeliveryTime, maxDeliveryTime },
    costForTwoMessage,
    cuisines,
    promoted,
    aggregatedDiscountInfoV3: { header, subHeader } = {},
  } = data;
  return (
    <Link
      to={`/restaurantMenu/city/${city ? city : ""}/${
        areaName ? areaName : ""
      }/${id ? id : ""}`}
    >
      <div className="exsmall:min-h-[200px] fourth:w-full fourth:justify-between   betSecondandThird:min-w-[320px] betSecondandThird:min-h-[160px]   2xl:min-w-[380px] min-w-[330px] min-h-[145px] first:min-w-[340px] bg-white exsmall:rounded-lg flex  gap-3 items-center px-3 -z-10 ">
        <div className="left exsmall:w-20 fourth:w-28 fourth:h-[100px] betSecondandThird:w-16 w-20 h-[90px] rounded-md relative ">
          <img
            className="w-full h-full object-cover rounded-md"
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/${cloudinaryImageId}`}
            alt=""
          />
          {/* {promoted && (
            <button className="bg-black/70 text-white px-[6px] py-[2px]  text-[10px] absolute top-0 left-0">
              Ad
            </button>
          )} */}
          <button className="flex exsmall:px-3 absolute left-1/2 bottom-[-8px] -translate-x-1/2 flex-col items-center px-5 rounded-md  shadow-[0_6px_15px_rgba(0,0,0,0.3)]   bg-white">
            <p className="w-full text-nowrap exsmall:text-[9px] text-[11px] text-[#ff5200] font-bold">
              {header}
            </p>
            <p className="w-full text-nowrap exsmall:text-[7px] text-[9px] text-[#ff5200] font-semibold">
              {subHeader}
            </p>
          </button>
        </div>
        <div className="fourth:w-[70%] exsmall:w-[80%] right exsmall:text-right flex flex-col items-start exsmall:items-end gap-2  ">
          <p className=" font-semibold w-full text-black/80 exsmall:text-sm ">{name}</p>
          <div className="flex items-center gap-2 justify-start w-full exsmall:flex-wrap exsmall:justify-end">
            <img src={star} className="w-3" alt="" />
            <p className="text-[12px] text-black/60 font-bold">{avgRating}</p>
            <p className="text-[12px] text-black/60 font-bold exsmall:text-[10px] text-nowrap">
              {" "}
              . {minDeliveryTime}-{maxDeliveryTime} MINS
            </p>
            <p className="text-[12px] text-black/60 font-bold w-full">
              {" "}
              . {costForTwoMessage}
            </p>
          </div>

          <p className="text-sm text-black/60 w-full ">{cuisines.join(", ")}</p>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;
export function withHoc(WrappedComp) {
  return (props) => {
    // console.log(props);
    return (
      <div className="relative">
        <button className="bg-black/60 text-white px-[6px] py-[2px]  text-[10px] absolute top-8 rounded-md font-medium left-2 z-10">
          Ad
        </button>
        <WrappedComp {...props}></WrappedComp>
      </div>
    );
  };
}
