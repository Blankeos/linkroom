import React, { useState } from "react";
import SlideOver from "../components/SlideOvers/SlideOver";

import { Link, useLocation } from "react-router-dom";
import DarkModeSwitch from "./Switches/DarkModeSwitch";

// Icons
import { BsChevronBarRight as CloseIcon } from "react-icons/bs";

const SideNavButton = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{children}</button>
      <SlideOver
        slideOverClass="dark:bg-gray-900"
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      >
        <div className="flex flex-col text-gray-600 dark:text-gray-300 w-80 text-left">
          <div className="flex justify-end items-center p-5">
            <button onClick={() => setIsOpen(false)} className="pl-3.5 group">
              <CloseIcon
                className="p-1 text-gray-800 group-hover:text-blue-500 dark:text-gray-300 transition"
                size="2rem"
              />
            </button>
          </div>
          {location.pathname !== "/" && (
            <>
              <NavLink onClick={() => setIsOpen(false)} to="/" icon="👈">
                Back to App
              </NavLink>
              <div className="h-0.5 mx-10 my-2 border-b border-dashed border-gray-200"></div>
            </>
          )}
          <NavLink onClick={() => setIsOpen(false)} to="/about" icon="📔">
            About
          </NavLink>
          <NavLink onClick={() => setIsOpen(false)} to="/" icon="💖">
            Give us feedback
          </NavLink>
          <NavLink onClick={() => setIsOpen(false)} to="/install" icon="👇">
            Install
          </NavLink>
          <div className="px-10 py-5">
            <DarkModeSwitch />
          </div>
        </div>
      </SlideOver>
    </>
  );
};

const NavLink = ({ onClick, icon, children, to }) => {
  return (
    <Link
      onClick={onClick}
      className="select-none px-10 py-5 hover:bg-blue-100 dark:hover:bg-gray-800 transition grid grid-cols-[45px,1fr]"
      to={to}
    >
      <span>{icon}</span>
      <span>{children}</span>
    </Link>
  );
};

export default SideNavButton;
