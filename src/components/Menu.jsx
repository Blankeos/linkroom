import React, { useEffect, useState } from "react";
import { useCardsContext } from "../contexts/CardsContext";

// Components
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import ImportExportModal from "./Modals/ImportExportModal";
import { Switch } from "@headlessui/react";

// Icons
import { MdImportExport } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { GoCheck } from "react-icons/go";
import { useDarkThemeContext } from "../contexts/DarkThemeContext";

const Menu = () => {
  const [bool, setBool] = useState(false);
  const { isDark, setIsDark } = useDarkThemeContext();

  return (
    <>
      <div className="p-5 flex space-x-3 justify-center">
        <SecondaryButton
          onClick={() => setBool(true)}
          className="flex items-center space-x-1"
        >
          <MdImportExport size="1.2rem" />
          <span className="pr-1">Import/Export</span>
        </SecondaryButton>
        {/* <SecondaryButton onClick={() => setIsDarkMode((prev) => !prev)}>
          {isDarkMode ? "Disable Dark" : "Enable Dark"}
        </SecondaryButton> */}
        <Switch
          checked={isDark}
          onChange={setIsDark}
          className={`${
            isDark
              ? "bg-gray-700 border-gray-900"
              : "bg-blue-400 border-blue-500"
          }
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${
              isDark ? "translate-x-9 bg-yellow-200" : "translate-x-0 bg-white"
            }
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
        {/* {cards && cards.cards.length > 0 && (
          <PrimaryButton
          onClick={() => toggleIsEditingAllCards()}
          className="flex items-center space-x-1"
          >
            {isEditingAllCards ? <GoCheck /> : <MdEdit />}
            <span className="pr-1">
              {isEditingAllCards ? "Save" : "Edit All"}
            </span>
          </PrimaryButton>
        )} */}
      </div>

      <ImportExportModal
        isOpen={bool}
        closeModal={() => {
          setBool(false);
        }}
      />
    </>
  );
};

export default Menu;
