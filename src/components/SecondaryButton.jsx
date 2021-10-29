import React from "react";

const SecondaryButton = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`select-none border dark:border-gray-200 dark:text-gray-200 dark:hover:bg-gray-400 dark:hover:text-gray-900 border-blue-500 text-blue-500 p-2 px-4 rounded-md ${className} hover:bg-blue-500 transition ease-out hover:text-white`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
