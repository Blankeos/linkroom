import React, { useState } from "react";
import { useCardsContext } from "../contexts/CardsContext";

// Components
import Menu from "../components/Menu";
import EmptyGrid from "../components/EmptyGrid";
import CardsGrid from "../components/Cards/CardsGrid";
import EditModal from "../components/Modals/EditModal";

const MainApp = () => {
  const { cards, isEditingAllCards } = useCardsContext();
  const [show, setShow] = useState(false);
  return (
    <>
      <Menu />
      {cards && cards.cards && cards.cards.length > 0 ? (
        <CardsGrid cards={cards.cards} isEditingAllCards={isEditingAllCards} />
      ) : (
        <EmptyGrid />
      )}
      <button onClick={() => setShow(true)}>Show Modal</button>
      <EditModal isOpen={show} closeModal={() => setShow(false)} />
    </>
  );
};
export default MainApp;
