import React, { useRef, useReducer } from "react";
import { generate } from "shortid";
import { cloneDeep } from "lodash";

import Modal from "./Modal";

import { TiDelete as DeleteIcon } from "react-icons/ti";

const initialState = {
  _id: generate(),
  title: "",
  subheading1: "",
  subheading2: "",
  links: [],
};

const initialLink = {
  _id: generate(),
  linkName: "",
  url: "",
  icon: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL":
      return state;
    case "NEW_LINK":
      let linksClone = cloneDeep(state.links);
      linksClone = [...linksClone, initialLink];
      return {
        ...state,
        links: linksClone,
      };

    default:
      return state;
  }
};
const EditModal = ({ isOpen, closeModal }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Modal
      modalClass="w-full sm:w-9/12 md:w-7/12 lg:w-5/12"
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <h1 className="mb-5 font-bold text-xl text-gray-700">✍ Edit Card</h1>
      <div className="flex flex-col space-y-3">
        <div className="group flex flex-col space-y-1">
          <EditLabel id="edit_title">Title</EditLabel>
          <EditInput id="edit_title" placeholder="Enter title" />
        </div>
        <div className="group flex flex-col space-y-1">
          <EditLabel id="edit_subheading1">Subheading 1</EditLabel>
          <EditInput id="edit_subheading1" placeholder="Enter subheading 1" />
        </div>
        <div className="group flex flex-col space-y-1">
          <EditLabel id="edit_subheading2">Subheading2</EditLabel>
          <EditInput id="edit_subheading2" placeholder="Enter subheading 2" />
        </div>
        <div className="flex flex-col space-y-1">
          <EditLabel>Links</EditLabel>
          <div className="links-container-(not-a-real-class) flex flex-col space-y-3">
            {state.links.map((link, i) => {
              return <LinkItem />;
            })}
            <button
              onClick={() =>
                dispatch({
                  type: "NEW_LINK",
                })
              }
              className="text-sm focus-within:ring-1 rounded border border-blue-500 py-5 transition hover:bg-blue-500 hover:text-white text-blue-500 font-semibold"
            >
              Add New Link +
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const EditLabel = ({ id, children }) => {
  return (
    <label
      for={id}
      className="font-semibold text-gray-700 group-focus-within:text-blue-500"
    >
      {children}
    </label>
  );
};

const EditInput = ({ id, onChange = () => null, placeholder = "" }) => {
  return (
    <input
      id={id}
      className="p-2 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded border border-gray-300"
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

const LinkItem = () => {
  return (
    <button className="focus-within:ring-1 focus-within:ring-blue-400 rounded cursor-default">
      <span className="bg-gray-100 p-3.5 rounded text-sm flex flex-col group space-y-2">
        <span className="flex justify-between items-center">
          <button>Icon</button>
          <button className="">
            <DeleteIcon
              className="text-red-400 hover:text-red-500"
              size="1.5rem"
            />
          </button>
        </span>
        <span className="grid items-center grid-cols-[65px,4fr] gap-y-2">
          <label className="text-left">Name</label>
          <input className="p-1 w-full" />
          <label className="text-left">URL</label>
          <input className="p-1 w-full" />
        </span>
      </span>
    </button>
  );
};
export default EditModal;
