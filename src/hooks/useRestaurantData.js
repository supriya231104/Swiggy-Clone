import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../utils/restaurantInfoSlice";
import { applyFilter } from "../components/filters";
import { setFilteredData } from "../utils/filterSlice";

function useRestaurantData() {
  const [isUnserviceble, SetIsUnserviceble] = useState(false);
  // console.log(isUnserviceble);
  const [wholeData, SetWholeData] = useState({});
  const [topRestaurantData, setTopRestaurantData] = useState([]);
  const [platterData, setPlatterData] = useState([]);
  const [titl, setTitle] = useState([]);
  // const [filteredData, SetFilteredData] = useState([]);
  const filteredData = useSelector((state) => state.filterSlice.filteredData);
  const filterVal = useSelector((state) => state.filterSlice.filterVal);
  //  console.log(topRestaurantData);
  const { lat, lng } = useSelector((state) => state.locationSlice);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.restaurantInfoSlice.isLoading);
  // console.log(isLoading);

  useEffect(() => {
    // console.log("hello tring tring");
    async function fetchData() {
      const swiggyUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

      // Encode the full URL
      const encodedUrl = encodeURIComponent(swiggyUrl);
      const token = import.meta.env.VITE_APP_SECRET;
      // console.log(token);
      const res = await fetch(`/api/proxy?url=${encodedUrl}&token=${token}`);
      const result = await res.json();
      // console.log(result);

      const unserviceableCard = result?.data?.cards?.find(
        (one) => one?.card?.card?.title === "Location Unserviceable"
      );

      if (unserviceableCard) {
        SetIsUnserviceble(true);
        SetWholeData(result);
      } else {
        SetIsUnserviceble(false);
        SetWholeData(result);
      }

      let titles = [];

      // setTitle(temp.splice(0, 3));
      let tempPlatterData = [];
      result?.data?.cards?.map((one) => {
        if (one?.card?.card?.id === "whats_on_your_mind") {
          tempPlatterData = one.card?.card?.imageGridCards?.info;
        }
        if (one?.card?.card?.title) {
          titles.push(one?.card?.card?.title);
        }
      });
      setPlatterData(tempPlatterData);

      let tempRest = result?.data?.cards?.find((one) => {
        // console.log(one?.card?.card?.id);

        return (
          one?.card?.card?.id === "top_brands_for_you" ||
          one?.card?.card?.id === "restaurant_grid_listing_v2"
        );
      })?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      // console.log(titles);

      setTopRestaurantData(tempRest);
      setTitle(titles);

      dispatch(setIsLoading(false));
    }
    fetchData();
  }, [lat, lng]);
  useEffect(() => {
    // SetFilteredData(data);
    let data = applyFilter(topRestaurantData, filterVal);
    dispatch(setFilteredData(data));
  }, [filterVal, topRestaurantData]);

  return [
    isUnserviceble,
    wholeData,
    topRestaurantData,
    platterData,
    titl,
    filterVal,
    filteredData,
  ];
}

export default useRestaurantData;
