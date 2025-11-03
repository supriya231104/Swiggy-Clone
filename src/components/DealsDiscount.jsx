import React from "react";
import ScrollBtns from "./ScrollBtns";
import { useRef } from "react";

function DealsDiscount({ deal }) {
  const dealsRef = useRef(null);
  return (
    <div className="small:px-3">
      <div className="flex w-full justify-between">
        <p className="text-xl font-bold small:text-[16px] exsmall:text-[14px]">Deals for you</p>

        <ScrollBtns reference={dealsRef.current}></ScrollBtns>
      </div>

      <div className=" w-full  overflow-x-scroll container pt-4 ">
        <div className={` flex gap-4  duration-300 `} ref={dealsRef}>
          {deal.map(({ info: { offerLogo, header, description } }, i) => {
            return (
              <div
                key={i}
                className="flex cursor-pointer  gap-2 border border-gray-400/60 min-w-[340px] small:min-w-[240px] small:py-1 py-3 px-2 rounded-3xl"
              >
                <img
                  className="w-12 small:w-8"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`}
                  alt=""
                />
                <div className="lowercase ">
                  <p className="font-bold text-[18px] small:text-[14px]">{header}</p>
                  <p className="font-bold text-[14px] small:text-[10px] text-black/40 uppercase">
                    {description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DealsDiscount;
