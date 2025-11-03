import React, { useState } from "react";
import veg from "../assets/Veg Logo.jpeg";
import non_veg from "../assets/non_veg.jpg";

function CartItemCard({data}) {
  // console.log(data);

    const {name,price,defaultPrice,imageId,description,isVeg,isBestseller}=data.info
    // console.log(name);
    let [showMoreLess, setShowMoreLess] = useState(true);
      let trimString =
        description?.substring(
          0,
          showMoreLess ? description.length / 2 : description.length
        ) + (showMoreLess ? "..." : "");

  return (
    <div className="w-full">
      {" "}
      <div className="w-full flex justify-between py-5 items-center">
       
        {/* <div className=" left flex flex-col items-start ">
          <p>{name}</p>
          <p>₹{(price ? price : defaultPrice) / 100}</p>
        </div> */}
        <div className="left flex flex-col gap-2 justify-center exsmall:w-[70%] second:w-[80%]   w-[75%] pr-3">
                  <div className="flex w-full justify-start gap-2 items-center">
                    <img className="w-4" src={isVeg ? veg : non_veg} alt="" />
                    <p className="text-red-500 text-sm  exsmall:text-[13px]">
                      {isBestseller ? "BestSeller" : ""}
                    </p>
                  </div>
                  <p className="font-bold text-black/60 text-[18px] exsmall:text-[14px]">{name}</p>
                  <p className="font-semibold  exsmall:text-[13px]">
                    ₹
                    {(defaultPrice ? defaultPrice / 100 : "") ||
                      (price ? price / 100 : "")}
                  </p>
                  
        
                  {description?.length > 130 ? (
                    <div className="">
                      <p
                        className={` text-black/60 text-[16px] font-semibold w-[70%] exsmall:text-[12px] `}
                      >
                        {trimString}
                        <span
                          onClick={() => {
                            setShowMoreLess(!showMoreLess);
                          }}
                          className="font-semibold text-black/90 cursor-pointer text-sm exsmall:text-[12px]"
                        >
                          {showMoreLess ? " Show more" : " Show less"}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="w-[70%] text-black/60 text-[16px] font-semibold exsmall:text-[12px]">{description}</p>
                  )}
                </div>
        <div className="right  exsmall:w-[27%] exsmall:h-[27%] second:w-[18%]  second:h-[18%] w-[14%] h-[14%] aspect-square  rounded-xl relative flex flex-col items-center">
          {imageId && (
            <img
              className="w-full h-full object-cover rounded-xl "
              src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageId}`}
              alt=""
            />
          )}

          {/* {imageId ? <AddBtn></AddBtn> : ""} */}
        </div>
      </div>
    </div>
    // <div>hello</div>
  );
}

export default CartItemCard;
