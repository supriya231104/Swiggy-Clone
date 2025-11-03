import { useEffect, useRef } from "react";
import { useState } from "react";
import PlatterSlider from "./PlatterSlider";
import TopEats from "./TopEats";
import OnlineDelRestaurant from "./OnlineDelRestaurant";

import Unserviceble from "./Unserviceble";
import { useDispatch, useSelector } from "react-redux";
import { applyFilter } from "./filters";
import { setFilteredData } from "../utils/filterSlice";
import { setIsLoading } from "../utils/restaurantInfoSlice";
import Shimmer from "./Shimmer";
import useRestaurantData from "../hooks/useRestaurantData";
function Body() {
 const  [isUnserviceble,wholeData,topRestaurantData,platterData,titl,filterVal,filteredData]=useRestaurantData()
//  console.log(wholeData) 
 return (
    <div className="w-full flex justify-center items-center ">
      {wholeData?.data? (
        isUnserviceble ? (
          <Unserviceble wholeData={wholeData}></Unserviceble>
        ) : (
          <div className="md:w-[90%]  w-[95%] mx-auto   mt-5  flex flex-col items-start gap-3  ">
            <>
              {platterData.length > 0 && (
                <PlatterSlider
                  platterData={platterData}
                  title={titl[0]}
                ></PlatterSlider>
              )}
              <TopEats data={topRestaurantData} title={titl[1]}></TopEats>
              {
                <OnlineDelRestaurant
                  onlineDeliveryData={
                    filterVal.length > 0 ? filteredData : topRestaurantData
                  }
                  title={titl[2]}
                ></OnlineDelRestaurant>
              }
            </>
          </div>
        )
      ) : (
        <Shimmer></Shimmer>
      )}
    </div>
  );
}

export default Body;
