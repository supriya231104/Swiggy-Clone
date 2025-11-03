import React, { createContext, useRef } from "react";
import { useState, useEffect } from "react";
import ScrollBtns from "./ScrollBtns";
function PlatterSlider({ platterData,title }) {
  
  const [pos, setPos] = useState(0);
  const platterRef=useRef()

  // console.log(platterData);
  return (

    platterData && <>
      <div className="w-full flex justify-between fourth:px-3 gap-2">
        {title && <h1 className="font-bold text-xl betsmmd:text-[16px]">{title}</h1>}
  
       <ScrollBtns reference={platterRef.current}></ScrollBtns>
      </div>
      <div className="w-fit overflow-x-scroll   container ">
        <div
          className={`flex w-full  gap-8  duration-1000  md:pb-5`}
          ref={platterRef}
        >
          {platterData?.map((one, i) => (
            <img
            key={i}
              className={` fourth:w-[90px] w-[130px] hover:cursor-pointer `}
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${one.imageId}`}
              alt=""
            />
          ))}
        </div>
      </div>
      <hr className="w-full" />
    </>
  );
}

export default PlatterSlider;
