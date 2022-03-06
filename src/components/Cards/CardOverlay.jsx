import React, { forwardRef } from "react";
import { useCardsContext } from "../../contexts/CardsContext";

import { CardElement } from "./Card";
import { EditableCardElement } from "./EditableCard";

const CardOverlay = forwardRef(({ id, cards, isDropped, ...props }, ref) => {
  const findCard = (id) => {
    return cards[cards.findIndex((c) => c._id === id)];
  };
  const currentCard = findCard(id);

  const { isEditingAllCards } = useCardsContext();

  return (
    <div
      className={`h-full w-full fixed cursor-grabbing`}
      style={{ minHeight: "18rem" }}
      {...props}
      ref={ref}
    >
      {isEditingAllCards ? (
        <>
          <EditableCardElement card={currentCard} overlay />
        </>
      ) : (
        <CardElement card={currentCard} disabled={true} />
      )}
    </div>
  );
});

export default CardOverlay;
