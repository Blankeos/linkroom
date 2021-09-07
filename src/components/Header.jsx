import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-500 h-20 flex items-center justify-center">
      <div className="flex flex-col items-center">
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
    </header>
  );
};

export default Header;
