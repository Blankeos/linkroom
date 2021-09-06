import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useCardsContext } from "../../contexts/CardsContext";

import { GiBroom } from "react-icons/gi";
import { MdAdd as AddIcon } from "react-icons/md";

import EditableCard from "./EditableCard";
import AddCardButton from "./AddCardButton";

const CardsGrid = () => {
  const { cards, isEditingAllCards, addNewCard, toggleIsEditingAllCards } =
    useCardsContext();

  const renderEditableCards = (cards) => {
    const editableCards = cards.map((card, i) => {
      return (
        <EditableCard
          key={card._id}
          index={i}
          title={card.title}
          subheading1={card.subheading1}
          subheading2={card.subheading2}
          links={card.links}
        />
      );
    });

    return [editableCards, <AddCardButton key={-1} />];
  };

  const renderCards = (cards) => {
    return cards.map((card, i) => {
      return (
        <Card
          key={card._id}
          title={card.title}
          subheading1={card.subheading1}
          subheading2={card.subheading2}
          links={card.links}
        />
      );
    });
  };
  const renderGrid = (cards) => {
    if (cards != null && cards.length > 0) {
      return (
        <div className="grid sm:justify-center gap-5 p-5 grid-cols-1 cards-grid">
          {isEditingAllCards ? renderEditableCards(cards) : renderCards(cards)}
        </div>
      );
    } else {
      return (
        <div className="py-40 text-center flex flex-col space-y-1 justify-center items-center text-gray-400 text-sm font-light">
          <GiBroom className="text-3xl text-gray-400" />
          <span>No cards yet.</span>
          <span>Create a new one to get started!</span>
          <span>
            <button
              className="mt-10 p-10 rounded-2xl hover:shadow-lg flex items-center justify-center space-x-2 border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white transition"
              onClick={() => {
                addNewCard();
                toggleIsEditingAllCards();
              }}
            >
              <AddIcon size="1.2rem" />
              <span>Create My First Card</span>
            </button>
          </span>
        </div>
      );
    }
  };

  return <>{cards && <>{renderGrid(cards.cards)}</>}</>;
};

export default CardsGrid;
