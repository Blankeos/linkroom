import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useCardsContext } from "../../contexts/CardsContext";

import { GiBroom } from "react-icons/gi";
import EditableCard from "./EditableCard";

const CardsGrid = () => {
  const { cards, importCards } = useCardsContext();

  const [editing, setEditing] = useState(false);

  const renderGrid = (cards) => {
    if (cards) {
      return (
        <div
          className="grid justify-center gap-5 p-5"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(24rem, max-content))",
          }}
        >
          {cards.map((card, i) => {
            if (editing) {
              return (
                <EditableCard
                  key={i}
                  title={card.title}
                  subheading1={card.subheading1}
                  subheading2={card.subheading2}
                  links={card.links}
                />
              );
            } else {
              return (
                <Card
                  key={i}
                  title={card.title}
                  subheading1={card.subheading1}
                  subheading2={card.subheading2}
                  links={card.links}
                />
              );
            }
          })}
        </div>
      );
    } else {
      return (
        <div className="py-40 text-center flex flex-col space-y-1 justify-center items-center text-gray-400 text-sm font-light">
          <GiBroom className="text-3xl text-gray-400" />
          <span>No cards yet.</span>
          <span>Create a new one to get started!</span>
        </div>
      );
    }
  };

  return (
    <>
      {cards && (
        <>
          {renderGrid(cards.cards)}{" "}
          <button
            onClick={() => {
              setEditing((prev) => !prev);
            }}
          >
            SetEditing
          </button>
        </>
      )}
    </>
  );
};

export default CardsGrid;
