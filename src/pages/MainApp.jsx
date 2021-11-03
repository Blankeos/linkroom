import React, { useState } from "react";
import { useCardsContext } from "../contexts/CardsContext";

// Components
import Menu from "../components/Menu";
import EmptyGrid from "../components/EmptyGrid";
import CardsGrid from "../components/Cards/CardsGrid";
import InvalidGrid from "../components/InvalidGrid";

// Context
import EditModalProvider from "../contexts/EditModalContext";
import DeleteModalProvider from "../contexts/DeleteModalContext";

// Test
import cardsValidate from "../data/cardsValidate";

function isValid(cards) {
  const isValid = cardsValidate(cards);
  return isValid;
}

const MainApp = () => {
  const { cards, isEditingAllCards } = useCardsContext();

  return (
    <div className="dark:bg-gray-800 transition flex-grow">
      <Menu />
      <EditModalProvider>
        <DeleteModalProvider>
          {isValid(cards) ? (
            cards.cards.length > 0 ? (
              <CardsGrid
                cards={cards.cards}
                isEditingAllCards={isEditingAllCards}
              />
            ) : (
              <EmptyGrid />
            )
          ) : (
            <InvalidGrid />
          )}
        </DeleteModalProvider>
      </EditModalProvider>
    </div>
  );
};
export default MainApp;
