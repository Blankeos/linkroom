import React, { useState } from "react";
import SlideOver from "../components/SlideOvers/SlideOver";

import { Link } from "react-router-dom";
const SideNavButton = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>{children}</button>
      <SlideOver isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <div className="flex flex-col text-gray-600 w-80 text-left">
          <Link
            onClick={() => setIsOpen(false)}
            className="px-10 py-5 hover:bg-blue-100 transition grid grid-cols-[45px,1fr]"
            to="/about"
          >
            <span>📔</span>
            <span>About</span>
          </Link>
          <p
            onClick={() => setIsOpen(false)}
            className="px-10 py-5 hover:bg-blue-100 transition grid grid-cols-[45px,1fr]"
          >
            <span>💖</span>
            <span>Give us feedback</span>
          </p>
          <Link
            onClick={() => setIsOpen(false)}
            className="px-10 py-5 hover:bg-blue-100 transition grid grid-cols-[45px,1fr]"
            to="/install"
          >
            <span>👇</span>
            <span>Install</span>
          </Link>
        </div>
      </SlideOver>
    </>
  );
};

export default SideNavButton;
