import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  return (
    <>
      <div className="h-16 bg-gray-50 border-t w-full grid grid-cols-3 text-gray-600 dark:bg-gray-900 dark:border-black dark:text-gray-400 transition" />
      <div className="fixed bottom-0 w-full">
        <div className="h-16 bg-gray-50 border-t w-full grid grid-cols-3 text-gray-600 dark:bg-gray-900 dark:border-black dark:text-gray-400 transition">
          <NavItem
            icon={<HomeIcon size="1.3rem" />}
            url="/"
            active={location.pathname === "/"}
          >
            Home
          </NavItem>
          <NavItem
            icon={<SortIcon size="1.3rem" />}
            url="/sort"
            active={location.pathname === "/sort"}
          >
            Sort
          </NavItem>
          <NavItem
            icon={<InfoIcon size="1.3rem" />}
            url="/about"
            active={location.pathname === "/about"}
          >
            Info
          </NavItem>
        </div>
      </div>
    </>
  );
};

const NavItem = ({ children, icon, url = "/", active = false }) => {
  return (
    <Link
      to={url}
      className={`flex flex-col items-center justify-center h-full ${
        active ? "text-blue-500" : "hover:bg-gray-200 dark:hover:bg-black"
      }`}
    >
      {icon}
      <span className="text-xs">{children}</span>
    </Link>
  );
};
export default Footer;
