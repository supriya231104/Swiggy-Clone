import logo from "../assets/images.jpeg";

import { Outlet, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import cross from "../assets/cross.png";
import gps from "../assets/gps.png";
import clock from "../assets/wall_clock.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toggleSerchBar } from "../utils/toggleSlice";
import { changeLocation } from "../utils/locationSlice";
import SignInBtn from "./SignInBtn";
function Head() {
  const [address, SetAddress] = useState("Delhi,India");

  const [searchIp, SetSearchIp] = useState("");
  const [serachResult, SetSearchResult] = useState([]);

  const visible = useSelector((state) => state.toggleSlice.searchBarToggle);
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const { photoURL, displayName, isSignIn } = useSelector(
    (state) => state.userInfoSlice.userInfo
  );

  const dispatch = useDispatch();

  const navItems = [
    { name: "Search", image: "fi-br-search", path: "/search" },
    // { name: "Offers", image: "fi-br-badge-percent", path: "/offers" },
    // { name: "Help", image: "fi-br-interrogation", path: "/help" },
    { name: "Sign In", image: "fi-br-circle-user" },
    { name: "Cart", image: "fi-br-shopping-bag text-xl", path: "/toCart" },
  ];

  function handleVisibility() {
    dispatch(toggleSerchBar());
  }
  function DisplaySignIn() {
    // console.log(photoURL);
    return (
      <div onClick={handleLogin} className="flex gap-2 items-center">
        <img className="w-8 h-8 rounded-[50%] " src={photoURL} alt="" />
        <p className="betsmmd:hidden text-black/70">{displayName}</p>
      </div>
    );
  }
  async function fetchLocation(id) {
    const locationUrl = `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`;

    //   // Encode the full URL
    const encodedUrl = encodeURIComponent(locationUrl);
    const token = import.meta.env.VITE_APP_SECRET;
    const response = await fetch(`/api/proxy?url=${locationUrl}&token=${token}`);
    const res = await response.json();
    // console.log(res);
    // const response = await fetch(
    //   `https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`
    // );
    // const res = await response.json();
    // console.log(res);
    const latitude = res?.data[0]?.geometry?.location?.lat;
    const longitude = res?.data[0]?.geometry?.location?.lng;
    // console.log();
    SetAddress(res?.data[0].formatted_address);

    dispatch(changeLocation({ latitude, longitude }));
  }
  async function fetchData(val) {
    const searchAreaUrl = `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}&types=`;

    //   // Encode the full URL
    const encodedUrl = encodeURIComponent(searchAreaUrl);

    const token = import.meta.env.VITE_APP_SECRET;
    const response = await fetch(`/api/proxy?url=${encodedUrl}&token=${token}`);
    const res = await response.json();

    // const response = await fetch(
    //   `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}&types=`
    // );
    // const res = await response.json();
    // console.log(res?.data);
    SetSearchResult(res?.data);
  }
  useEffect(() => {
    fetchData(searchIp);
  }, [searchIp]);
  function handleLogin() {
    dispatch(toggleLogin());
  }
  return (
    <div
      className={
        "relative min-h-screen w-full " + (visible ? "overflow-y-hidden" : "")
      }
    >
      {
        <div className="w-full h-full">
          <div className="w-full h-full betsmmd:text-[12px]">
            <div
              onClick={handleVisibility}
              className={
                "w-full h-full bg-black/40 absolute z-30 " +
                (visible ? "visible" : "invisible")
              }
            ></div>
            {
              <div
                className={
                  "bg-white w-[80%] md:w-[40%] h-[800px] absolute flex justify-end px-3 items-start  z-40 duration-[1.2s]  ease-in-out " +
                  (visible ? "left-0" : "-left-[100%]")
                }
              >
                <div className="md:w-[60%] w-[90%] text-black mt-4 h-[500px] py-2 px-3 flex flex-col  gap-y-4 mr-5 items-center  ">
                  <div className="flex justify-start w-full">
                    {/* <i class="fa-sharp fa-solid fa-xmark border-none text-[20px] "></i> */}
                    {/* <i class="fi fi-tr-cross-button"></i> */}
                    <img
                      onClick={handleVisibility}
                      className="w-8"
                      src={cross}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-3 items-center w-full mt-2  ">
                    <input
                      onChange={(e) => {
                        SetSearchIp(e.target.value);
                      }}
                      className="w-full font-medium py-[10px] shadow-[1px_2px_4px_rgb(0,0,0,0.3)] px-5  border border-black/20 focus:outline-none"
                      type="text"
                      name=""
                      id=""
                      placeholder="Search for area ,street name..."
                    />

                    <div className="flex gap-4 w-full  py-4 px-3 items-center border border-black/20 group">
                      <i className="fa-solid fa-location-crosshairs"></i>
                      <div className={`w-[95%] `}>
                        <p className="font-semibold group-hover:text-[#ff5200] betsmmd:text-[10px]">
                          Get current location
                        </p>
                        <p className="text-[12px] text-black/50 font-semibold betsmmd:text-[10px]">
                          Using GPS
                        </p>
                      </div>
                    </div>
                    <div></div>
                    <div className="w-full flex flex-col gap-3">
                      {serachResult?.map(
                        (
                          {
                            structured_formatting: {
                              main_text,
                              secondary_text,
                            },
                            place_id,
                          },
                          i
                        ) => {
                          return (
                            <Link to={"/"}>
                              <div
                              key={i}
                                onClick={() => {
                                  fetchLocation(place_id);
                                  handleVisibility();
                                }}
                                className="w-full flex justify-between  items-center min-h-[50px] group cursor-pointer"
                              >
                                {i == 0 ? (
                                  <img
                                    className="w-4 ml-1"
                                    src={clock}
                                    alt=""
                                  />
                                ) : (
                                  <img src={gps} alt="" />
                                )}
                                <div
                                  className={`w-[85%] flex flex-col items-start gap-1  ${
                                    i != serachResult.length - 1
                                      ? "border-b border-dashed border-black/50"
                                      : ""
                                  }  pb-4`}
                                >
                                  <p className="font-medium text-[15px] betsmmd:text-[10px] group-hover:text-[#ff5200]">
                                    {main_text}
                                  </p>
                                  <p className="text-black/70 text-[12px] betsmmd:text-[10px]">
                                    {secondary_text}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="w-full h-full betsmmd:text-[12px]">
            <div
              onClick={handleLogin}
              className={
                "w-full h-full bg-black/40 absolute z-30 " +
                (loginVisible ? "visible" : "invisible")
              }
            ></div>
            {
              <div
                className={
                  "bg-white exsmall:w-[80%] md:w-[35%] second:w-[60%] h-[800px] absolute flex justify-start px-3 items-start  z-40 duration-[1.2s]  ease-in-out " +
                  (loginVisible ? "right-0" : "-right-[100%]")
                }
              >
                <div className="md:w-[75%] w-[90%] text-black mt-4 h-[500px] py-2 px-3 flex flex-col  gap-y-4 items-start   ">
                  <div className="w-full flex flex-col gap-7 px-3 items-start">
                    {/* <i class="fa-sharp fa-solid fa-xmark border-none text-[20px] "></i> */}
                    {/* <i class="fi fi-tr-cross-button"></i> */}
                    <div className="w-full flex justify-start">
                      <img
                        onClick={handleLogin}
                        className="w-8"
                        src={cross}
                        alt=""
                      />
                    </div>
                    <div className="w-full flex justify-between items-center">
                      <p className="text-3xl font-semibold">Login</p>
                      <img
                        className="w-24"
                        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                        alt=""
                      />
                    </div>
                    <SignInBtn></SignInBtn>

                    <p className="text-sm">
                      By clicking on Login, I accept the{" "}
                      <span className="font-semibold">
                        Terms & Conditions & Privacy Policy
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }
      <div className="w-full shadow-md h-20 flex justify-center sticky top-0 z-20 bg-white ">
        <div className="w-full md:w-[85%]  flex items-center h-full justify-around md:justify-between md:px-3 px-1">
          <div className="first flex items-center md:gap-10 gap-3 h-full ">
            <Link to={"/"}>
              <img
                className="rounded-xl max-w-[50px] betsmmd:max-w-[35px] hover:scale-110 duration-200 ease-in-out"
                src={logo}
                alt=""
              />
            </Link>
            <div
              onClick={handleVisibility}
              className="flex items-center gap-2 h-full  hover:cursor-pointer  group "
            >
              <p className="font-bold  border-b-[2px] border-black text-sm group-hover:text-[#ff5200]  group-hover:border-[#ff5200]">
                {" "}
                Other
              </p>
              <p className="line-clamp-1 w-full text-black/70 md:max-w-[250px] max-w-[200px] betsmmd:text-[12px]">
                {address}
              </p>

              <i className="fi fi-br-angle-small-down text-[#fc7819] scale-125 pt-1 mr-2 "></i>
            </div>
          </div>
          <div className=" second md:hidden flex gap-4 w-[50%] justify-center px-2 items-center">
            {navItems.map((item, index) => {
              // Cart badge

              // Sign In
              if (item.name === "Sign In" && isSignIn) {
                return <DisplaySignIn key={index} />;
              }

              // Normal Link
              return (
                <Link key={index} to={item.path}>
                  <div
                    className="relative z-10"
                    key={index}

                    onClick={item.name === "Sign In" ? handleLogin : undefined}
                  >
                    {item.name === "Cart" && cartData?.length > 0 ? (
                      <div
                        
                        className="absolute top-[-7px] z-[-1] right-[-8px] bg-[#ff5100c4] bg-opacity-70 h-4 w-4 rounded-full text-white font-bold flex items-center justify-center text-xs leading-none"
                      >
                        {cartData.length}
                      </div>
                    ) : (
                      ""
                    )}
                    <i className={`${item.image} text-xl`}></i>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="second text-[#14151e] font-medium  w-[45%] gap-2 justify-between px-1 hidden md:flex items-center">
            {navItems.map((one, i) => {
              // console.log(one.path)
              return (
                <Link to={one.path} key={i}>
                  {" "}
                  {one.name === "Sign In" && isSignIn ? (
                    <DisplaySignIn></DisplaySignIn>
                  ) : (
                    <div
                      key={i}
                      className={
                        `flex items-center gap-3 group hover:cursor-pointer   ` +
                        (i == 2 ? "relative" : "")
                      }
                      onClick={one.name === "Sign In" ? handleLogin : undefined}
                    >
                      <i
                        className={`fi ${one.image} group-hover:text-[#ff5200]`}
                      ></i>
                      <p className="text-[17px] text-gray-800 group-hover:text-[#ff5200]">
                        {one.name}
                      </p>
                      {one?.name === "Cart" && cartData?.length > 0 ? (
                        <div className="relative bottom-3 right-5 bg-[#ff5100c4] bg-opacity-70 h-5 w-5 rounded-full text-white font-bold flex items-center justify-center text-xs leading-none">
                          <p>{cartData.length}</p>
                        </div>
                      ) : (
                        ""
                      )}

                      {/* {i == 2 ? (
                        <p className="text-[10px] uppercase absolute bottom-5 left-[70px] right-0 text-[#ff5200]  ">
                          New
                        </p>
                      ) : (
                        ""
                      )} */}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default Head;
