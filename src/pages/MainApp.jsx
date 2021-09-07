import React from "react";
import Menu from "../components/Menu";
import EmptyGrid from "../components/EmptyGrid";
import { useCardsContext } from "../contexts/CardsContext";
import CardsGrid from "../components/Cards/CardsGrid";

const MainApp = () => {
  const { cards, isEditingAllCards } = useCardsContext();

  return (
    <>
      <Menu />
      {cards && cards.cards && cards.cards.length > 0 ? (
        <CardsGrid cards={cards.cards} isEditingAllCards={isEditingAllCards} />
      ) : (
        <EmptyGrid />
      )}
      {/* {JSON.stringify(cards.cards)} */}
    </>
  );
};
export default MainApp;
