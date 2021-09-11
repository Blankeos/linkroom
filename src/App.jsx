import React from "react";
import "./styles/App.css";

import { CardsProvider, useCardsContext } from "./contexts/CardsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import MainApp from "./pages/MainApp";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <CardsProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Main>
          <Router>
            <Switch>
              <Route exact path="/" component={MainApp} />
            </Switch>
          </Router>
        </Main>
        <Footer />
        <ToastContainer />
      </div>
    </CardsProvider>
  );
}

export default App;
