import React, { useState } from "react";
import logo from "./logo.svg";
import PrimaryButton from "./components/PrimaryButton";
import SecondaryButton from "./components/SecondaryButton";

import { GoCheck } from "react-icons/go";
import { MdEdit, MdImportExport } from "react-icons/md";

import ImportExportModal from "./components/Modals/ImportExportModal";
import { CardsProvider, useCardsContext } from "./contexts/CardsContext";
import CardsGrid from "./components/Cards/CardsGrid";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import MainApp from "./pages/MainApp";

function App() {
  return (
    <CardsProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Main>
          <MainApp />
        </Main>
        <Footer />
        <ToastContainer />
      </div>
    </CardsProvider>
  );
}

export default App;
