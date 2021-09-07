import React from "react";

const SecondaryButton = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`select-none border border-blue-500 bg-white text-blue-500 p-2 px-4 rounded-full ${className} hover:bg-blue-500 transition ease-out hover:text-white`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
