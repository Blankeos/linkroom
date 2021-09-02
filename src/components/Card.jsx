import React, { useState } from "react";
import {
  SiGoogleclassroom,
  SiFacebook,
  SiGooglehangoutsmeet,
} from "react-icons/si";

const Card = () => {
  return (
    <div className="rounded-md shadow">
      <div className="flex flex-col space-y-1 bg-blue-500 text-white p-5 rounded-t-md">
        <h2 className="font-bold text-3xl">Card Title</h2>
        <p className="text-sm">CCS248</p>
        <p className="text-sm">Bobby Gerardo</p>
      </div>
      <div className="p-5 flex flex-col space-y-2 text-gray-600 border-b border-r border-l rounded-b-md">
        <Link icon={<SiGoogleclassroom />}>Google Class</Link>
        <Link icon={<SiFacebook />}>Facebook Group</Link>
        <Link icon={<SiGooglehangoutsmeet />}>Google Meet</Link>
      </div>
    </div>
  );
};

const Link = ({ url, icon, children }) => {
  return (
    <a href={url || "/404"} className="flex items-center space-x-2">
      {icon}
      <span>{children}</span>
    </a>
  );
};

export default Card;
