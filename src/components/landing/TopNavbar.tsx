"use client";
import { useState } from "react";
import localFont from "next/font/local";
import AuthModal from "../auth/authModal";
const racesport = localFont({
  src: "../../fonts/RaceSport.ttf",
  variable: "--font-RaceSport",
});
const TopNavbar = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [toggle,setToggle] = useState<string>("")
  return (
    <div className="w-full px-20 flex justify-between absolute">
      <div className={`${racesport.className} py-10 text-[#00423d] text-xl`}>

        GAMETIC!
      </div>
      <div className="flex items-center">
        <div className="flex relative">
          <div

            className="pl-6 pr-[50px] py-1.5 border border-black/30 rounded-full absolute right-14 z-40 cursor-pointer"
            onClick={() => {
              setToggle("login")
              setShowModal(true);
            }}
          >
            Login
          </div>
          <div
            className="px-6 py-1.5 border border-black/20 rounded-full bg-[#00423d] text-white z-50 cursor-pointer"
            onClick={() => {
              setToggle("register")
              setShowModal(true);
            }}
          >

            Sign up
          </div>
        </div>
      </div>

      <AuthModal
        open={showModal}
        onClose={() => setShowModal(false)}
        toggle={toggle}
      />

    </div>
  );
};

export default TopNavbar;
