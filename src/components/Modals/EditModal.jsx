import React, { useRef, useReducer } from "react";
import { generate } from "shortid";
import { cloneDeep } from "lodash";

import Modal from "./Modal";

import { IoMdClose as DeleteIcon } from "react-icons/io";

const createNewStateObject = () => ({
  _id: generate(),
  title: "",
  subheading1: "",
  subheading2: "",
  links: [],
});

const createNewLinkObject = () => ({
  _id: generate(),
  linkName: "",
  url: "",
  icon: "",
});

const reducer = (state, action) => {
  let linksClone;
  switch (action.type) {
    case "SET_ALL":
      return action.payload.state;
    case "NEW_LINK":
      linksClone = cloneDeep(state.links);
      linksClone = [...linksClone, createNewLinkObject()];
      return {
        ...state,
        links: linksClone,
      };
    case "DELETE_LINK":
      linksClone = cloneDeep(state.links);
      linksClone = linksClone.filter((link) => link._id !== action.payload.id);
      return {
        ...state,
        links: linksClone,
      };
    default:
      return state;
  }
};
const EditModal = ({ isOpen, closeModal }) => {
  const [state, dispatch] = useReducer(reducer, createNewStateObject());

  //   Custom Close Handler + the boolean state setter from the parent
  const handleClose = () => {
    closeModal();
    // This is so it resets the state when the close animation finishes. (Bad practice but it works)
    setTimeout(() => {
      dispatch({ type: "SET_ALL", payload: { state: createNewStateObject() } });
    }, 700);
  };
  return (
    <Modal
      modalClass="w-full sm:w-9/12 md:w-7/12 lg:w-5/12"
      isOpen={isOpen}
      closeModal={handleClose}
    >
      <h1 className="flex justify-between mb-5 font-bold text-xl text-gray-700">
        <span>✍ Edit Card</span>
        <button onClick={handleClose}>
          <DeleteIcon
            className="text-gray-400 hover:text-gray-500"
            size="1.2rem"
          />
        </button>
      </h1>
      <div className="flex flex-col space-y-3">
        <div className="input-focus-wrapper flex flex-col space-y-1">
          <EditLabel id="edit_title">Title</EditLabel>
          <EditInput id="edit_title" placeholder="Enter title" />
        </div>
        <div className="input-focus-wrapper flex flex-col space-y-1">
          <EditLabel id="edit_subheading1">Subheading 1</EditLabel>
          <EditInput id="edit_subheading1" placeholder="Enter subheading 1" />
        </div>
        <div className="input-focus-wrapper flex flex-col space-y-1">
          <EditLabel id="edit_subheading2">Subheading 2</EditLabel>
          <EditInput id="edit_subheading2" placeholder="Enter subheading 2" />
        </div>
        <div className="flex flex-col space-y-1">
          <EditLabel>Links</EditLabel>
          <div className="links-container-(not-a-real-class) flex flex-col space-y-3">
            {state.links.map((link, i) => {
              return (
                <LinkItem
                  key={link._id}
                  onDelete={() =>
                    dispatch({ type: "DELETE_LINK", payload: { id: link._id } })
                  }
                />
              );
            })}
            <button
              onClick={() =>
                dispatch({
                  type: "NEW_LINK",
                })
              }
              className="text-sm rounded border border-gray-200 py-5 transition hover:bg-gray-50 bg-white text-gray-400 font-semibold"
            >
              Add New Link +
            </button>
          </div>
        </div>
        <button className="text-sm focus-within:ring-1 rounded border border-blue-500 py-5 transition hover:bg-blue-400 bg-blue-500 text-white font-semibold">
          Done
        </button>
      </div>
    </Modal>
  );
};

const EditLabel = ({ id, children }) => {
  return (
    <label htmlFor={id} className="font-semibold text-gray-700">
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

const LinkItem = ({ onDelete = () => null }) => {
  return (
    <a className="border border-gray-200 focus-within:ring-1 focus-within:ring-blue-400 rounded cursor-default">
      <span className="bg-gray-50 p-3.5 rounded text-sm flex flex-col group space-y-2">
        <span className="flex justify-between items-center">
          <span>Icon</span>
          <button onClick={onDelete}>
            <DeleteIcon
              className="text-gray-400 hover:text-gray-500"
              size="1.2rem"
            />
          </button>
        </span>
        <span className="input-focus-wrapper grid items-center grid-cols-[65px,1fr] gap-y-2">
          <label htmlFor="name" className="text-left">
            Name
          </label>
          <input
            autoComplete="off"
            id="name"
            placeholder="Google Classroom"
            className="border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 p-1 w-full placeholder-gray-400"
          />
        </span>
        <span className="input-focus-wrapper grid items-center grid-cols-[65px,1fr] gap-y-2">
          <label htmlFor="url" className="text-left">
            URL
          </label>
          <input
            autoComplete="off"
            id="url"
            placeholder="https://classroom.google.com"
            className="border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 p-1 w-full placeholder-gray-400"
          />
        </span>
      </span>
    </a>
  );
};
export default EditModal;
