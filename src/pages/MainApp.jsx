import React, { useState } from "react";
import { useCardsContext } from "../contexts/CardsContext";

// Components
import Menu from "../components/Menu";
import EmptyGrid from "../components/EmptyGrid";
import CardsGrid from "../components/Cards/CardsGrid";
import EditModal from "../components/Modals/EditModal";
import EditModalProvider from "../contexts/EditModalContext";

const MainApp = () => {
  const { cards, isEditingAllCards } = useCardsContext();
  const [show, setShow] = useState(false);
  return (
    <>
      <Menu />
      <EditModalProvider>
        {cards && cards.cards && cards.cards.length > 0 ? (
          <CardsGrid
            cards={cards.cards}
            isEditingAllCards={isEditingAllCards}
          />
        ) : (
          <EmptyGrid />
        )}
      </EditModalProvider>
    </>
  );
};
export default MainApp;
