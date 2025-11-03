// import React from "react";

// import { auth,provider } from "../config/firebaseAuth";
import { signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo, setUserInfo } from "../utils/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { toggleLogin } from "../utils/toggleSlice";

function SignInBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSignIn } = useSelector((state) => state.userInfoSlice.userInfo);
  const loginVisible = useSelector((state) => state.toggleSlice.loginToggle);
  //  console.log(isSignIn);
  async function handleAuth() {
    const data = await signInWithPopup(auth, provider);
    // console.log(data);
    const {
      user: { displayName, photoURL },
    } = data;

    dispatch(setUserInfo({ displayName, photoURL }));
    

    navigate("/");
    dispatch(toggleLogin())
  }
  async function handleSignOut() {
    await signOut(auth);

    dispatch(clearUserInfo());
    dispatch(toggleLogin())
    
  }
  return (
    //    <div>sign in page</div>
    <div className=" flex flex-col h-[100px] w-[90%] justify-center items-center gap-2">
     
      
      {/* <button
        onClick={handleAuth}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          cursor: "pointer",
        }}
      >
        <img
          src="https://img.icons8.com/color/24/google-logo.png"
          alt="Google"
        />
        Sign in with Google
      </button> */}
      {isSignIn ? (
        <button onClick={handleSignOut} className="flex w-full items-center justify-center gap-3 bg-[#fc8019] hover:bg-[#f9fafb] hover:text-black text-white font-medium py-3 px-6 rounded-md shadow-md transition-colors duration-200">
          Log Out{" "}
        </button>
      ) :<button onClick={handleAuth} className="flex w-full items-center justify-center gap-3 bg-[#fc8019] hover:bg-[#f9fafb] hover:text-black text-white font-medium py-3 px-6 rounded-md shadow-md transition-colors duration-200">
      Login with
      <img
        src="https://img.icons8.com/color/24/google-logo.png"
        alt="Google"
        className="w-6 h-6"
      />
    </button>}
    </div>
  );
}

export default SignInBtn;
