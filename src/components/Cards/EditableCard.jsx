import React, { useState } from "react";
import { BsArrowsMove as MoveIcon } from "react-icons/bs";
import { GoKebabVertical as MenuIcon } from "react-icons/go";

import iconDict from "../../data/iconDict";

const EditableCard = ({ title, subheading1, subheading2, links }) => {
  return (
    <div
      className="rounded-2xl shadow hover:shadow-lg transition w-96 inline-block"
      style={{ minHeight: "18rem" }}
    >
      <div className="h-full rounded-b-2xl border-r border-l border-b rounded-t-3xl">
        <div className="flex flex-col space-y-1.5 bg-blue-500 text-gray-600 p-3 rounded-t-2xl border border-blue-500">
          <div className="flex justify-between text-white pb-2">
            <button className="cursor-grab active:cursor-grabbing">
              <MoveIcon size="1.5rem" />
            </button>
            <button className="">
              <MenuIcon size="1.5rem" />
            </button>
          </div>
          <input
            className="font-bold text-3xl p-2 py-1 rounded-lg outline-none"
            defaultValue={title}
          />
          {/* <h2 className="font-bold text-3xl">{title}</h2> */}
          <input
            className="text-sm p-2 py-1 rounded-lg outline-none text-gray-500"
            defaultValue={subheading1}
          />
          <input
            className="text-sm p-2 py-1 rounded-lg outline-none text-gray-500"
            defaultValue={subheading2}
          />
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

export default EditableCard;
