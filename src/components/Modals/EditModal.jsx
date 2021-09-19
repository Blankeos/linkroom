import React, { useRef, useReducer } from "react";

import Modal from "./Modal";

import { IoMdClose as CloseIcon } from "react-icons/io";

const EditModal = ({ isOpen, closeModal, card, dispatch }) => {
  // Custom property change handler
  const handlePropertyChange = (e) => {
    dispatch({
      type: "SET_PROPERTY",
      payload: {
        propertyName: e.target.name,
        value: e.target.value,
      },
    });
  };

  // Should've been a handler for onChange event, but just a function so parameters are more flexible.
  const changeLinkProperty = (linkID, linkPropertyName, value) => {
    dispatch({
      type: "SET_LINK_PROPERTY",
      payload: {
        linkID: linkID,
        linkPropertyName: linkPropertyName,
        value: value,
      },
    });
  };

  return (
    <Modal
      modalClass="w-full sm:w-9/12 md:w-7/12 lg:w-5/12"
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <h1 className="flex justify-between mb-5 font-bold text-xl text-gray-700">
        <span>✍ Edit Card</span>
        <button onClick={closeModal}>
          <CloseIcon
            className="text-gray-400 hover:text-gray-500"
            size="1.2rem"
          />
        </button>
      </h1>
      <div className="flex flex-col space-y-3">
        <div className="input-focus-wrapper flex flex-col space-y-1">
          <EditLabel id="edit_title">Title</EditLabel>
          <EditInput
            id="edit_title"
            name="title"
            placeholder="Enter title"
            value={card && card.title}
            onChange={handlePropertyChange}
          />
        </div>
        <div className="input-focus-wrapper flex flex-col space-y-1">
          <EditLabel id="edit_subheading1">Subheading 1</EditLabel>
          <EditInput
            id="edit_subheading1"
            name="subheading1"
            placeholder="Enter subheading 1"
            value={card && card.subheading1}
            onChange={handlePropertyChange}
          />
        </div>
        <div className="input-focus-wrapper flex flex-col space-y-1">
          <EditLabel id="edit_subheading2">Subheading 2</EditLabel>
          <EditInput
            id="edit_subheading2"
            name="subheading2"
            placeholder="Enter subheading 2"
            value={card && card.subheading2}
            onChange={handlePropertyChange}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <EditLabel>Links</EditLabel>
          <div className="links-container-(not-a-real-class) flex flex-col space-y-3">
            {card &&
              card.links.map((link) => {
                return (
                  <LinkItem
                    key={link._id}
                    linkValue={link}
                    onDelete={() =>
                      dispatch({
                        type: "DELETE_LINK",
                        payload: {
                          id: link._id,
                        },
                      })
                    }
                    changeLinkProperty={changeLinkProperty}
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

const EditInput = ({
  id,
  name = undefined,
  onChange = () => null,
  placeholder = "",
  defaultValue = "",
  value = "",
}) => {
  return (
    <input
      id={id}
      name={name}
      className="p-2 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded border border-gray-300"
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      value={value}
      autoComplete="off"
    />
  );
};

const LinkItem = ({
  onDelete = () => null,
  linkValue,
  changeLinkProperty = () => null,
}) => {
  return (
    <a className="border border-gray-200 focus-within:ring-1 focus-within:ring-blue-400 rounded cursor-default">
      <span className="bg-gray-50 p-3.5 rounded text-sm flex flex-col group space-y-2">
        <span className="flex justify-between items-center">
          <span>Icon</span>
          <button onClick={onDelete}>
            <CloseIcon
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
            className="border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 p-1 w-full placeholder-gray-400 text-gray-600"
            value={linkValue && linkValue.linkName}
            onChange={(e) =>
              changeLinkProperty(linkValue._id, "linkName", e.target.value)
            }
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
            className="border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 p-1 w-full placeholder-gray-400 text-gray-600"
            value={linkValue && linkValue.url}
            onChange={(e) =>
              changeLinkProperty(linkValue._id, "url", e.target.value)
            }
          />
        </span>
      </span>
    </a>
  );
};
export default EditModal;
