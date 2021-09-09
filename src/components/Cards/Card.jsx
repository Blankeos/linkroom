import React, { useState } from "react";
import {
  SiGoogleclassroom,
  SiFacebook,
  SiGooglehangoutsmeet,
} from "react-icons/si";

import { GoKebabVertical as MenuIcon } from "react-icons/go";
import { IoMdClose as DeleteIcon } from "react-icons/io";
import iconDict from "../../data/iconDict";
import DropDown from "../DropDown";
const renderDummyIfEmpty = (isEmpty) => {
  return (
    <>{isEmpty && <span className="text-transparent select-none">`</span>}</>
  );
};

const Card = ({ title, subheading1, subheading2, links }) => {
  const dropDownItems = [
    {
      name: "Edit",
      icon: <DeleteIcon />,
      onClick: () => {},
    },
  ];

  return (
    <div className="h-full rounded-2xl shadow hover:shadow-lg transition w-full sm:w-96 inline-block bg-white">
      <div className="h-full rounded-b-2xl border-r border-l border-b rounded-t-3xl">
        <div className="flex flex-col space-y-1 bg-blue-500 text-white p-5 rounded-t-2xl border border-blue-500">
          <div className="flex items-center justify-between text-white pb-2">
            <h2 className="font-bold text-3xl truncate">
              {title}
              {renderDummyIfEmpty(title.length <= 0)}
            </h2>
            <DropDown items={dropDownItems}>
              <MenuIcon size="1.5rem" />
            </DropDown>
          </div>

          <p className="text-sm">
            {subheading1}
            {renderDummyIfEmpty(subheading1.length <= 0)}
          </p>
          <p className="text-sm">
            {subheading2}
            {renderDummyIfEmpty(subheading2.length <= 0)}
          </p>
        </div>
        <div className="p-5 flex flex-col space-y-2 text-gray-600 rounded-b-2xl">
          {links &&
            links.map((link, i) => {
              return (
                <Link key={i} icon={link && link.icon} url={link && link.url}>
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
      target={!url ? "_blank" : ""}
      className="flex items-center space-x-2 hover:text-blue-500"
    >
      {iconDict[icon]}
      <span>{children}</span>
    </a>
  );
};

export default Card;
