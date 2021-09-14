import React from "react";
import { isMobile } from "react-device-detect";
import PrimaryButton from "../PrimaryButton";

import Modal from "./Modal";
const InstallModal = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex flex-grow justify-center items-center flex-col space-y-5">
        <img className="w-52 h-52" src="/assets/socket_illustration_1.svg" />
        <h1 className="font-medium">
          Install LinkRoom on your {isMobile ? "Mobile Device" : "Desktop"}
        </h1>
        <p className="text-center text-sm max-w-sm font-light">
          LinkRoom is a PWA (Progressive Web App) that runs like any native
          application. You can use it just like any app, but doesn't require an
          internet connection.
        </p>
        <PrimaryButton>Install</PrimaryButton>
        <button className="text-sm text-blue-500">Not Now</button>
      </div>
    </Modal>
  );
};

export default InstallModal;
