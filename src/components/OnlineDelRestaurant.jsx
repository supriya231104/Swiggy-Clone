import React, { act, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { addFilter, removeAllFilter, removeFilter } from "../utils/filterSlice";
import FilterBtn from "./FilterBtn";

function OnlineDelRestaurant({ onlineDeliveryData, title }) {
  const filterVal = useSelector((state) => state.filterSlice.filterVal);
  const filteredData = useSelector((state) => state.filterSlice.filteredData);
  const isLoading = useSelector((state) => state.restaurantInfoSlice.isLoading);
  const dispatch=useDispatch()
  // console.log(filterVal);
  // console.log(isLoading);
  // console.log(activeBtn);
  // console.log(filterVal);
  const filterOptions = [
    {
      name: "Rating 4.0+",
    },
    {
      name: "Offers",
    },
    {
      name: "Rs.300 - Rs.600",
    },
    {
      name: "Less than Rs. 300",
    },
    {
      name: "Pure Veg",
    },
    {
      name: "Fast Delivery",
    },
  ];

  return (
    <div className="w-full py-2 px-3">
      {title && <h1 className="font-bold text-xl betsmmd:text-[16px]">{title}</h1>}
      <div className="filters  flex w-full py-8 gap-2 flex-wrap fourth:py-10">
        {filterOptions.map((one, i) => {
          return <FilterBtn key={i} name={one.name} />;
        })}
      </div>
      {/* {console.log(filteredData, filterVal)} */}
      {isLoading ? (
        <div className="w-full py-10 text-center text-gray-500 text-xl betsmmd:text-[14px]">
          Loading...
        </div>
      ) : filteredData?.length == 0 && filterVal?.length > 0 ? (
        <div className="w-full flex flex-col items-center justify-center py-5 px-4 
   
      my-5">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2 betsmmd:text-[14px]">
            Oops! No restaurants found
          </h2>
          <p className="text-gray-500 text-center max-w-xl betsmmd:text-[12px]">
            We couldn’t find any restaurants matching your selected filters. Try
            adjusting your filters or explore nearby options!
          </p>
          <button onClick={()=>{
            dispatch(removeAllFilter())
            
          }} className="mt-6 betsmmd:text-[12px] bg-orange-400 text-white px-6 py-2 rounded-full shadow hover:bg-orange-500 transition">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="w-full gap-y-5 grid 2xl:grid-cols-4 lg:grid-cols-4 first:grid-cols-3 second:grid-cols-3 third:grid-cols-3 fourth:grid-cols-2  exsmall:grid-cols-2 exsmall:gap-y-5 exsmall:gap-x-2">
          {onlineDeliveryData?.map((one,i) => {
            // console.log(one);
            return <Card data={one} key={i}></Card>;
          })}
        </div>
      )}
    </div>
  );
}

export default OnlineDelRestaurant;
