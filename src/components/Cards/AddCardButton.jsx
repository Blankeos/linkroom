import React from "react";
import { MdAdd as AddIcon } from "react-icons/md";
import { useCardsContext } from "../../contexts/CardsContext";
import { useEditModalContext } from "../../contexts/EditModalContext";

const AddCardButton = () => {
  // const { addNewCard } = useCardsContext(); // only useful when isEditingAllCards
  const { showEditModal } = useEditModalContext();

  return (
    <button
      onClick={() => showEditModal()}
      className="group rounded-2xl hover:shadow-lg transition w-full sm:w-96 inline-block border  border-blue-500 hover:bg-blue-500 text-blue-500"
      style={{ minHeight: "18rem" }}
    >
      <div className="w-full h-full flex justify-center items-center">
        <span className="group-hover:border-white transition p-3 border border-blue-500 rounded-full">
          <AddIcon
            className="group-hover:text-white transition"
            size="1.5rem"
          />
        </span>
      </div>
    </button>
  );
};

export default AddCardButton;
