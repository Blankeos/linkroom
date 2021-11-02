import React, { useState } from "react";
import { useCardsContext } from "../contexts/CardsContext";

// Components
import Menu from "../components/Menu";
import EmptyGrid from "../components/EmptyGrid";
import CardsGrid from "../components/Cards/CardsGrid";

// Context
import EditModalProvider from "../contexts/EditModalContext";
import DeleteModalProvider from "../contexts/DeleteModalContext";

// Test
import { testValidate } from "../data/cardsValidate";

const MainApp = () => {
  const { cards, isEditingAllCards } = useCardsContext();

  testValidate();

  return (
    <div className="dark:bg-gray-800 transition flex-grow">
      <Menu />
      <EditModalProvider>
        <DeleteModalProvider>
          {cards && cards.cards && cards.cards.length > 0 ? (
            <CardsGrid
              cards={cards.cards}
              isEditingAllCards={isEditingAllCards}
            />
          ) : (
            <EmptyGrid />
          )}
        </DeleteModalProvider>
      </EditModalProvider>
    </div>
  );
};
export default MainApp;
