import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="p-5 bg-blue-50 flex-grow flex flex-col items-center justify-center space-y-7 pt-12 pb-0">
      <h1 className="font-extrabold text-4xl md:text-5xl tracking-tighter text-gray-900 max-w-sm text-center">
        What is
        <br />
        Link Room?
      </h1>
      <p className="font-extralight text-sm max-w-md text-gray-700 text-center">
        It's a single hub for all the places on the internet you need to go to
        is here! Links are portals to different parts of the internet. We know
        it's hard to keep track of them so we're here to provide your links the
        space they need.
      </p>
      <div className="flex flex-wrap text-center justify-center">
        <div className="bg-gray-900 select-none text-white p-3 px-6 rounded-2xl my-1 mx-1 transition shadow hover:shadow-lg hover:bg-gray-800">
          😍
        </div>
      </div>
      <img className="w-72 h-72" src="/assets/socket_illustration_1.svg" />
      <div className="flex flex-col space-y-5">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          FAQs
        </h2>
        <div className="flex flex-col space-y-3">
          <div className="w-96 h-20 bg-blue-200 rounded-md text-gray-800 flex items-center justify-center">
            Do I do this?
          </div>
          <div className="w-96 h-20 bg-blue-200 rounded-md text-gray-800 flex items-center justify-center">
            Do I do this?
          </div>
        </div>
      </div>
      <div className="py-10">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Special Thanks to
        </h2>
        <p>This guy - UX</p>
        <p>This guy - Mascot Concept (Socket)</p>
      </div>
    </div>
  );
};

export default AboutPage;
