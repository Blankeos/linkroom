import React from "react";
import "./styles/App.css";

import { CardsProvider } from "./contexts/CardsContext";
import { DarkThemeProvider } from "./contexts/DarkThemeContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import MainApp from "./pages/MainApp";
import InstallPage from "./pages/InstallPage";
import AboutPage from "./pages/AboutPage";
import Page404 from "./pages/Page404";

// Components
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TerminationNotice from "./components/TerminationNotice";
// import FeedbackPage from "./pages/FeedbackPage";

function App() {
  return (
    <CardsProvider>
      <DarkThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <TerminationNotice />
            <Header />
            <Main>
              <Switch>
                <Route exact path="/" component={MainApp} />
                <Route exact path="/install" component={InstallPage} />
                <Route exact path="/about" component={AboutPage} />
                <Route path="/" component={Page404} />
              </Switch>
            </Main>
            <Footer />
            <ToastContainer />
          </div>
        </Router>
      </DarkThemeProvider>
    </CardsProvider>
  );
}

export default App;
