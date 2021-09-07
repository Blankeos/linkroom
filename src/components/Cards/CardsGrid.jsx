import React from "react";
import Card from "./Card";
import { useCardsContext } from "../../contexts/CardsContext";

import EditableCard from "./EditableCard";
import AddCardButton from "./AddCardButton";

import { SortableContainer, SortableElement } from "react-sortable-hoc";

const renderEditableCards = (cards) => {
  const allCards = cards.map((card, index) => (
    <EditableSortableItem key={card._id} index={index} card={card} i={index} />
  ));

  return [...allCards, <AddCardSortableItem key="add-card" disabled />];
};
// --SORTABLE HOC Setup--
const SortableList = SortableContainer(({ cards, isEditingAllCards }) => {
  return (
    <ul className="grid sm:justify-center gap-5 p-5 grid-cols-1 cards-grid">
      {isEditingAllCards
        ? renderEditableCards(cards)
        : cards.map((card, index) => (
            <SortableItem key={card._id} index={index} card={card} />
          ))}
    </ul>
  );
});

const EditableSortableItem = SortableElement(({ card, i }) => (
  <li className="list-none" style={{ minHeight: "18rem" }}>
    <EditableCard
      index={i}
      title={card.title}
      subheading1={card.subheading1}
      subheading2={card.subheading2}
      links={card.links}
    />
  </li>
));

const AddCardSortableItem = SortableElement(({}) => (
  <li className="list-none" style={{ minHeight: "18rem" }}>
    <AddCardButton />
  </li>
));

const SortableItem = SortableElement(({ card }) => (
  <li className="list-none" style={{ minHeight: "18rem" }}>
    <Card
      title={card.title}
      subheading1={card.subheading1}
      subheading2={card.subheading2}
      links={card.links}
    />
  </li>
));
// --SORTABLE HOC Setup--

const CardsGrid = ({ cards, isEditingAllCards }) => {
  const { reorderCard } = useCardsContext();

  const onSortEnd = ({ oldIndex, newIndex }) => {
    reorderCard(oldIndex, newIndex);
  };

  return (
    <>
      <SortableList
        distance={1}
        cards={cards}
        isEditingAllCards={isEditingAllCards}
        onSortStart={() => {
          if (window.getSelection) {
            window.getSelection().removeAllRanges();
          } else if (document.selection) {
            document.selection.empty();
          }
        }}
        onSortEnd={onSortEnd}
        axis="xy"
        helperClass="opacity-90"
        pressThreshold={100}
      />
    </>
  );
};

export default CardsGrid;
