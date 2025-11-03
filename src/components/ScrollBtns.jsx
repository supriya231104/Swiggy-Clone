import React from 'react'
import { useState } from 'react';
function ScrollBtns({reference}) {
    const [pos, setPos] = useState(0);
   {reference? reference.style.transform = `translateX(${pos}px)`:''}
  
    function scroll(dir) {
      let dis = 300;
      // console.log(pos);
     {reference? setPos((prev) => {
        let val = dir == "left" ? prev + dis : prev - dis;
  
        return val;
      }):''}
    }
  return (
 
      
            <div className="btns flex gap-3">
              <div
                onClick={(e) => {
                  scroll("left");
                }}
                className={`w-7 h-7   bg-[#949698]  flex items-center justify-center betsmmd:p-2  p-4 py-[17px]   rounded-[50%] cursor-pointer bg-opacity-30 hover:bg-opacity-70 `}
              >
                <i className="fi fi-rr-arrow-left text-[16px] text-black m-0 p-0  scale-80"></i>
              </div>
              <div
                onClick={(e) => {
                  scroll("right");
                }}
                className={`w-7 h-7  bg-[#949698]  flex items-center justify-center betsmmd:p-2  p-4 py-[17px]   rounded-[50%] cursor-pointer bg-opacity-30 hover:bg-opacity-70 `}
              >
                <i className="fi fi-rr-arrow-right text-[16px] text-black  m-0 p-0 scale-80"></i>
              </div>
            </div>
 
  )
}

export default ScrollBtns