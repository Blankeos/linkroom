import React from "react";
import SideNavButton from "./SideNavButton";

// Components
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="relative bg-blue-500 dark:bg-gray-900 h-20 flex items-center transition">
      {/* Logo Wrapper */}
      <div className="absolute flex flex-col items-center w-full">
        <Link to="/" className="flex flex-col items-center">
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
            One room for all your links
          </p>
        </Link>
      </div>
      <div className="absolute right-0 text-white p-5">
        <SideNavButton />
      </div>
    </header>
  );
};

export default Header;
