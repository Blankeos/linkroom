import React from "react";
import { MdAdd as AddIcon } from "react-icons/md";
import { useEditModalContext } from "../contexts/EditModalContext";

const EmptyGrid = () => {
  const { showEditModal } = useEditModalContext();
  return (
    <div className="flex-grow text-center flex flex-col space-y-1 justify-center items-center text-gray-400 text-sm font-light pb-16">
      <div
        className="w-64 h-64"
        style={{
          backgroundImage: "url('/assets/socket_illustration_0.svg')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <span>
        <b>Socket</b> is cleaning up your empty room.
      </span>
      <span>Create a new card to get started!</span>
      <span>
        <button
          className="mt-10 p-10 rounded-2xl hover:shadow-lg flex items-center justify-center space-x-2 border border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white transition"
          onClick={() => {
            showEditModal();
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
