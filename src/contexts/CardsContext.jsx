import React, { useState, useEffect, useContext, createContext } from "react";

export const CARDS_STORAGE = "cardsStorage";

const initialValue = {};

const CardsContext = createContext(initialValue);

export const useCardsContext = () => useContext(CardsContext);

export const CardsProvider = ({ children }) => {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    if (localStorage.getItem(CARDS_STORAGE) !== null) {
      //   Found existing cards_storage
      const cardsData = JSON.parse(localStorage.getItem(CARDS_STORAGE));
      setCards(cardsData);
    } else {
      // Make a new cards_storage
      const cardsData = {};
      saveToStorage(cardsData);
      setCards(cardsData);
    }
  }, []);

  const saveToStorage = (cardsObj) => {
    localStorage.setItem(CARDS_STORAGE, JSON.stringify(cardsObj));
  };

  const importCards = (cardsObj) => {
    setCards(cardsObj);
    saveToStorage(cardsObj);
  };

  const value = { cards, importCards };
  return (
    <CardsContext.Provider value={value}>{children}</CardsContext.Provider>
  );
};
