import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

// Components
import { Link } from "react-router-dom";

// Icons
import { RiInformationLine as InfoIcon } from "react-icons/ri";
import { BsHouse as HomeIcon, BsArrowRepeat as SortIcon } from "react-icons/bs";

const Footer = () => {
  return <>{isMobile ? <MobileFooter /> : <DesktopFooter />}</>;
};
const DesktopFooter = () => {
  return (
    <div className="h-0 dark:bg-gray-900 bg-blue-500 w-full transition"></div>
  );
};

const MobileFooter = () => {
  return (
    <>
      <div className="h-16 bg-gray-50 border-t w-full grid grid-cols-3 text-gray-600 dark:bg-gray-900 dark:border-black dark:text-gray-400 transition" />
      <div className="fixed bottom-0 w-full">
        <div className="h-16 bg-gray-50 border-t w-full grid grid-cols-3 text-gray-600 dark:bg-gray-900 dark:border-black dark:text-gray-400 transition">
          <Link
            to="/"
            className="flex flex-col items-center justify-center h-full"
          >
            <HomeIcon size="1.3rem" />
            <span className="text-xs">Home</span>
          </Link>
          <button className="flex flex-col items-center justify-center h-full">
            <SortIcon size="1.3rem" />
            <span className="text-xs">Sort</span>
          </button>
          <Link
            to="/about"
            className="flex flex-col items-center justify-center h-full"
          >
            <InfoIcon size="1.3rem" />
            <span className="text-xs">Info</span>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Footer;
