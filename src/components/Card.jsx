import React from "react";
import star from "../assets/star.png";
import { Link } from "react-router-dom";
function Card({
  data: {
    cta:{
      link
    },
    info: {
      cloudinaryImageId,
      id,
      name,
      city,
      avgRating,
      sla: { slaString },
      cuisines,
      areaName,
      aggregatedDiscountInfoV3,
    },
  },
}) {
  // extrasmall:w-[200px] lg:w-[280px]  md:w-[210px] small:w-[230px]
  return (
       
    <Link to={`/restaurantMenu/city/${city}/${areaName}/${id}`}>
    <div className=" vsmall:w-[150px]  exsmall:w-[200px] fourth:w-[250px]   third:w-[210px] second:w-[240px] w-[270px]   cursor-pointer hover:scale-90 transition-all duration-300 ease-in-out flex  flex-col gap-2">
      <div className=" vsmall:w-[150px] vsmall:h-[110px] exsmall:w-[200px] exsmall:h-[130px] fourth:w-[250px] fourth:h-[180px]   third:w-[210px] third:h-[150px] second:w-[240px] second:h-[160px]  w-[270px] h-[180px] rounded-xl relative group ">
        {" "}
        <img
          className={` hover:cursor-pointer h-full w-full  object-cover rounded-xl `}
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_273,h_183,c_fill/${cloudinaryImageId}`}
        ></img>
        <div className="w-full h-full absolute top-0 bg-gradient-to-t from-black from-1% to-transparent to-40%  rounded-xl text-white font-bold text-xl small:text-[14px] exsmall:text-[12px] flex items-end pl-3 tracking-tight">
          {aggregatedDiscountInfoV3
            ? (aggregatedDiscountInfoV3.header?(aggregatedDiscountInfoV3.header):'')+
              " " +
              (aggregatedDiscountInfoV3.subHeader?(aggregatedDiscountInfoV3.subHeader):'')
            : ""}
        </div>
      </div>
      <div className="flex flex-col gap-1 pl-3 pt-1">
        <p className="font-bold text-[18px] line-clamp-1 betsmmd:text-[16px]">{name}</p>
        <div className="font-semibold  gap-2 ">
          <div className="flex gap-2">
            <div className="flex gap-1 items-center">
              {/* <img src={star} alt="" /> */}
              <i className="fi fi-ss-circle-star mt-1 text-green-600 text-lg"></i>
              {/* <i class="flaticon-star text-green-500 text-xl"></i> */}

              <p className="  betsmmd:text-[14px]">{avgRating}</p>
            </div>
            <div className="flex items-center">
              <p className="font-semibold pb-1">.</p>
              <p className=" text-[17px] betsmmd:text-[14px]">{slaString}</p>
            </div>
          </div>
          <p className="w-full  text-black/50 line-clamp-1 betsmmd:text-[14px]">
            {cuisines.join(", ")}
          </p>
          <div className="text-black/50 betsmmd:text-[14px]">{areaName}</div>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default Card;
