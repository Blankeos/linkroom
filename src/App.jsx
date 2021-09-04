import React, { useState } from "react";
import logo from "./logo.svg";
import PrimaryButton from "./components/PrimaryButton";
import SecondaryButton from "./components/SecondaryButton";

import { MdEdit, MdImportExport } from "react-icons/md";

import ImportExportModal from "./components/Modals/ImportExportModal";
import { CardsProvider, useCardsContext } from "./contexts/CardsContext";
import CardsGrid from "./components/Cards/CardsGrid";

function App() {
  return (
    <CardsProvider>
      <div className="">
        <header className="bg-blue-500 h-20 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <p className="text-white font-black tracking-wider text-xl relative">
              Link Room
              <span
                className="absolute text-xs -top-1 -right-9 bg-white rounded-md text-blue-500 px-1 font-semibold select-none"
                style={{ fontSize: "9px" }}
              >
                BETA
              </span>
            </p>
            <p className="text-xs font-light text-blue-100">
              One place for your all your virtual classrooms
            </p>
          </div>
        </header>
        <Menu />

        {/* Grid */}
        <CardsGrid />
      </div>
    </CardsProvider>
  );
}

const Menu = () => {
  const [bool, setBool] = useState(false);

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

        {cards && cards.cards.length > 0 && (
          <PrimaryButton
            onClick={() => toggleIsEditingAllCards()}
            className="flex items-center space-x-1"
          >
            <MdEdit />
            <span className="pr-1">
              {isEditingAllCards ? "Save" : "Edit All"}
            </span>
          </PrimaryButton>
        )}
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

export default App;
