import React, { useEffect, useState } from "react";
import { useCardsContext } from "../contexts/CardsContext";

// Components
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import ImportExportModal from "./Modals/ImportExportModal";

// Icons
import { MdImportExport } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { GoCheck } from "react-icons/go";

const Menu = () => {
  const [bool, setBool] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  const { toggleIsEditingAllCards, isEditingAllCards, cards } =
    useCardsContext();
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
        <SecondaryButton onClick={() => setIsDarkMode((prev) => !prev)}>
          {isDarkMode ? "Disable Dark" : "Enable Dark"}
        </SecondaryButton>

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
