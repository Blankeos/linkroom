import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/PrimaryButton";

const Page404 = () => {
  return (
    <div className="p-5 bg-blue-500 flex-grow flex flex-col items-center justify-center space-y-5 pt-12 pb-0 overflow-hidden dark:bg-gray-900 transition">
      <div className="relative flex justify-center h-72">
        <div
          className="w-52 h-52"
          style={{
            backgroundImage: "url('/assets/socket_illustration_0.svg')",
            backgroundPosition: "right",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            filter: "grayscale(1)",
          }}
        ></div>
        <h2 className="filter drop-shadow-xl absolute bottom-0 text-white font-black text-center text-9xl tracking-tighter">
          404
        </h2>
      </div>
      <h1 className="font font-extrabold text-2xl max-w-sm text-center text-gray-900 dark:text-blue-500">
        Woops! Are you lost?
      </h1>
      <p className="max-w-xs text-center text-white text-sm dark:text-gray-200">
        Page doesn't exist or an error occured. Wrong link perhaps?
      </p>
      <Link to="/">
        <PrimaryButton className="transition hover:shadow-lg bg-black hover:bg-gray-800 px-12 py-4 dark:border-gray-900">
          Take me back to the app
        </PrimaryButton>
      </Link>
    </div>
  );
};

export default Page404;
