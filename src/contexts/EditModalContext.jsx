import React, { useState, useContext, createContext, useReducer } from "react";
import EditModal from "../components/Modals/EditModal";

const initialValue = {};

const EditModalContext = createContext(initialValue);

export const useEditModalContext = () => useContext(EditModalContext);

const EditModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [card, dispatch] = useReducer(reducer, createNewStateObject());

  const { changeOneCardAll } = useCardsContext();

  const showEditModal = (initialCardValue) => {
    setIsOpen(true);

    if (initialCardValue) {
      dispatch({
        type: "SET_ALL",
        payload: {
          state: initialCardValue,
        },
      });
    } else {
      dispatch({
        type: "SET_ALL",
        payload: {
          state: createNewStateObject(),
        },
      });
    }
  };

  const completeEditModal = () => {
    setIsOpen(false);
    changeOneCardAll(card._id, card);
  };

  const value = {
    showEditModal,
  };

  return (
    <EditModalContext.Provider value={value}>
      {children}
      <EditModal
        isOpen={isOpen}
        card={card}
        closeModal={() => setIsOpen(false)}
        dispatch={dispatch}
        completeEditModal={completeEditModal}
      />
    </EditModalContext.Provider>
  );
};

// State
import { generate } from "shortid";
import { cloneDeep } from "lodash";
import { useCardsContext } from "./CardsContext";

const createNewStateObject = () => ({
  _id: generate(),
  title: "",
  subheading1: "",
  subheading2: "",
  links: [],
});

const createNewLinkObject = () => ({
  _id: generate(),
  linkName: "",
  url: "",
  icon: "default_link",
});

const reducer = (state, action) => {
  let linksClone;
  switch (action.type) {
    case "SET_ALL":
      return action.payload.state;
    case "SET_PROPERTY":
      return {
        ...state,
        [action.payload.propertyName]: action.payload.value,
      };
    case "SET_LINK_PROPERTY":
      linksClone = cloneDeep(state.links);
      linksClone[
        linksClone.findIndex((link) => action.payload.linkID === link._id)
      ][action.payload.linkPropertyName] = action.payload.value;

      return {
        ...state,
        links: linksClone,
      };
    case "NEW_LINK":
      linksClone = cloneDeep(state.links);
      linksClone = [...linksClone, createNewLinkObject()];
      return {
        ...state,
        links: linksClone,
      };
    case "DELETE_LINK":
      linksClone = cloneDeep(state.links);
      linksClone = linksClone.filter((link) => link._id !== action.payload.id);
      return {
        ...state,
        links: linksClone,
      };
    default:
      return state;
  }
};

export default EditModalProvider;
