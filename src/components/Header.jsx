import React from "react";
import SideNavButton from "./SideNavButton";

// Icons
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Header = () => {
  return (
    <header className="relative bg-blue-500 h-20 flex items-center">
      <div className="absolute flex flex-col items-center w-full">
        <p className="text-white font-black tracking-wider text-xl relative">
          Link Room
          <span
            className="absolute text-xs -top-1 -right-9 bg-white rounded-md text-blue-500 px-1 font-semibold select-none"
            style={{ fontSize: "9px" }}
          >
            BETA
          </span>
        </p>
        <p className="text-xs font-light text-blue-100">
          One place for your all your virtual classrooms
        </p>
      </div>
      <div className="absolute right-0 text-white p-5">
        <SideNavButton>
          <span className="block p-1">
            <HiOutlineMenuAlt3 size="1.7rem" />
          </span>
        </SideNavButton>
      </div>
    </header>
  );
};

export default Header;
