import React from "react";
import "./styles/App.css";

import { CardsProvider, useCardsContext } from "./contexts/CardsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

// Pages
import MainApp from "./pages/MainApp";
import InstallPage from "./pages/InstallPage";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <CardsProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Main>
            <Switch>
              <Route exact path="/" component={MainApp} />
              <Route exact path="/install" component={InstallPage} />
            </Switch>
          </Main>
          <Footer />
          <ToastContainer />
        </div>
      </Router>
    </CardsProvider>
  );
}

export default App;
