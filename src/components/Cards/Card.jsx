import React, { useState } from "react";

// Icons
import { GoKebabVertical as MenuIcon } from "react-icons/go";
import { IoMdClose as DeleteIcon } from "react-icons/io";
import { MdEdit as EditIcon } from "react-icons/md";
import iconDict from "../../data/iconDict";

import DropDown from "../DropDown";

//  DND-Kit
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const renderDummyIfEmpty = (isEmpty) => {
  return (
    <>{isEmpty && <span className="text-transparent select-none">`</span>}</>
  );
};

const Card = ({ card, id }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    transition: {
      duration: 150, // milliseconds
      easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  const dropDownItems = [
    {
      name: "Edit",
      icon: <EditIcon />,
      onClick: () => {},
    },
  ];
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div
        className={`h-full transform transition duration-300 ease-in-out cursor-grab ${
          isDragging && "opacity-40"
        }`}
        style={{
          transform: isDragging ? "scale(1.02)" : undefined,
          minHeight: "18rem",
        }}
      >
        <CardElement card={card} dropDownItems={dropDownItems} />
      </div>
    </div>
  );
};
export default Card;

export const CardElement = ({ card, dropDownItems = [], disabled = false }) => {
  const { title, subheading1, subheading2, links } = card;
  return (
    <div className="h-full rounded-2xl shadow hover:shadow-lg transition w-full sm:w-96 inline-block bg-white">
      <div className="h-full rounded-b-2xl rounded-t-3xl">
        <div className="relative flex flex-col space-y-1 bg-blue-500 text-white p-6 rounded-t-2xl">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "url('/assets/socket_illustration_1.svg')",
              backgroundPosition: "right",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              filter: "grayscale(1)",
            }}
          ></div>
          <div className="relative flex items-center justify-between text-white pb-2">
            <h2 className="font-bold text-3xl truncate">
              {title}
              {renderDummyIfEmpty(title.length <= 0)}
            </h2>
            <DropDown disabled={disabled} items={dropDownItems}>
              <MenuIcon size="1.5rem" />
            </DropDown>
          </div>

          <p className="relative text-sm font-light">
            {subheading1}
            {renderDummyIfEmpty(subheading1.length <= 0)}
          </p>
          <p className="relative text-sm font-light">
            {subheading2}
            {renderDummyIfEmpty(subheading2.length <= 0)}
          </p>
        </div>
        <div className="p-6 flex flex-col space-y-2 text-gray-600 rounded-b-2xl">
          {links &&
            links.map((link, i) => {
              return (
                <Link
                  key={i}
                  icon={link && link.icon}
                  url={link && link.url}
                  disabled={disabled}
                >
                  {link.linkName}
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const Link = ({ url, icon, children, disabled = false }) => {
  return (
    <a
      href={url || "/404"}
      target={!url ? "_blank" : ""}
      className={`flex items-center space-x-2 hover:text-blue-500 font-light ${
        disabled && "pointer-events-none"
      }`}
    >
      {iconDict[icon]}
      <span>{children}</span>
    </a>
  );
};
