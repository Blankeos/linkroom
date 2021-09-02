import React from "react";
import Modal from "./Modal";

import cardsData from "../data/cards.json";

const ImportExportModal = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex space-x-6">
        <div>
          <span className="block mb-2 text-lg text-gray-600 font-semibold">
            Import
          </span>
          <div className=" w-96 h-52  text-gray-600">
            <textarea className="p-2 h-full w-full resize-none border border-blue-100 focus:ring-1 rounded focus:ring-blue-500 outline-none focus:outline-non"></textarea>
          </div>
        </div>
        <div>
          <span className="block mb-2 text-lg text-gray-600 font-semibold">
            Export
          </span>
          <div className=" w-96 h-52 text-gray-600">
            <textarea
              className="p-2 h-full w-full resize-none border border-blue-100 focus:ring-1 rounded focus:ring-blue-500 outline-none focus:outline-none"
              value={JSON.stringify(cardsData)}
            ></textarea>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImportExportModal;
