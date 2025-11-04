import React, { useEffect, useState } from "react";
import DishCard from "./DishCard";
import { useDispatch, useSelector } from "react-redux";
import RestaurantCard, { withHoc } from "./RestaurantCard";
import PopUpDiffRest from "./PopUpDiffRest";
import {
  resetSimilarRes,
  toggleShowSimDish,
  toggleSimilarRes,
} from "../utils/toggleSlice";
import SameRestaurantCompo from "./SameRestaurantCompo";
import { Link } from "react-router-dom";

function SearchPage() {
  let dispatch = useDispatch();

  const [searchQuery, setSerachQuery] = useState("");
  // const [isDataFetched,setIsDataFetched]
  const [selectedRes, setSelectedRes] = useState({});
  const [dishesFromSameRes, setDishesFromSameRes] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [activeBtn, setActiveBtn] = useState("Dishes");
  const [dishes, setDishes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const { lat, lng } = useSelector((state) => state.locationSlice);
  const showPopup = useSelector((state) => state.toggleSlice.popUpStatus);
  const { isSimilarRestaurantDishes, city, restId, itemId, resLocation } =
    useSelector((state) => state.toggleSlice.similarResClick);
  // console.log(isSimilarRestaurantDishes);
  // console.log({ isSimilarRestaurantDishes, city, restId, itemId, resLocation });
  const { toShowSimilarDishes } = useSelector((state) => state.toggleSlice);

  const PromotedRes = withHoc(RestaurantCard);
  function handleSearchQuery(e) {
    // console.log(e);
    let val = e.target.value;
    // console.log(val);
    // console.log(e.keyCode);
    if (e.keyCode === 32) {
      // console.log("oho space a gaya ");
      setDishesFromSameRes(null);
      setDishes([]);
      setSerachQuery(e.target.value);
    } else if (e.keyCode == 8) {
      dispatch(toggleShowSimDish(false));
    }
  }
  useEffect(() => {
    if (isSimilarRestaurantDishes) {
      fetchDishesFromSameRes();
    }
  }, [isSimilarRestaurantDishes]);
  useEffect(() => {
    setSerachQuery("");
    setSelectedRes({});
    setDishesFromSameRes(null);
    dispatch(toggleSimilarRes());
    dispatch(toggleShowSimDish(false));
  }, []);

  // console.log(lat,lng);
  async function fetchDishesFromSameRes() {
    const token = import.meta.env.VITE_APP_SECRET;
    // const response = await fetch(`/api/proxy?url=${locationUrl}&token=${token}`);
    let path = `/city/${city}/${resLocation}`;
    let encodedPath = encodeURIComponent(path);
    let newUrl = `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=SUGGESTION&selectedPLTab=dish-add&restaurantMenuUrl=${path}-rest${restId}%3Fquery%3D${searchQuery}&restaurantIdOfAddedItem=${restId}&itemAdded=${itemId}`;
    let decoded = decodeURIComponent(newUrl);

    //   // Encode the full URL
    const encodedUrl = encodeURIComponent(decoded);

    const response = await fetch(`/api/proxy?url=${encodedUrl}&token=${token}`);
    const result = await response.json();

    setSelectedRes(result?.data?.cards[1]?.card);
    // console.log(result?.data?.cards[2]?.card?.card?.cards)
    setDishesFromSameRes(result?.data?.cards[2]?.card?.card?.cards);
    dispatch(toggleSimilarRes());
  }
  async function fetchDishes() {
    const encodedUrl = encodeURIComponent(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=2afa537a-15f6-cec1-d95b-c48426726822`
    );
    const token = import.meta.env.VITE_APP_SECRET;
    const response = await fetch(`/api/proxy?url=${encodedUrl}&token=${token}`);
    const result = await response.json();

    // let response = await fetch(

    // );
    // let result = await response.json();
    // console.log(result);
    let dishData = [];
    let tempDishes = [];
    result?.data?.cards.map((one) => {
      if (one?.groupedCard) {
        dishData = one.groupedCard?.cardGroupMap?.DISH?.cards;
      }
    });
    dishData?.splice(0, 1);

    //  console.log(dishData);
    setDishes(dishData);
  }
  async function fetchRestaurantData() {
    const encodedUrl = encodeURIComponent(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=2afa537a-15f6-cec1-d95b-c48426726822&selectedPLTab=RESTAURANT`
    );
    const token = import.meta.env.VITE_APP_SECRET;
    const response = await fetch(`/api/proxy?url=${encodedUrl}&token=${token}`);
    const result = await response.json();

    // let response = await fetch(

    // );
    // let result = await response.json();
    setRestaurants(result);

    let restaurantData = [];
    result?.data?.cards.map((one) => {
      if (one?.groupedCard) {
        restaurantData = one.groupedCard?.cardGroupMap?.RESTAURANT?.cards;
      }
    });
    let tempRestaurants = restaurantData?.map((one) => {
      return one?.card?.card?.info;
    });

    setRestaurants(tempRestaurants);
  }
  useEffect(() => {
    fetchDishes();
    fetchRestaurantData();
    fetchDishesFromSameRes();
  }, [searchQuery, lat, lng]);

  return (
    <div className="w-[55%] first:w-[75%] betFirstAndSecond:w-[80%] second:w-[95%] mx-auto pt-5  flex flex-col gap-5 items-center ">
      <div className="flex w-full items-center border border-black/60 px-3  py-2 mt-5 gap-2">
        <Link to={"/search"}>
          <i className="fa-solid fa-angle-up -rotate-90 text-black/70"></i>
        </Link>
        <input
          value={searchQuery}
          onChange={(e) => {
            const val = e.target.value;
            setSerachQuery(val);
          }}
          className="w-full focus:outline-none"
          type="text"
          placeholder="Search for restaurants and food"
        />

        <i className="fi-br-search text-black/70"></i>
      </div>

      {toShowSimilarDishes ? (
        ""
      ) : (
        <div className="w-full flex mt-3 py-5 pb- gap-3">
          <button
            onClick={(e) => {
              if (activeBtn === "Restaurants") {
                // setActiveBtn(e.target);
                return;
              } else {
                // console.log(activeBtn, e.target);
                setActiveBtn("Restaurants");
                setIsActive((prev) => !prev);
              }
            }}
            className={
              "searchBtn flex gap-2 items-center betsmmd:text-[12px]  " +
              (!isActive ? "bg-gray-600 text-white" : "")
            }
          >
            Restaurants
          </button>
          <button
            onClick={(e) => {
              if (activeBtn === "Dishes") {
                // setActiveBtn(e.target);
                return;
              } else {
                // console.log(activeBtn, e.target);
                setActiveBtn("Dishes");
                setIsActive((prev) => !prev);
              }
            }}
            className={
              "searchBtn flex gap-2 items-center betsmmd:text-[12px]  " +
              (isActive ? "bg-gray-600 text-white" : "")
            }
          >
            Dishes
          </button>
        </div>
      )}
      <div
        className={
          ` min-h-screen border  px-3 py-5 bg-[#f3f4f68d] w-full   ` +
          (toShowSimilarDishes
            ? ""
            : " grid grid-cols-2 gap-x-4 gap-y-4 fourth:grid-cols-1  ") +
          (!isActive ? "grid grid-cols-2 gap-y-4  " : "")
        }
      >
        {toShowSimilarDishes ? (
          <div className="">
            <SameRestaurantCompo
              selectedRes={selectedRes}
              dishesFromSameRes={dishesFromSameRes}
            ></SameRestaurantCompo>
          </div>
        ) : isActive ? (
          dishes &&
          dishes.map((one, i) => {
            return <DishCard key={i} data={one}></DishCard>;
          })
        ) : (
          restaurants &&
          restaurants.map((one, i) => {
            return one?.promoted ? (
              <PromotedRes data={one}></PromotedRes>
            ) : (
              <RestaurantCard data={one} key={i}></RestaurantCard>
            );
          })
        )}
      </div>
      {showPopup && <PopUpDiffRest></PopUpDiffRest>}
    </div>
  );
}

export default SearchPage;
