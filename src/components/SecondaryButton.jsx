import React from "react";

const PrimaryButton = ({ children, className }) => {
  return (
    <button
      className={`border border-blue-500 bg-white text-blue-500 p-2 px-4 rounded-full ${className} hover:bg-blue-500 transition ease-out hover:text-white`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
