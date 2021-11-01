import React, { useEffect, useState } from "react";

// Components
import SecondaryButton from "./SecondaryButton";
import ImportExportModal from "./Modals/ImportExportModal";

// Icons
import { MdImportExport } from "react-icons/md";
import DarkModeSwitch from "./Switches/DarkModeSwitch";

const Menu = () => {
  const [bool, setBool] = useState(false);

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
        <DarkModeSwitch />
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
