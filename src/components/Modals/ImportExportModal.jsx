import React, { useState, useEffect } from "react";
import Modal from "./Modal";

import { useCardsContext } from "../../contexts/CardsContext";

// Icons
import { RiInformationLine as InfoIcon } from "react-icons/ri";
import { IoMdClose as CloseIcon } from "react-icons/io";
import { HiUpload as ImportIcon } from "react-icons/hi";
import { BiCopy as CopyIcon, BiCheckCircle as CheckIcon } from "react-icons/bi";
import { BsCheck as CopiedIcon } from "react-icons/bs";
import { MdError as ErrorIcon } from "react-icons/md";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

// UtilityFunctions
import cardsValidate, { isValid } from "../../data/cardsValidate";
import { toast } from "react-toastify";

const ImportExportModal = ({ isOpen, closeModal }) => {
  const { cards, importCards } = useCardsContext();
  const [importInput, setImportInput] = useState("");

  const [errors, setErrors] = useState([]); // List of strings to be displayed under import text area
  const [importIsValid, setImportIsValid] = useState(false); // bool for displaying green ring around text area when valid
  const [importInputWasUsed, setImportInputWasUsed] = useState(false); // bool to disable validation when not used yet. For onChange. (better UX)
  // Copy Button State
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const handleClose = () => {
    // Reset states after 0.5s. (Wait for modal close animation)
    setTimeout(() => {
      setImportInput("");
      setErrors([]);
      setImportIsValid(false);
      setImportInputWasUsed(false);
    }, 500);

    closeModal();
  };

  const validateImport = (onValid = (data) => {}, onInvalid = () => {}) => {
    let data;
    try {
      // Parsing JSON string
      data = JSON.parse(importInput);

      if (isValid(data)) {
        onValid(data);
        setErrors([]);
        setImportIsValid(true);
      } else {
        setErrors(
          cardsValidate.errors.map(
            (err) => `${err.instancePath} ${err.message}`
          )
        );
        setImportIsValid(false);
        onInvalid();
      }
    } catch (err) {
      if (err instanceof SyntaxError) {
        console.log("Failed to parse import (Might not be a JSON file)");
        setErrors(["Incorrect JSON format"]);
      } else if (err instanceof TypeError) {
        // This error might not be raised because we're using isValid() to check properties
        console.log("Can't read any properties of imported JSON");
      }
      setImportIsValid(false);
      onInvalid();
    }
  };

  const handleSave = () => {
    validateImport(
      (data) => {
        importCards(data);
        toast.success("Successfully Imported 🎉", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleClose();
      },
      () => {
        toast.error("Failed To Import 😭", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    );
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(cards));
    setCopyButtonText("Copied");
    setTimeout(() => {
      setCopyButtonText("Copy");
    }, 2000);
  };

  useEffect(() => {
    const to = setTimeout(() => {
      // This if statement is so it only validates when the modal is used.
      // When the modal is first shown, it won't validate until the user types.
      // When the user erases their inputs, it will validate even when empty.
      if (importInput.length > 0) {
        // Here, input is validated when the textarea isn't empty.
        validateImport();
      } else {
        // Here, the textarea is empty, but will only validate
        // if the user has previously typed. (It was used)
        if (importInputWasUsed) {
          validateImport();
        }
      }
    }, 300);

    // Here, we keep a state bool that says the import input was used.
    if (importInput.length > 0 && !importInputWasUsed) {
      setImportInputWasUsed(true);
    }

    return () => clearTimeout(to);
  }, [importInput]);

  return (
    <Modal
      modalClass="w-full sm:w-11/12 md:w-9/12 lg:w-7/12 p-10 dark:bg-gray-900"
      isOpen={isOpen}
      closeModal={handleClose}
    >
      <div className="flex justify-end">
        <button onClick={handleClose}>
          <CloseIcon
            className="text-gray-400 hover:text-gray-500"
            size="1.2rem"
          />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[2fr,1fr] gap-6">
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
              spellCheck={false}
              onChange={(e) => {
                setImportInput(e.target.value);
              }}
              className={`p-2 h-full w-full resize-none border border-gray-300 rounded outline-none focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:border-gray-700 ${
                errors.length > 0
                  ? "ring-1 ring-red-400"
                  : importIsValid
                  ? "ring-1 ring-green-400"
                  : "focus:ring-1 focus:ring-blue-500"
              }`}
              value={importInput}
            ></textarea>
          </div>
          <div className="mt-2.5 text-sm">
            {errors.length > 0 &&
              errors.map((err, i) => (
                <span
                  className="flex items-center space-x-1 text-red-400"
                  key={i}
                >
                  <ErrorIcon size="1.15rem" />
                  <span>{err}.</span>
                </span>
              ))}
            {importIsValid && (
              <span className="flex items-center space-x-1 text-green-400">
                <CheckIcon size="1.15rem" />
                <span>Good to go!</span>
              </span>
            )}
            {/* <span className="text-green-400">Valid</span> */}
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
              spellCheck={false}
              onChange={() => {}}
              className="p-2 h-full w-full resize-none border border-gray-400 focus:ring-1 rounded focus:ring-blue-500 outline-none focus:outline-none text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-600"
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

const ModalButton = ({ children, onClick, className, disabled = false }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`select-none flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500  ${className} `}
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
