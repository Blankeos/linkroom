import React, { useState } from "react";
import Modal from "./Modal";

import { useCardsContext, CARDS_STORAGE } from "../../contexts/CardsContext";

// For error checking
import Card from "../Cards/Card";

// Icons
import { RiInformationLine as InfoIcon } from "react-icons/ri";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { HiUpload as ImportIcon } from "react-icons/hi";
import { BiCopy as CopyIcon } from "react-icons/bi";
import { BsCheck as CopiedIcon } from "react-icons/bs";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const ImportExportModal = ({ isOpen, closeModal }) => {
  const { cards, importCards } = useCardsContext();
  const [importInput, setImportInput] = useState("");

  // Copy Button State
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  function CardsJSONFormatError() {}
  CardsJSONFormatError.prototype = new Error();

  const handleSave = () => {
    let data;
    try {
      // Parsing JSON string
      data = JSON.parse(importInput);

      // Checking if valid format?
      data.cards.map((card, i) => {
        return (
          <Card
            key={card._id}
            title={card.title}
            subheading1={card.subheading1}
            subheading2={card.subheading2}
            links={card.links}
          />
        );
      });

      // Saving to json file
      importCards(data);
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log("Failed to parse import (Might not be a JSON file)");
      } else if (e instanceof TypeError) {
        console.log("Can't read any properties of imported JSON");
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(cards));
    setCopyButtonText("Copied");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000);
  };

  return (
    <Modal
      modalClass="w-full sm:w-11/12 md:w-9/12 lg:w-7/12 p-10 dark:bg-gray-900"
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <div className="flex justify-end">
        <button onClick={closeModal}>
          <CloseIcon
            className="text-gray-400 hover:text-gray-500"
            size="1.2rem"
          />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <span className="flex space-x-2 items-center mb-2 text-lg text-gray-700 dark:text-gray-200 font-semibold">
            <span>Import</span>
            <InfoHoverable
              content={
                "Paste a JSON text here with the correct format to overwrite all your cards."
              }
            />
          </span>
          <div className="h-52  text-gray-600">
            <textarea
              onChange={(e) => setImportInput(e.target.value)}
              className="p-2 h-full w-full resize-none border border-blue-100 focus:ring-1 rounded focus:ring-blue-500 outline-none focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:border-gray-700"
              value={importInput}
            ></textarea>
          </div>
          <ModalButton className="mt-3" onClick={handleSave}>
            <ImportIcon size="1.1rem" />
            <span>Import</span>
          </ModalButton>
        </div>
        <div>
          <span className="flex space-x-2 items-center mb-2 text-lg text-gray-700 dark:text-gray-200 font-semibold">
            <span>Export</span>
            <InfoHoverable
              content={"Copy this text and share or import on another device."}
            />
          </span>
          <div className="h-52 text-gray-600">
            <textarea
              onChange={() => {}}
              className="p-2 h-full w-full resize-none border border-blue-100 focus:ring-1 rounded focus:ring-blue-500 outline-none focus:outline-none text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-600"
              value={JSON.stringify(cards)}
            ></textarea>
          </div>
          <ModalButton className="mt-3" onClick={handleCopy}>
            {copyButtonText === "Copy" ? (
              <CopyIcon size="1.1rem" />
            ) : (
              <CopiedIcon size="1.1rem" />
            )}
            <span>{copyButtonText}</span>
          </ModalButton>
        </div>
      </div>
    </Modal>
  );
};

const ModalButton = ({ children, onClick, className }) => {
  return (
    <button
      type="button"
      className={` flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500  ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const InfoHoverable = ({ content }) => {
  return (
    <Tippy content={content || "Hello"}>
      <span className="cursor-pointer">
        <InfoIcon size="1rem" />
      </span>
    </Tippy>
  );
};

export default ImportExportModal;
