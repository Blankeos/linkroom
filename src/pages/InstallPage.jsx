import React, { useState } from "react";
import { osName } from "react-device-detect";
import InstallModal from "../components/Modals/InstallModal";

import { FiDownload } from "react-icons/fi";
import PrimaryButton from "../components/PrimaryButton";

// Router
import { Link } from "react-router-dom";
const InstallPage = () => {
  return (
    <div className="p-5 bg-blue-500 flex-grow flex flex-col items-center justify-center space-y-7 pt-12 pb-0">
      <h1 className="font-extrabold text-4xl md:text-5xl tracking-tighter text-white max-w-sm text-center">
        ALL YOUR LINKS IN ONE PLACE
      </h1>
      <p className="font-extralight text-sm max-w-md text-white text-center">
        A single hub for all the places on the internet you need to go to is
        here! Links are portals to different parts of the internet. We know it's
        hard to keep track of them so we're here to provide your links the space
        they need.
      </p>
      <div className="flex flex-wrap text-center justify-center">
        <button className="flex items-center space-x-2 bg-white select-none text-gray-700 p-3 px-6 rounded-full my-1 mx-1">
          <FiDownload />
          <span>Download for {osName}</span>
        </button>
        <Link
          to="/"
          className="bg-gray-900 select-none text-white p-3 px-6 rounded-full my-1 mx-1"
        >
          Proceed with your browser
        </Link>
      </div>
      <img className="w-72 h-72" src="/assets/socket_illustration_1.svg" />
    </div>
  );
};

export default InstallPage;
