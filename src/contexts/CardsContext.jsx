import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";

// util
import { cloneDeep } from "lodash";
import { generate } from "shortid";
import { arrayMoveImmutable as arrayMove } from "array-move";

import { isValid } from "../data/cardsValidate";

export const CARDS_STORAGE = "cardsStorage";

const initialValue = {};

const CardsContext = createContext(initialValue);

export const useCardsContext = () => useContext(CardsContext);

const reducer = (state, action) => {
  let newCards;
  let index;

  switch (action.type) {
    case "SET_ALL":
      return action.payload;
    case "SET_ONE_CARD_ALL":
      newCards = [...state.cards];

      index = newCards.findIndex((card) => card._id == action.payload.id);
      if (index !== -1) {
        // Exists
        newCards[index] = action.payload.data;
      } else {
        // Doesn't Exist
        newCards = [...newCards, action.payload.data];
      }

      action.payload.saveToStorageFunction({ cards: newCards });

      return {
        cards: newCards,
      };
    case "SET_ONE_CARD_PROPERTY":
      newCards = [...state.cards];
      newCards[action.payload.id] = {
        ...state.cards[action.payload.id],
        [action.payload.propertyName]: action.payload.data,
      };

      return {
        cards: newCards,
      };
    case "ADD_NEW_CARD":
      newCards = cloneDeep(state.cards);
      newCards = [
        ...newCards,
        {
          _id: generate(),
          title: "",
          subheading1: "",
          subheading2: "",
          links: [],
        },
      ];
      return {
        cards: newCards,
      };
    case "DELETE_CARD":
      newCards = cloneDeep(state.cards);
      newCards.splice(
        newCards.findIndex((card) => card._id === action.payload.id),
        1
      );

      action.payload.saveToStorageFunction({ cards: newCards });
      return {
        cards: newCards,
      };
    case "ADD_NEW_LINK":
      newCards = cloneDeep(state.cards);
      newCards[action.payload.id].links = [
        ...newCards[action.payload.id].links,
        {
          _id: generate(),
          linkName: "",
          icon: "default_link",
          url: "",
        },
      ];

      return {
        cards: newCards,
      };
    case "DELETE_LINK":
      newCards = [...state.cards];
      newCards[action.payload.id].links.splice(action.payload.linkID, 1);

      return {
        cards: newCards,
      };
    case "SET_LINK_PROPERTY":
      newCards = [...state.cards];
      newCards[action.payload.id].links[action.payload.linkID] = {
        ...state.cards[action.payload.id].links[action.payload.linkID],
        [action.payload.linkPropertyName]: action.payload.data,
      };

      return {
        cards: newCards,
      };
    case "REORDER":
      newCards = cloneDeep(state.cards);
      newCards = arrayMove(
        newCards,
        action.payload.oldIndex,
        action.payload.newIndex
      );
      action.payload.saveToStorageFunction({ cards: newCards });
      return { cards: newCards };
    default:
      return state;
  }
};
export const CardsProvider = ({ children }) => {
  const [cards, dispatch] = useReducer(reducer, null);
  const [isEditingAllCards, setIsEditingAllCards] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(CARDS_STORAGE) !== null) {
      //   Found existing cards_storage
      const cardsData = JSON.parse(localStorage.getItem(CARDS_STORAGE));
      dispatch({ type: "SET_ALL", payload: cardsData });
    } else {
      // Make a new cards_storage
      const cardsData = { cards: [] };
      saveToStorage(cardsData);
      dispatch({ type: "SET_ALL", payload: cardsData });
    }
  }, []);

  // Saves when delete reaches 0 (only useful with isEditingAllCards, but disabled that for now)
  // useEffect(() => {
  //   if (cards && cards.cards && cards.cards.length <= 0) {
  //     setIsEditingAllCards(() => {
  //       saveToStorage(cards);
  //       return false;
  //     });
  //   }
  // }, [cards]);

  // Public Functions
  const saveToStorage = (cardsObj) => {
    localStorage.setItem(CARDS_STORAGE, JSON.stringify(cardsObj));
  };

  const importCards = (cardsObj) => {
    if (isValid(cardsObj)) {
      dispatch({ type: "SET_ALL", payload: cardsObj });
      saveToStorage(cardsObj);
    } else {
      console.log("Invalid Import");
    }
  };

  const toggleIsEditingAllCards = () => {
    setIsEditingAllCards((prev) => {
      // If we were currently editing, that means we're going to save since we're done.
      if (prev) {
        saveToStorage(cards);
      }

      return !prev;
    });
  };

  const changeOneCardTitle = (id, propertyName, data) => {
    dispatch({
      type: "SET_ONE_CARD_PROPERTY",
      payload: {
        id: id,
        propertyName: propertyName,
        data: data,
      },
    });
  };

  // Special function that saves, used by EditModalContext
  const changeOneCardAll = (id, data) => {
    dispatch({
      type: "SET_ONE_CARD_ALL",
      payload: {
        id: id,
        data: data,
        saveToStorageFunction: saveToStorage,
      },
    });
  };

  const addNewCard = () => {
    dispatch({
      type: "ADD_NEW_CARD",
    });
  };

  const addNewLinkOneCard = (id) => {
    dispatch({
      type: "ADD_NEW_LINK",
      payload: {
        id: id,
      },
    });
  };

  const deleteLinkOneCard = (id, linkID) => {
    dispatch({
      type: "DELETE_LINK",
      payload: {
        id: id,
        linkID: linkID,
      },
    });
  };

  // Special Function that saves used by EditModalContext
  const deleteCard = (id) => {
    dispatch({
      type: "DELETE_CARD",
      payload: {
        id: id,
        saveToStorageFunction: saveToStorage,
      },
    });
  };

  const changeLinkOneCardProperty = (id, linkID, linkPropertyName, data) => {
    dispatch({
      type: "SET_LINK_PROPERTY",
      payload: {
        id: id,
        linkID: linkID,
        linkPropertyName: linkPropertyName,
        data: data,
      },
    });
  };

  // Special Function that saves used by draggable
  const reorderCard = (oldIndex, newIndex) => {
    dispatch({
      type: "REORDER",
      payload: {
        oldIndex: oldIndex,
        newIndex: newIndex,
        saveToStorageFunction: saveToStorage,
      },
    });
  };

  const value = {
    cards,
    importCards,
    isEditingAllCards,
    toggleIsEditingAllCards,
    changeOneCardTitle,
    changeOneCardAll,
    addNewCard,
    addNewLinkOneCard,
    deleteLinkOneCard,
    changeLinkOneCardProperty,
    deleteCard,
    reorderCard,
  };
  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
};
