import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import upload from "../assets/upload.png";

import DealsDiscount from "./DealsDiscount";
import TopPicks from "./TopPicks";
import MenuCard from "./MenuCard";
import PopUpDiffRest from "./PopUpDiffRest";

import { useDispatch, useSelector } from "react-redux";
import { setInfo } from "../utils/restaurantInfoSlice";
import { MenuShimmer, RestaurantMenuSkeleton } from "./Shimmer";
function RestaurantMenu() {
  let { city, area, id } = useParams();
  // let id = area.split("rest")[1];
  const [menuData, setMenuData] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const dispatch = useDispatch();
  const [deal, setDeal] = useState([]);
  // const {showPopup, setShowPopup}=useContext(ShowPoPUp)
  const showPopup = useSelector((state) => state.toggleSlice.popUpStatus);
  // const info = useSelector((state) => state.restaurantInfoSlice.info);
  const [topPicks, setTopPicks] = useState([]);

  const { lat, lng } = useSelector((state) => state.locationSlice);

  // console.log(lat, lng);
  // console.log(restaurantInfo);

  useEffect(() => {
    async function fetchMenu() {
      const menuUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;

      //   // Encode the full URL
      const encodedUrl = encodeURIComponent(menuUrl);
      const token = import.meta.env.VITE_APP_SECRET;
      const response = await fetch(`/api/proxy?url=${encodedUrl}&token=${token}`);
      const result = await response.json();




      // const targetUrl =
      //   "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=16866&catalog_qa=undefined&submitAction=ENTER";

      // const res = await fetch(
      //   targetUrl
      // );
      // const result = await res.json();
      // console.log(result);

      let data = result?.data?.cards;
      // console.log(data);
      let tempRestaurantInfo = {};
      let tempOffers = {};
      let tempMenu = [];
      let tempTopPicks = [];
      let tempSubCards = [];

      data?.map((one) => {
        if (one?.card?.card?.info) {
          tempRestaurantInfo = one.card.card.info;
        }
      });
      // console.log(tempRestaurantInfo);
      setRestaurantInfo(tempRestaurantInfo);
      data?.map((one) => {
        if (one?.card?.card?.gridElements?.infoWithStyle?.offers) {
          tempOffers = one?.card?.card?.gridElements?.infoWithStyle?.offers;
        }
      });
      // console.log(tempOffers);
      setDeal(tempOffers);
      data?.map((one) => {
        if (one.groupedCard) {
          tempMenu = one.groupedCard.cardGroupMap.REGULAR.cards;
        }
      });
      // console.log(tempMenu);
      tempMenu?.map((one) => {
        if (one?.card?.card?.title === "Top Picks") {
          tempTopPicks = one.card.card.carousel;
        }
      });
      // console.log(tempTopPicks);
      setTopPicks(tempTopPicks);

      tempMenu?.map((one) => {
        if (one?.card?.card?.title && one.card.card.title !== "Top Picks") {
          tempSubCards.push(one);
        }
      });
      // console.log(tempSubCards);
      setMenuData(tempSubCards);
    }
    fetchMenu();
  }, []);
  return (
    <div className="w-full relative ">
      {menuData.length ? (
        <div className="second:w-[80%] third:w-[95%]  w-[55%] m-auto min-h-screen pt-8 gap-5 flex flex-col">
          <p className="text-[10px]">
            <Link to={"/"}>
              <span className="text-black/50 font-bold hover:text-black/70 hover:cursor-pointer">
                Home
              </span>
            </Link>{" "}
            /{" "}
            <Link to={"/"}>
              {" "}
              <span className="text-black/50 font-bold hover:text-black/70 hover:cursor-pointer">
                {restaurantInfo?.city}
              </span>
            </Link>{" "}
            / <span className="font-semibold">{restaurantInfo?.name}</span>
          </p>
          {/* restaurant info */}
          <div>
            <p className="text-[25px] font-bold pl-2 small:text-[18px] vsmall:text-[16px]">
              {restaurantInfo.name}
            </p>
            <div className="w-full h-[170px] exsmall:h-[140px] mt-3 rounded-b-[40px] bg-gradient-to-t from-black/10  p-5 pt-0 flex justify-center items-center ">
              <div className="w-full border  rounded-2xl h-full border-black/30 bg-white pl-4 pt-3 exsmall:pl-2 exsmall:pt-1 flex flex-col gap-1">
                <div className="w-full flex items-center gap-1 font-bold">
                  {" "}
                  <i className="fi fi-ss-circle-star mt-1 text-green-600 text-lg"></i>
                  <div className="flex items-center w-full gap-2 exsmall:text-[12px]">
                    {restaurantInfo?.avgRating} (
                    {restaurantInfo?.totalRatingsString}){" "}
                    <div className="w-1 h-1 rounded-full bg-black/50 exsmall:text-[12px]"></div>{" "}
                    {restaurantInfo?.costForTwoMessage}
                  </div>
                </div>
                <p className=" text-[#fc3b19] font-bold underline cursor-pointer exsmall:text-[12px]">
                  {restaurantInfo?.cuisines?.join(", ")}
                </p>
                <div className="flex w-full gap-3 ">
                  <div className="w-[9px] flex flex-col justify-center items-center">
                    <div className="w-[7px] h-[7px] bg-gray-400 rounded-full"></div>
                    <div className="w-[1px] h-[25px] bg-gray-500 "></div>
                    <div className="w-[7px] h-[7px] bg-gray-400 rounded-full"></div>
                  </div>

                  <div className="flex  gap-2 flex-col items-start">
                    <div className="flex gap-2 items-center">
                      <p className="text-[14px] font-bold exsmall:text-[12px]">
                        Outlet
                      </p>
                      <p className="text-[14px] text-black/50 font-semibold exsmall:text-[12px]">
                        {restaurantInfo.areaName}
                      </p>
                      <i className="fas fa-caret-down text-[#fc3b19] text-[10px] "></i>
                    </div>
                    <p className="font-bold text-[14px] lowercase exsmall:text-[12px]">
                      {restaurantInfo?.sla?.slaString}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* deal section */}
          <DealsDiscount deal={deal}></DealsDiscount>
          {/* menu section  */}
          <div className="w-full flex flex-col items-center py-5 gap-4">
            <p className="uppercase tracking-widest text-black/60 text-[14px] font-semibold vsmall:text-[10px]">
              Menu
            </p>
            <div className="w-full vsmall:w-[90%] vsmall:py-2  text-black/60 flex justify-between bg-black/10 py-3  rounded-xl relative cursor-pointer">
              <div className="font-semibold m-auto">Search for dishes</div>
              <i className="fi fi-br-search absolute top-3 right-3 vsmall:top-2"></i>
            </div>

            {/* Top picks */}
            <TopPicks
              topPicks={topPicks}
              restaurantInfo={restaurantInfo}
            ></TopPicks>

            <div className="bg-black/5 w-full h-[15px] mt-2"></div>

            {/* cards of menu  */}
            {menuData?.map(({ card: { card: one } }, i) => {
              return (
                <>
                  <MenuCard
                    key={i}
                    one={one}
                    restaurantInfo={restaurantInfo}
                  ></MenuCard>
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <RestaurantMenuSkeleton></RestaurantMenuSkeleton>
      )}

      {showPopup && <PopUpDiffRest></PopUpDiffRest>}
    </div>
  );
}

export default RestaurantMenu;
