import React, { useState, useContext, createContext } from "react";
import EditModal from "../components/Modals/EditModal";

const initialValue = {};

const EditModalContext = createContext(initialValue);

const useEditModalContext = () => useContext(EditModalContext);

const EditModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const showEditModal = (initialCardValue) => {
    if (initialCardValue) {
    }
  };
  const value = {};

  return (
    <EditModalContext.Provider value={value}>
      {children}
      <EditModal />
    </EditModalContext.Provider>
  );
};

export default EditModalProvider;
