import React from "react";

import Modal from "./Modal";

import { IoMdClose as CloseIcon } from "react-icons/io";

import iconDict from "../../data/iconDict";
import Tippy from "@tippyjs/react";
import { BlockPicker } from "react-color";

const EditModal = ({
  isOpen,
  closeModal,
  completeEditModal,
  card,
  dispatch,
}) => {
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
      modalClass="w-full sm:w-10/12 md:w-10/12 lg:w-8/12 xl:w-5/12 dark:bg-gray-900"
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <div className="p-10 pb-5">
        <h1 className="flex items-center justify-between font-bold text-xl text-gray-700 dark:text-gray-200">
          <span>✍ Edit Card</span>
          <button onClick={closeModal}>
            <CloseIcon
              className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
              size="1.2rem"
            />
          </button>
        </h1>
        <div className="the-color-picker flex items-center mt-10">
          <Tippy
            trigger="click mouseenter"
            interactive={true}
            arrow={false}
            theme="transparent"
            content={
              <div className="shadow-lg rounded">
                <BlockPicker
                  colors={[
                    "#3B82F6",
                    "#2ccce4",
                    "#EF4444",
                    "#F47373",
                    "#ff8a65",
                    "#F59E0B",
                    "#37d67a",
                    "#EC4899",
                    "#ba68c8",
                    "#555555",
                  ]}
                  color={(card && card.color) || "#3B82F6"}
                  triangle="hide"
                  onChangeComplete={(color) =>
                    dispatch({
                      type: "SET_PROPERTY",
                      payload: {
                        propertyName: "color",
                        value: color.hex,
                      },
                    })
                  }
                />
              </div>
            }
          >
            <span className="flex items-center space-x-5 font-medium cursor-pointer">
              <button
                className="h-10 w-10 rounded-full border-2 border-gray-900"
                style={{ backgroundColor: (card && card.color) || "#3B82F6" }}
              ></button>
              <span style={{ color: (card && card.color) || "#3B82F6" }}>
                Pick A Color
              </span>
            </span>
          </Tippy>
        </div>
      </div>
      <div className="h-1 min-h-[20rem] shadow hover:shadow-lg transition w-full inline-block">
        <div className="h-full flex flex-col">
          <div
            className=" relative flex flex-col space-y-1 text-white p-6"
            style={{ backgroundColor: (card && card.color) || "#3B82F6" }}
          >
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
            <div className="relative flex flex-col space-y-1">
              <div className="flex flex-col text-white pb-2">
                <input
                  name="title"
                  className="font-bold text-3xl truncate tracking-tight pr-0.5 bg-transparent border-b border-transparent focus:border-white outline-none placeholder-gray-50 placeholder-opacity-50"
                  value={(card && card.title) || ""}
                  placeholder="Enter title"
                  onChange={handlePropertyChange}
                  spellCheck="false"
                  autoComplete="off"
                />
                {/* <h2 className="font-bold text-3xl truncate tracking-tight pr-0.5 border-b border-transparent">
                  {card && card.title}
                </h2> */}
              </div>
              <input
                name="subheading1"
                className="text-sm font-light bg-transparent border-b border-transparent focus:border-white outline-none placeholder-gray-50 placeholder-opacity-50"
                value={(card && card.subheading1) || ""}
                placeholder="Enter subheading 1"
                onChange={handlePropertyChange}
                spellCheck="false"
                autoComplete="off"
              />
              <input
                name="subheading2"
                className="text-sm font-light bg-transparent border-b border-transparent focus:border-white outline-none placeholder-gray-50 placeholder-opacity-50"
                value={(card && card.subheading2) || ""}
                placeholder="Enter subheading 2"
                onChange={handlePropertyChange}
                spellCheck="false"
                autoComplete="off"
              />
              {/* <p className="text-sm font-light border-b border-transparent">
                {(card && card.subheading1) || "Subheading 1"}
              </p> */}
              {/* <p className="text-sm font-light border-b border-transparent">
                {(card && card.subheading2) || "Subheading 2"}
              </p> */}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 flex-grow p-6 flex flex-col space-y-2 text-gray-600 dark:text-gray-300">
            {card &&
              card.links &&
              card.links.map((link, i) => {
                return (
                  <div>Hi</div>
                  // <Link
                  //   key={i}
                  //   icon={link && link.icon}
                  //   url={link && link.url}
                  //   disabled={disabled}
                  // >
                  //   {link.linkName}
                  // </Link>
                );
              })}
          </div>
        </div>
      </div>
      {/* <h1 className="flex items-center justify-between mb-5 font-bold text-xl text-gray-700 dark:text-gray-200 pb-5">
        <span>✍ Edit Card</span>
        <button onClick={closeModal}>
        <CloseIcon
        className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
        size="1.2rem"
        />
        </button>
      </h1>
      <div className="flex flex-col space-y-3">
      <div className="flex items-center">
      <Tippy
      trigger="click mouseenter"
      interactive={true}
      arrow={false}
      theme="transparent"
      content={
        <div className="shadow-lg rounded">
        <BlockPicker
        colors={[
          "#3B82F6",
          "#2ccce4",
          "#EF4444",
          "#F47373",
          "#ff8a65",
          "#F59E0B",
          "#37d67a",
          "#EC4899",
          "#ba68c8",
          "#555555",
        ]}
        color={(card && card.color) || "#3B82F6"}
        triangle="hide"
        onChangeComplete={(color) =>
          dispatch({
            type: "SET_PROPERTY",
            payload: {
              propertyName: "color",
              value: color.hex,
            },
          })
        }
        />
              </div>
            }
          >
            <span className="flex items-center space-x-5 font-medium cursor-pointer">
              <button
                className="h-10 w-10 rounded-full border-2 border-gray-600"
                style={{ backgroundColor: (card && card.color) || "#3B82F6" }}
              ></button>
              <span style={{ color: (card && card.color) || "#3B82F6" }}>
                Pick A Color
              </span>
            </span>
          </Tippy>
        </div>
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
              className="text rounded border border-gray-300 py-5 transition hover:bg-gray-50 bg-white text-gray-400 font-semibold"
            >
              Add New Link +
            </button>
          </div>
        </div>
        <div className="flex space-x-5 pt-10">
          <button
            onClick={closeModal}
            className="w-full text-sm focus-within:ring-1 rounded border border-blue-500 py-5 transition hover:bg-blue-400 hover:text-white bg-white text-blue-500 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={completeEditModal}
            className="w-full text-sm focus-within:ring-1 rounded border border-blue-500 py-5 transition hover:bg-blue-400 bg-blue-500 text-white font-semibold"
          >
            Done
          </button>
        </div>
      </div> */}
    </Modal>
  );
};

const EditLabel = ({ id, children }) => {
  return (
    <label
      htmlFor={id}
      className="font-semibold text-gray-700 dark:text-gray-300"
    >
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
      className="p-2 text-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded border border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400"
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
      <span className="bg-gray-50 p-3.5 rounded text-sm flex flex-col group space-y-2 dark:bg-gray-800">
        <span className="flex justify-between items-center">
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
                        if (changeLinkProperty) {
                          changeLinkProperty(linkValue._id, "icon", key);
                        }
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
            <span>
              <Tippy content="Choose an icon" hideOnClick arrow={false}>
                <button className="text-gray-500 hover:text-gray-500 text-lg cursor-pointer dark:hover:text-gray-300">
                  {iconDict[linkValue.icon]}
                </button>
              </Tippy>
            </span>
          </Tippy>

          <button onClick={onDelete}>
            <CloseIcon
              className="text-gray-500 hover:text-gray-500 dark:hover:text-gray-300"
              size="1.2rem"
            />
          </button>
        </span>
        <span className="input-focus-wrapper grid items-center grid-cols-[65px,1fr] gap-y-2">
          <label
            htmlFor="name"
            className="text-left text-gray-500 dark:text-gray-400"
          >
            Name
          </label>
          <input
            autoComplete="off"
            id="name"
            placeholder="Google Classroom"
            className="focus:outline-none focus:ring-1 focus:ring-blue-500 p-1.5 w-full bg-gray-50 placeholder-gray-400 text-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:placeholder-gray-600"
            value={linkValue && linkValue.linkName}
            onChange={(e) =>
              changeLinkProperty(linkValue._id, "linkName", e.target.value)
            }
          />
        </span>
        <span className="input-focus-wrapper grid items-center grid-cols-[65px,1fr] gap-y-2">
          <label
            htmlFor="url"
            className="text-left text-gray-500 dark:text-gray-400"
          >
            URL
          </label>
          <input
            autoComplete="off"
            id="url"
            placeholder="https://classroom.google.com"
            className="focus:outline-none focus:ring-1 focus:ring-blue-500 p-1.5 w-full bg-gray-50 placeholder-gray-400 text-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:placeholder-gray-600"
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
