import React from "react";
import { useState, useEffect } from "react";

import Card from "./Card";
function TopEats({ data, title }) {
  const [pos, setPos] = useState(0);
  // console.log(data);
  function scroll(dir) {
    let dis = 620;

    setPos((prev) => {
      let val = dir == "left" ? prev + dis : prev - dis;

      return val;
    });
  }
  return (
    <>
      <div className="w-full flex justify-between mt-10 fourth:px-3">
      {  <h1 className="font-bold text-xl betsmmd:text-[16px]">{title}</h1>}

        <div className="btns flex gap-3">
          <div
            onClick={(e) => {
              scroll("left");
            }}
            className={`w-7 h-7 betsmmd:p-2 bg-[#949698]  flex items-center justify-center  p-4 py-[17px]   rounded-[50%] cursor-pointer bg-opacity-30 hover:bg-opacity-70 `}
          >
            <i className="fi fi-rr-arrow-left text-[16px] text-black m-0 p-0  scale-80"></i>
          </div>
          <div
            onClick={(e) => {
              scroll("right");
            }}
            className={`w-7 h-7 betsmmd:p-2 bg-[#949698]  flex items-center justify-center  p-4 py-[17px]   rounded-[50%] cursor-pointer bg-opacity-30 hover:bg-opacity-70 `}
          >
            <i className="fi fi-rr-arrow-right text-[16px] text-black  m-0 p-0 scale-80"></i>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-scroll   container ">
        <div
          className={`flex w-full gap-8   duration-700  md:pb-5`}
          style={{
            transform: `translateX(${pos}px)`,
          }}
        >
          {/* {console.log(data)} */}
          {data?.map((one,i) => (
            
            <Card key={i} data={one}></Card>
          ))}
        </div>
      </div>
      <hr className="w-full" />
    </>
  );
}

export default TopEats;
