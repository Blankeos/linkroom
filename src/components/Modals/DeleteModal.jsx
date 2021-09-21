import React from "react";
import Modal from "./Modal";

import { IoMdClose as CloseIcon } from "react-icons/io";

// Heading Messages
const MessageDefault = () => (
  <span>😥 Are you sure you want to delete this card?</span>
);
const MessageWithCardName = ({ cardName }) => (
  <>
    <span>😥 Are you sure you want to delete</span>
    <p className="font-normal truncate pt-5">{cardName}?</p>
  </>
);
const DeleteModal = ({ card, isOpen, closeModal, completeDeleteModal }) => {
  const headingMessage = () => {
    if (card) {
      if (card.title) {
        return <MessageWithCardName cardName={card.title} />;
      } else {
        return <MessageDefault />;
      }
    } else {
      return <MessageDefault />;
    }
  };
  return (
    <Modal
      modalClass="w-9/12 sm:w-6/12 md:w-5/12 lg:w-4/12 xl:w-3/12"
      isOpen={isOpen}
      closeModal={closeModal}
    >
      <div>
        <h1 className="mb-5 font-bold text-xl text-gray-700 text-center">
          {headingMessage()}
        </h1>
        <div className="flex space-x-5 pt-5">
          <button
            onClick={closeModal}
            className="w-full text-sm focus-within:ring-1 rounded border border-blue-500 py-5 transition hover:bg-blue-400 hover:text-white bg-white text-blue-500 font-semibold"
          >
            No
          </button>
          <button
            onClick={completeDeleteModal}
            className="w-full text-sm focus-within:ring-1 rounded border border-blue-500 py-5 transition hover:bg-blue-400 bg-blue-500 text-white font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
