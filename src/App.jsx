import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Card from "./components/Card";

function App() {
  return (
    <div className="">
      {/* Grid */}
      <div className="grid grid-cols-2 gap-5 p-5">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default App;
