import React, { useState, useContext, createContext, useReducer } from "react";
import DeleteModal from "../components/Modals/DeleteModal";

const initialValue = {};

const DeleteModalContext = createContext(initialValue);

export const useDeleteModalContext = () => useContext(DeleteModalContext);

const DeleteModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [card, setCard] = useState(createNewStateObject());
  const { deleteCard } = useCardsContext();

  const showDeleteModal = (initialCardValue) => {
    setIsOpen(true);
    setCard(initialCardValue);
  };

  const completeDeleteModal = () => {
    setIsOpen(false);
    deleteCard(card._id);
  };

  const value = {
    showDeleteModal,
  };

  return (
    <DeleteModalContext.Provider value={value}>
      {children}
      <DeleteModal
        card={card}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        completeDeleteModal={completeDeleteModal}
      />
    </DeleteModalContext.Provider>
  );
};

// Helper functions
import { generate } from "shortid";
import { useCardsContext } from "./CardsContext";

const createNewStateObject = () => ({
  _id: generate(),
  title: "",
  subheading1: "",
  subheading2: "",
  links: [],
});

export default DeleteModalProvider;
