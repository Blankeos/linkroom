import React, { useState } from "react";
import SlideOver from "../components/SlideOvers/SlideOver";

import { Link, useLocation } from "react-router-dom";

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
        </div>
      </SlideOver>
    </>
  );
};

const NavLink = ({ onClick, icon, children, to }) => {
  return (
    <Link
      onClick={onClick}
      className="px-10 py-5 hover:bg-blue-100 dark:hover:bg-gray-800 transition grid grid-cols-[45px,1fr]"
      to={to}
    >
      <span>{icon}</span>
      <span>{children}</span>
    </Link>
  );
};

export default SideNavButton;
