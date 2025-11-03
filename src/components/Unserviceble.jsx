import React from "react";
import { useState } from "react";

function Unserviceble({
  wholeData: {
    data: { cards },
  },
}) {
  //  console.log(cards);
  const hero = cards[0]?.card?.card;
  const topCities = cards[1]?.card?.card;
  const downloadApp = cards[2]?.card?.card;
  const otherCities = cards[3]?.card?.card;
  // console.log(hero);
  // console.log(topCities);
  // console.log(downloadApp);
  // console.log(otherCities);
  // console.log(wholeData)
  return (
    <div className="w-full flex flex-col items-center px-5">
      {/* hero sec  */}
      <div className="w-full flex justify-center min-h-[400px] items-center  ">
        <div className="flex flex-col gap-2 items-center py-5">
          <div className="w-48">
            <img
              className="w-full h-full "
              src={`https://media-assets.swiggy.com/swiggy/image/upload/portal/m/location_unserviceable
`}
              alt=""
            />
          </div>
          <p className="mt-4 font-bold text-[20px]">{hero.title}</p>
          <p className="w-[60%] text-center text-sm text-black/70">
            {" "}
            We don't have any services here right now. Try changing location.
          </p>
        </div>
      </div>
      {/* topcities sec  */}
      <div className="flex justify-start w-full flex-col gap-5 py-3">
        <p className="text-[25px] font-bold w-full ">{topCities?.title}</p>
        <div className="w-full flex gap-x-2 gap-y-3 flex-wrap  items-center justify-between">
          {topCities?.cities?.map((one ,i)=>{
            // console.log(one);
            return <p key={i} className="border border-gray-300/70 py-3 w-[350px] text-center rounded-lg cursor-pointer text-black/75 font-semibold">{one?.text}</p>
          })}
        </div>
      </div>
    </div>
  );
}

export default Unserviceble;
