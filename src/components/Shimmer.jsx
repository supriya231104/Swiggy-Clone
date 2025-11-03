import React from "react";

function Shimmer() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-5 ">
      <div className="bg-slate-900 w-full h-[300px] text-white flex flex-col items-center justify-center gap-5 ">
        <div className="w-full flex flex-col items-center relative">
          <span className="loader"></span>
          <img
            className="w-10 exsmall:w-7 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            src="	https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa"
            alt=""
          />
        </div>
        <h1 className="text-[26px] opacity-75 exsmall:text-[16px] ">
          Looking for great food near you ...
        </h1>
      </div>
      <div className="w-full px-3  grid 2xl:grid-cols-4 lg:grid-cols-4 first:grid-cols-3 second:grid-cols-3 third:grid-cols-3 fourth:grid-cols-2  exsmall:grid-cols-2 exsmall:gap-y-5 exsmall:gap-x-2">
        {Array(9)
          .fill()
          .map((one, i) => {
            return (
              <div
                key={i}
                className=" vsmall:w-[150px] vsmall:h-[110px] exsmall:w-[200px] exsmall:h-[130px] fourth:w-[250px] fourth:h-[180px]   third:w-[210px] third:h-[150px] second:w-[240px] second:h-[160px] animate w-[270px] h-[180px] bg-[#f3f4f4]/80 shadow-[1px_2px_10px_rgb(0,0,0,0.2)] rounded-xl  opacity-70 "
              >
                {" "}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Shimmer;

export function MenuShimmer() {
  return (
    <div className="second:w-[80%] third:w-[95%]  w-[55%] m-auto min-h-screen pt-8 gap-5 flex flex-col  px-3">
      <div className="w-full h-[170px] exsmall:h-[140px] mt-3 rounded-b-[40px]  animate bg-[#f2f2f2] "></div>
      <div className="w-full flex gap-3 justify-between">
        <div className=" vsmall:w-[150px] vsmall:h-[110px] exsmall:w-[200px] exsmall:h-[130px] fourth:w-[250px] fourth:h-[180px]   third:w-[210px] third:h-[150px] second:w-[240px] second:h-[160px]  w-[45%] h-[180px] rounded-xl animate-pulse bg-[#f2f2f284] "></div>
        <div className=" vsmall:w-[150px] vsmall:h-[110px] exsmall:w-[200px] exsmall:h-[130px] fourth:w-[250px] fourth:h-[180px]   third:w-[210px] third:h-[150px] second:w-[240px] second:h-[160px]  w-[45%] h-[180px] rounded-xl  animate-pulse bg-[#f2f2f290]"></div>
      </div>
      <div className="w-full mt-5 gap-4 flex flex-col justify-center items-center">
        {Array(5)
          .fill()
          .map((one,i) => {
            return (
              <div key={i} className="w-full flex justify-between">
                <div className="left w-[60%] flex flex-col gap-4 exsmall:w-full">
                  <div className="w-full h-10 animate exsmall:h-5"></div>
                  <div className="w-[50%] animate h-10 exsmall:h-5"></div>

                  <div className="w-[30%] animate h-10 exsmall:h-5"></div>
                </div>
                <div className="right w-[25%] h-[200px] animate rounded-xl exsmall:hidden"></div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export function SearchPageSkeleton() {
  return (
    <div className="w-[53%] mx-auto pt-5 flex flex-col gap-5">
      {/* Search Input Skeleton */}
      <div className="flex w-full items-center   px-3  gap-2 animate-pulse">
        
        <div className="flex-1 h-10 bg-gray-100 rounded"></div>
        
      </div>

      {/* Buttons Skeleton */}
      <div className="w-full flex mt-3 gap-3 animate-pulse">
        <button className=" shadow-none bg-gray-100  py-2 px-3  w-[100px] h-[30px]   rounded-3xl"></button>
        <button className=" shadow-none  bg-gray-100  py-2 px-3 w-[100px] h-[30px]   rounded-3xl"></button>
      </div>

      {/* Cards Skeleton */}
      <div className="w-full grid grid-cols-2 gap-x-2 gap-y-4 animate-pulse">
        <div className="h-48 bg-gray-100 rounded-lg"></div>
        <div className="h-48 bg-gray-100 rounded-lg"></div>
      </div>
    </div>
  );
}
export function CartSkeleton(){
  return  <div className="w-full flex flex-col justify-center min-h-screen items-center">
      <div className="w-[58%] second:w-[85%] flex flex-col items-center gap-5 animate-pulse">
        {/* Restaurant Info Skeleton */}
        <div className="w-full flex items-center gap-5 pt-10">
          <div className="w-32 h-32 bg-gray-100 rounded-md exsmall:w-28 exsmall:h-28"></div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-6 w-3/4 bg-gray-100 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-100 rounded"></div>
          </div>
        </div>
        <hr className="w-full border-gray-200" />

        {/* Cart Items Skeleton (2 cards) */}
        <div className="w-full flex flex-col gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex w-full justify-between gap-6 pt-2">
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-24 bg-gray-100 rounded"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2 mt-2"></div>
              </div>
              <div className=" bg-gray-100 w-32 h-32 rounded-md exsmall:w-28 exsmall:h-28"></div>
              {/* <div className="w-6 h-6 bg-gray-100 rounded"></div> */}
            </div>
          ))}
        </div>

        <hr className="w-full border-gray-200 my-2" />

        {/* Total + Buttons Skeleton */}
        <div className="w-full flex flex-col items-end gap-3">
          <div className="h-5 w-1/4 bg-gray-100 rounded"></div>
          <div className="w-full flex justify-between gap-3 mt-2">
            <div className="flex-1 h-10 bg-gray-100 rounded"></div>
            <div className="flex-1 h-10 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    </div>

}
export function RestaurantMenuSkeleton() {
  return (
    <div className="w-full relative animate-pulse">
      <div className="second:w-[80%] third:w-[95%] w-[55%] m-auto min-h-screen pt-8 gap-5 flex flex-col">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-3/4 bg-gray-100 rounded"></div>

        {/* Restaurant Info Skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-8 w-1/2 bg-gray-100 rounded"></div>
          <div className="w-full h-[170px] exsmall:h-[140px] mt-3 rounded-b-[40px] bg-gradient-to-t from-black/10 p-5 flex justify-center items-center">
            <div className="w-full border rounded-2xl h-full border-gray-200 bg-gray-100 flex flex-col gap-2 p-4 exsmall:p-2">
              <div className="h-6 w-1/4 bg-gray-100 rounded"></div>
              <div className="h-4 w-1/3 bg-gray-100 rounded"></div>
              <div className="flex gap-2">
                <div className="h-3 w-3 bg-gray-200 rounded-full"></div>
                <div className="flex-1 h-4 bg-gray-100 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Skeleton */}
        <div className="w-full h-16 bg-gray-100 rounded"></div>

        {/* Search Bar Skeleton */}
        <div className="w-full vsmall:w-[90%] py-3 bg-gray-100 rounded-xl relative"></div>

        {/* Top Picks Skeleton */}
        <div className="w-full h-36 bg-gray-100 rounded"></div>

        {/* Menu Cards Skeleton (2 cards as example) */}
        {[1, 2].map((i) => (
          <div key={i} className="w-full h-40 bg-gray-100 rounded"></div>
        ))}
      </div>
    </div>
  );
}

