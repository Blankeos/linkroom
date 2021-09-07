import React from "react";
import { GiBroom } from "react-icons/gi";
import { MdAdd as AddIcon } from "react-icons/md";
import { useCardsContext } from "../contexts/CardsContext";

const EmptyGrid = () => {
  const { addNewCard, toggleIsEditingAllCards } = useCardsContext();
  return (
    <div className="flex-grow text-center flex flex-col space-y-1 justify-center items-center text-gray-400 text-sm font-light">
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
};

export default EmptyGrid;
