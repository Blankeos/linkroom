import React from "react";
import "./styles/App.css";

import { CardsProvider, useCardsContext } from "./contexts/CardsContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import MainApp from "./pages/MainApp";
import InstallPage from "./pages/InstallPage";
import AboutPage from "./pages/AboutPage";

// Components
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";



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
              <Route exact path="/about" component={AboutPage} />
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
