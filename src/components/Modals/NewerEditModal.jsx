import React, { useCallback, useRef } from "react";

import Modal from "./Modal";

import { IoMdClose as CloseIcon } from "react-icons/io";

import iconDict from "../../data/iconDict";
import Tippy from "@tippyjs/react";
import { BlockPicker } from "react-color";

const EditModal = ({
  modalHeader = "Edit Card",
  isOpen,
  closeModal,
  completeEditModal,
  card,
  dispatch,
}) => {
  // Autofocus functionality (Might have bugs with different CPU performance)
  // autoFocus doesn't work since useEffect mount doesn't work on this component
  const titleRef = useCallback((node) => {
    if (node !== null) {
      setTimeout(() => {
        node.focus();
      }, 100);
    }
  }, []);

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
        <div className="flex items-center justify-between text-xl text-gray-700 dark:text-gray-200">
          <h1 className="">
            <span>✍</span>
            <span> </span>
            <span className="font-bold">{modalHeader}</span>
          </h1>
          <button onClick={closeModal}>
            <CloseIcon
              className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
              size="1.2rem"
            />
          </button>
        </div>
        <div className="the-color-picker flex items-center mt-10">
          <Tippy
            trigger="click mouseenter"
            interactive={true}
            arrow={false}
            theme="transparent"
            placement="right-end"
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
              <span style={{ color: (card && card.color) || "#3B82F6" }}>
                Pick A Color
              </span>
              <button
                className="h-9 w-9 rounded-full border-2 border-transparent"
                style={{ backgroundColor: (card && card.color) || "#3B82F6" }}
              ></button>
            </span>
          </Tippy>
        </div>
      </div>
      {/* Card Preview */}
      <div className="bg-green-500 grid grid-cols-1 h-full min-h-[20rem] max-h-full shadow hover:shadow-lg transition w-full">
        <div className="h-full bg-indigo-600 flex flex-col">
          {/* Card Preview Top Part */}
          <div
            className="relative flex flex-col space-y-1 text-white p-6"
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
                  ref={titleRef}
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
          {/* Card Preview Bottom Half */}
          <div className="bg-white dark:bg-gray-700 flex-grow p-6 flex flex-col space-y-2 text-gray-600 dark:text-gray-300">
            {card &&
              card.links &&
              card.links.map((link, i) => {
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
            <span className="pt-1">
              <button
                className="text-green-500 dark:text-green-300"
                onClick={() =>
                  dispatch({
                    type: "NEW_LINK",
                  })
                }
              >
                + Add new link
              </button>
            </span>
          </div>
        </div>
      </div>
      {/* End of Card Preview */}
      <div className="bg-gray-200 px-10 py-5 flex justify-end items-center space-x-5 dark:bg-gray-800">
        <button className="text-green-500 font-medium" onClick={closeModal}>
          Cancel
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 py-2 px-3.5 text-green-100 rounded-md font-medium dark:bg-green-400 dark:hover:bg-green-500 dark:text-white"
          onClick={completeEditModal}
        >
          Save changes
        </button>
      </div>
    </Modal>
  );
};

const LinkItem = ({
  onDelete = () => null,
  linkValue,
  changeLinkProperty = () => null,
}) => {
  return (
    <div className={`flex items-center space-x-2 font-light`}>
      {/* Icon */}
      <Tippy
        interactive
        trigger="click"
        hideOnClick
        content={
          <div className="grid grid-cols-4">
            {Object.keys(iconDict).map((key, i) => {
              return (
                <button
                  className="outline-none focus:outline-none"
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
        <span className="flex items-center">
          <Tippy content="Choose an icon" hideOnClick arrow={false}>
            <button className="">{iconDict[linkValue.icon]}</button>
          </Tippy>
        </span>
      </Tippy>
      {/* Link Name */}
      <input
        className="bg-transparent border-b border-transparent focus:border-gray-600 dark:focus:border-gray-300 outline-none font-light w-full"
        placeholder="Enter link name"
        onChange={(e) =>
          changeLinkProperty(linkValue._id, "linkName", e.target.value)
        }
        value={linkValue.linkName}
      />
      <input
        className="bg-transparent border-b border-transparent focus:border-gray-600 dark:focus:border-gray-300 outline-none font-light w-full text-gray-500 hover:text-gray-500 dark:text-gray-400 dark:focus:text-gray-300 dark:placeholder-gray-500"
        placeholder="Enter link url"
        onChange={(e) =>
          changeLinkProperty(linkValue._id, "url", e.target.value)
        }
        value={linkValue.url}
      />
      <button onClick={onDelete}>
        <CloseIcon
          className="text-gray-500 hover:text-gray-500 dark:hover:text-gray-300"
          size="1.2rem"
        />
      </button>
    </div>
  );
};

const LinkItem2 = ({
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
                <button className="">{iconDict[linkValue.icon]}</button>
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
