import React from "react";
import { Link } from "react-router-dom";
import FAQsDisclosureGroup from "../components/DisclosureGroups/FAQsDisclosureGroup";

const AboutPage = () => {
  return (
    <div className="px-10 bg-blue-50 dark:bg-gray-800 flex-grow flex flex-col items-center justify-center space-y-7 pt-12 pb-0">
      <h1 className="font-extrabold text-4xl md:text-5xl tracking-tighter text-gray-900 dark:text-white max-w-sm text-center">
        What is
        <br />
        Link Room?
      </h1>
      <p className="font-light text-sm max-w-md text-gray-700 dark:text-gray-300 text-center">
        It's a single hub for all the places on the internet you need to go to
        is here! Links are portals to different parts of the internet. We know
        it's hard to keep track of them so we're here to provide your links the
        space they need!
      </p>
      <div className="flex flex-wrap text-center justify-center"></div>
      <img className="w-72 h-72" src="/assets/socket_illustration_1.svg" />
      <div className="flex flex-col space-y-5">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          FAQs
        </h2>
        <FAQsDisclosureGroup />
      </div>
      <div className="py-10">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Special Thanks to
        </h2>
        <div>
          <p>This guy - UX</p>
          <p>This guy - Mascot Concept (Socket)</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
