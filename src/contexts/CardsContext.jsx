import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";

export const CARDS_STORAGE = "cardsStorage";

const initialValue = {};

const CardsContext = createContext(initialValue);

export const useCardsContext = () => useContext(CardsContext);

const reducer = (state, action) => {
  let newCards;

  switch (action.type) {
    case "SET_ALL":
      return action.payload;
    case "SET_ONE_CARD_ALL":
      newCards = [...state.cards];
      newCards[action.payload.id] = action.payload.data;

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
      newCards = [...state.cards];
      newCards = [
        ...state.cards,
        {
          title: "",
          subheading1: "",
          subheading2: "",
          links: [],
        },
      ];
      return {
        cards: newCards,
      };
    case "ADD_NEW_LINK":
      newCards = [...state.cards];
      newCards[action.payload.id].links = [
        ...state.cards[action.payload.id].links,
        {
          linkName: "",
          icon: "default_link",
          url: "",
        },
      ];

      console.log("ADD_NEW_LINK is dispatched");

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

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  // Public Functions
  const saveToStorage = (cardsObj) => {
    localStorage.setItem(CARDS_STORAGE, JSON.stringify(cardsObj));
  };

  const importCards = (cardsObj) => {
    dispatch({ type: "SET_ALL", payload: cardsObj });
    saveToStorage(cardsObj);
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

  const value = {
    cards,
    importCards,
    isEditingAllCards,
    toggleIsEditingAllCards,
    changeOneCardTitle,
    addNewCard,
    addNewLinkOneCard,
    deleteLinkOneCard,
    changeLinkOneCardProperty,
  };
  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
};
