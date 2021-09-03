import React, { useState } from "react";
import {
  SiGoogleclassroom,
  SiFacebook,
  SiGooglehangoutsmeet,
} from "react-icons/si";

import iconDict from "../../data/iconDict";

const Card = ({ title, subheading1, subheading2, links }) => {
  return (
    <div
      className="rounded-2xl shadow hover:shadow-lg transition w-96 inline-block"
      style={{ minHeight: "18rem" }}
    >
      <div className="h-full rounded-b-2xl border-r border-l border-b rounded-t-3xl">
        <div className="flex flex-col space-y-1 bg-blue-500 text-white p-5 rounded-t-2xl border border-blue-500">
          <h2 className="font-bold text-3xl">{title}</h2>
          <p className="text-sm">{subheading1}</p>
          <p className="text-sm">{subheading2}</p>
        </div>
        <div className="p-5 flex flex-col space-y-2 text-gray-600">
          {links &&
            links.map((link, i) => {
              return (
                <Link key={i} icon={link && link.icon}>
                  {link.linkName}
                </Link>
              );
            })}
        </div>
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
      {iconDict[icon]}
      <span>{children}</span>
    </a>
  );
};

export default Card;