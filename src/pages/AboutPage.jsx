import React from "react";
import { Link } from "react-router-dom";
import FAQsDisclosureGroup from "../components/DisclosureGroups/FAQsDisclosureGroup";

const AboutPage = () => {
  return (
    <div className="bg-blue-50 dark:bg-gray-800 flex-grow">
      {/* Hero */}
      <div className="py-10 max-w-4xl mx-auto px-10 flex flex-col items-center space-y-5">
        <h1 className="font-extrabold text-4xl md:text-5xl tracking-tighter text-gray-900 dark:text-white max-w-sm text-center">
          What is
          <br />
          Link Room?
        </h1>
        <p className="font-light text-sm max-w-md text-gray-700 dark:text-gray-300 text-center">
          It's a single hub for all the places on the internet you need to go to
          is here! Links are portals to different parts of the internet. We know
          it's hard to keep track of them so we're here to provide your links
          the space they need!
        </p>
        <img className="w-72 h-72" src="/assets/socket_illustration_1.svg" />
      </div>
      {/* FAQs */}
      <div className="py-10 max-w-4xl mx-auto px-10 flex flex-col items-center space-y-5">
        <h2 className="tracking-tighter text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          FAQs
        </h2>
        <FAQsDisclosureGroup />
      </div>
      {/* Special Thanks */}
      <div className="py-10 max-w-4xl mx-auto px-10 flex flex-col items-center space-y-5">
        <h2 className="tracking-tighter text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          💖 Special Thanks To 💖
        </h2>
        <FAQsDisclosureGroup />
      </div>
    </div>
  );
};

export default AboutPage;
