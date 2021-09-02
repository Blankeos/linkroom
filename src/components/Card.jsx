import React, { useState } from "react";
import {
  SiGoogleclassroom,
  SiFacebook,
  SiGooglehangoutsmeet,
} from "react-icons/si";

const Card = ({ title, subheading1, subheading2, links }) => {
  return (
    <div className="rounded-md shadow hover:shadow-lg transition w-96 inline-block">
      <div className="flex flex-col space-y-1 bg-blue-500 text-white p-5 rounded-t-md">
        <h2 className="font-bold text-3xl">{title}</h2>
        <p className="text-sm">{subheading1}</p>
        <p className="text-sm">{subheading2}</p>
      </div>
      <div className="p-5 flex flex-col space-y-2 text-gray-600 border-b border-r border-l rounded-b-md">
        {links.map((link, i) => {
          return (
            <Link key={i} icon={link && link.icon}>
              {link.linkName}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Link = ({ url, icon, children }) => {
  return (
    <a
      href={url || "/404"}
      className="flex items-center space-x-2 hover:text-blue-500"
    >
      {icon}
      <span>{children}</span>
    </a>
  );
};

export default Card;
