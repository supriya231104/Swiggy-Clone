import React from "react";
import { useState } from "react";
import SubCard from "./SubCard";
function MenuCard({ one,restaurantInfo }) {
  // console.log(restaurantInfo);
  let isType = false;
  if (one["@type"]) {
    isType = true;
  }
  const [current, SetCurrent] = useState(isType);
  function toggleDropDown() {
    SetCurrent(!current);
  }
  if (one.itemCards) {
    return (
      <div className="card w-full ">
        <div
          onClick={() => {
            toggleDropDown();
          }}
          className="flex w-full justify-between items-center cursor-pointer second:px-3  "
        >
          <p
            className={`font-bold ${isType ? "text-xl second:text-[18px] vsmall:text-[14px] " : "second:text-[16px] vsmall:text-[12px]"} `}
          >{`${one.title} (${one?.itemCards?.length})`}</p>
          {/* <img className="w-3 font-bold" src={upload} alt="" /> */}
          <i
            className={`text-sm fi fi-rr-angle-${current ? "up" : "down"}  `}
          ></i>
          {/* <i className="text-xl fi fi-rr-angle-small-down"></i> */}
        </div>
        {current &&
          one.itemCards.map((two,i) => {
            return <SubCard key={i} two={two} restaurantInfo={restaurantInfo}></SubCard>;
          })}
        {one["@type"] ? (
          <div className="bg-black/10 w-full h-[15px] mt-2"></div>
        ) : (
          <hr className="border-black/70  w-full h-[1px] mt-2"></hr>
        )}
      </div>
    );
  } else {
    return (
      <div className="card w-full second:px-3 ">
        <div className="flex w-full justify-between items-center  ">
          <p className=" font-bold text-[20px] second:text-[18px] vsmall:text-[14px]">{`${one.title} `}</p>
        </div>
        <div className="py-2">
          {one.categories.map((one,i) => {
            return (
              <div key={i} className="w-full py-2">
                <MenuCard one={one}></MenuCard>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default MenuCard
