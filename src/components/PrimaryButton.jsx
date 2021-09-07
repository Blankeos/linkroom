import React from "react";

const PrimaryButton = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`select-none border border-blue-500 bg-blue-500 text-white p-2 px-4 rounded-full ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
