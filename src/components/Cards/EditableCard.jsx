import React, { useState, useReducer, useEffect } from "react";
import { BsArrowsMove as MoveIcon } from "react-icons/bs";
import { MdAdd as AddIcon } from "react-icons/md";
import { IoMdClose as DeleteIcon } from "react-icons/io";
import { GoKebabVertical as MenuIcon } from "react-icons/go";

import { Transition } from "@headlessui/react";

import iconDict from "../../data/iconDict";

import { useCardsContext } from "../../contexts/CardsContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "NEW_LINK":
      return {
        ...state,
        links: [
          ...state.links,
          {
            linkName: "",
            icon: "default_link",
            url: "",
          },
        ],
      };
    case "DELETE_LINK":
      const newLinks = [...state.links];
      newLinks.splice(action.payload, 1);

      return {
        ...state,
        links: newLinks,
      };
    default:
      return state;
  }
};

const EditableCard = ({ index, title, subheading1, subheading2, links }) => {
  const initialState = {
    title,
    subheading1,
    subheading2,
    links,
  };

  const { changeOneCardTitle } = useCardsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div
      className="rounded-2xl shadow hover:shadow-lg transition w-96 inline-block"
      style={{ minHeight: "18rem" }}
    >
      <div className="h-full rounded-b-2xl border-r border-l border-b rounded-t-3xl">
        <div className="flex flex-col space-y-1.5 bg-blue-500 text-gray-600 p-3 pb-5 rounded-t-2xl border border-blue-500">
          <div className="flex justify-end text-white pb-2">
            {/* <button className="cursor-grab active:cursor-grabbing">
              <MoveIcon size="1.5rem" />
            </button> */}
            <button className="">
              <MenuIcon size="1.5rem" />
            </button>
          </div>
          <input
            className="font-bold text-3xl p-2 py-1 rounded-lg outline-none"
            defaultValue={state && state.title}
            onChange={(e) => {
              changeOneCardTitle(index, "title", e.target.value);
            }}
          />
          <input
            className="text-sm p-2 py-1 rounded-lg outline-none text-gray-500"
            defaultValue={state && state.subheading1}
            onChange={(e) => {
              changeOneCardTitle(index, "subheading1", e.target.value);
            }}
          />
          <input
            className="text-sm p-2 py-1 rounded-lg outline-none text-gray-500"
            defaultValue={state && state.subheading2}
            onChange={(e) => {
              changeOneCardTitle(index, "subheading2", e.target.value);
            }}
          />
        </div>
        <div className="py-5 flex flex-col space-y-2 text-gray-600">
          {state &&
            state.links &&
            state.links.map((link, i) => {
              return (
                <Link
                  key={i}
                  icon={link && link.icon}
                  url={link.url}
                  onDeleteClick={() =>
                    dispatch({ type: "DELETE_LINK", payload: i })
                  }
                >
                  {link.linkName}
                </Link>
              );
            })}
          <NewLinkButton onClick={() => dispatch({ type: "NEW_LINK" })} />
        </div>
      </div>
    </div>
  );
};

const Link = ({ url, icon, children, onDeleteClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative flex items-center space-x-2 px-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{iconDict[icon]}</span>
      <input
        defaultValue={children}
        placeholder="Link Name"
        className="border border-gray-300 py-0.5 px-1.5 w-full"
      />
      <input
        className="border border-gray-300 py-0.5 px-1.5 w-full"
        placeholder="URL"
        defaultValue={url}
      />
      <Transition appear show={isHovered} as={React.Fragment}>
        <button
          onClick={onDeleteClick || (() => {})}
          className="absolute -right-4 bg-gray-600 p-1 rounded-full text-white"
        >
          <DeleteIcon />
        </button>
      </Transition>
    </span>
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
