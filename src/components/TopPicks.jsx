import React from 'react'
import ScrollBtns from './ScrollBtns';
import { useRef } from 'react';
import TopPicksCard from './TopPicksCard';

function TopPicks({topPicks,restaurantInfo}) {
 const topPicksRef = useRef(null);
  return (
   <>
     {topPicks.length>0 ? (
               <div className="flex flex-col items-start w-full">
                 <div className="flex justify-between w-full third:px-3">
                   <p className="font-bold text-[18px] third:text-[14px]">Top Picks</p>
   
                   <ScrollBtns reference={topPicksRef.current}></ScrollBtns>
                 </div>
                 <div className="overflow-x-scroll w-full container">
                   <div
                     className="w-full flex gap-3 py-3 duration-300 ease-in-out transition-all third:px-3"
                     ref={topPicksRef}
                     // style={{
                     //   transform: `translateX(${pos}px)`,
                     // }}
                   >
                     {topPicks?.map((one,i) => {
                       return <TopPicksCard key={i} one={one} restaurantInfo={restaurantInfo} ></TopPicksCard>;
                     })}
                   </div>
                 </div>
               </div>
             ) : (
               ""
             )}
   </>
  )
}

export default TopPicks