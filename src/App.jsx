import React, { useState } from "react";
import logo from "./logo.svg";
import Card from "./components/Card";
import PrimaryButton from "./components/PrimaryButton";
import SecondaryButton from "./components/SecondaryButton";

import { MdEdit, MdImportExport } from "react-icons/md";
import {
  SiGoogleclassroom,
  SiFacebook,
  SiGooglehangoutsmeet,
} from "react-icons/si";

function App() {
  return (
    <div className="">
      <header className="bg-blue-500 h-20 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <p className="text-white font-black tracking-wider text-xl">
            Link Room
          </p>
          <p className="text-xs font-light text-blue-100">
            One place for your all your virtual classrooms
          </p>
        </div>
      </header>
      {/* Grid */}
      {/* <div className="grid 2xl:grid-cols-5 grid-cols-2 gap-5 p-5"> */}
      <div
        className="grid justify-center gap-5 p-5"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(24rem, max-content))",
        }}
      >
        <Card
          title={"CCS 248"}
          subheading1={"Artificial Neural Networks"}
          subheading2={"Bobby Gerardo"}
          links={[
            {
              linkName: "Google Classroom",
              icon: <SiGoogleclassroom />,
              url: "/gcr",
            },
            { linkName: "Facebook", icon: <SiFacebook />, url: "/Fb" },
            {
              linkName: "Google Meet",
              icon: <SiGooglehangoutsmeet />,
              url: "/gm",
            },
          ]}
        />
        <Card
          title={"CCS 248"}
          subheading1={"Artificial Neural Networks"}
          subheading2={"Bobby Gerardo"}
          links={[
            {
              linkName: "Google Classroom",
              icon: <SiGoogleclassroom />,
              url: "/gcr",
            },
            { linkName: "Facebook", icon: <SiFacebook />, url: "/Fb" },
            {
              linkName: "Google Meet",
              icon: <SiGooglehangoutsmeet />,
              url: "/gm",
            },
          ]}
        />
        <Card
          title={"CCS 248"}
          subheading1={"Artificial Neural Networks"}
          subheading2={"Bobby Gerardo"}
          links={[
            {
              linkName: "Google Classroom",
              icon: <SiGoogleclassroom />,
              url: "/gcr",
            },
            { linkName: "Facebook", icon: <SiFacebook />, url: "/Fb" },
            {
              linkName: "Google Meet",
              icon: <SiGooglehangoutsmeet />,
              url: "/gm",
            },
          ]}
        />
      </div>
      {/* </div> */}

      <div className="p-5 flex space-x-3">
        <SecondaryButton className="flex items-center space-x-1">
          <MdImportExport size="1.2rem" />
          <span className="pr-1">Import/Export</span>
        </SecondaryButton>

        <PrimaryButton className="flex items-center space-x-1">
          <MdEdit />
          <span className="pr-1">Edit</span>
        </PrimaryButton>
      </div>
    </div>
  );
}

export default App;
