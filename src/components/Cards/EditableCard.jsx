import React, { useState, useEffect } from "react";
import { BsArrowsMove as MoveIcon } from "react-icons/bs";
import { MdAdd as AddIcon } from "react-icons/md";
import { IoMdClose as DeleteIcon } from "react-icons/io";
import { GoKebabVertical as MenuIcon } from "react-icons/go";

import { Transition } from "@headlessui/react";

import iconDict from "../../data/iconDict";

import { useCardsContext } from "../../contexts/CardsContext";
import Tippy from "@tippyjs/react";
import DropDown from "../DropDown";

import { generate } from "shortid";

const EditableCard = ({ index, title, subheading1, subheading2, links }) => {
  const {
    changeOneCardTitle,
    addNewLinkOneCard,
    deleteLinkOneCard,
    changeLinkOneCardProperty,
    deleteCard,
  } = useCardsContext();

  const dropDownItems = [
    { name: "Delete", icon: <DeleteIcon />, onClick: () => deleteCard(index) },
  ];

  return (
    <div
      className="rounded-2xl shadow hover:shadow-lg transition w-full sm:w-96 inline-block"
      style={{ minHeight: "18rem" }}
    >
      <div className="h-full rounded-b-2xl border-r border-l border-b rounded-t-3xl">
        <div className="flex flex-col space-y-1.5 bg-blue-500 text-gray-600 p-3 pb-5 rounded-t-2xl border border-blue-500">
          <div className="flex justify-end text-white pb-2">
            <DropDown items={dropDownItems}>
              <MenuIcon size="1.5rem" />
            </DropDown>
          </div>
          <input
            className="font-bold text-3xl p-2 py-1 rounded-lg outline-none bg-white bg-opacity-10 text-white placeholder-gray-50 placeholder-opacity-50"
            defaultValue={title && title}
            placeholder="Title"
            onChange={(e) => {
              changeOneCardTitle(index, "title", e.target.value);
            }}
          />
          <input
            className="text-sm p-2 py-1 rounded-lg outline-none bg-white bg-opacity-10 text-white placeholder-gray-50 placeholder-opacity-50"
            defaultValue={subheading1 && subheading1}
            placeholder="Subheading 1"
            onChange={(e) => {
              changeOneCardTitle(index, "subheading1", e.target.value);
            }}
          />
          <input
            className="text-sm p-2 py-1 rounded-lg outline-none bg-white bg-opacity-10 text-white placeholder-gray-50 placeholder-opacity-50"
            defaultValue={subheading2 && subheading2}
            placeholder="Subheading 2"
            onChange={(e) => {
              changeOneCardTitle(index, "subheading2", e.target.value);
            }}
          />
        </div>
        <div className="py-5 flex flex-col space-y-2 text-gray-600">
          {links &&
            links.map((link, i) => {
              return (
                <Link
                  key={link._id}
                  icon={link && link.icon}
                  url={link.url}
                  onDeleteClick={() => deleteLinkOneCard(index, i)}
                  cardID={index}
                  linkID={i}
                  changeLinkOneCardPropertyFunction={changeLinkOneCardProperty}
                >
                  {link.linkName}
                </Link>
              );
            })}
          <NewLinkButton onClick={() => addNewLinkOneCard(index)} />
        </div>
      </div>
    </div>
  );
};

const Link = ({
  url,
  icon,
  children,
  onDeleteClick,
  cardID,
  linkID,
  changeLinkOneCardPropertyFunction,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (e) => {
    changeLinkOneCardPropertyFunction(
      cardID,
      linkID,
      e.target.name,
      e.target.value
    );
  };
  return (
    <Tippy
      interactive={true}
      placement={"right"}
      offset={[0, -12]}
      content={
        <button
          onClick={onDeleteClick || (() => {})}
          className="p-1 rounded-full text-red-400"
        >
          <DeleteIcon />
        </button>
      }
    >
      <span
        className="relative flex items-center space-x-2 px-5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Tippy
          interactive
          trigger="click"
          hideOnClick
          content={
            <div className="grid grid-cols-4">
              {Object.keys(iconDict).map((key, i) => {
                return (
                  <button
                    onClick={() => {
                      changeLinkOneCardPropertyFunction(
                        cardID,
                        linkID,
                        "icon",
                        key
                      );
                    }}
                    className="p-2 text-lg"
                    key={i}
                  >
                    {iconDict[key]}
                  </button>
                );
              })}
            </div>
          }
        >
          <span className="cursor-pointer">{iconDict[icon]}</span>
        </Tippy>
        <input
          name="linkName"
          onChange={handleChange}
          defaultValue={children}
          placeholder="Link Name"
          className="border border-gray-300 py-0.5 px-1.5 w-full text-sm"
        />
        <input
          name="url"
          onChange={handleChange}
          className="border border-gray-300 py-0.5 px-1.5 w-full text-sm"
          placeholder="URL"
          defaultValue={url}
        />
        {/* <Transition appear show={isHovered} as={React.Fragment}>
        <button
        onClick={onDeleteClick || (() => {})}
        className="absolute -right-3.5 bg-gray-600 p-1 rounded-full text-white"
        >
        <DeleteIcon />
        </button>
      </Transition> */}
      </span>
    </Tippy>
  );
};

const NewLinkButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick || (() => {})}
      className="select-none inline-flex items-center justify-center mx-5 px-4 py-2 text-sm font-medium text-blue-500 border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
    >
      Add New Link <AddIcon />
    </button>
  );
};

export default EditableCard;
