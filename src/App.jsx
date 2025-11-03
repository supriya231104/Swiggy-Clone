import { Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Head from "./components/Head";


import React, { lazy, Suspense, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { CartSkeleton, RestaurantMenuSkeleton, SearchPageSkeleton } from "./components/Shimmer";

const SearchPage = lazy(() => import("./components/SearchPage"));
const ToCartInterface = lazy(() => import("./components/ToCartInterface"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));



function App() {
  const visible = useSelector((state) => state.toggleSlice.searchBarToggle);
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div
      className={`overflow-x-hidden  w-screen min-h-screen ${
        visible || loginVisible ? "overflow-y-hidden max-h-screen " : ""
      }`}
    >
      <Routes>
        <Route path="/" element={<Head></Head>}>
          <Route path="/" element={<Body></Body>}></Route>
          {/* <Route path="/sign_in" element={<SignInPage></SignInPage>}></Route> */}

          <Route
            path="/restaurantMenu/city/:city/:area/:id"
            element={
              <Suspense fallback={<RestaurantMenuSkeleton></RestaurantMenuSkeleton>}>
                <RestaurantMenu></RestaurantMenu>
              </Suspense>
            }
          ></Route>
          <Route
            path="/toCart"
            element={
              <Suspense fallback={<CartSkeleton></CartSkeleton>}>
                <ToCartInterface></ToCartInterface>
              </Suspense>
            }
          ></Route>
          <Route
            path="/search"
            element={
              <Suspense fallback={<SearchPageSkeleton></SearchPageSkeleton>}>
                <SearchPage></SearchPage>
              </Suspense>
            }
          ></Route>
        </Route>
        <Route path="*" element={<h1>Page not found</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
