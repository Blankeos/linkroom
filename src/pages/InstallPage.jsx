import React, { useState, useEffect } from "react";
import { osName } from "react-device-detect";
import InstallModal from "../components/Modals/InstallModal";

import { toast } from "react-toastify";

// Icons
import { FiDownload } from "react-icons/fi";
import { BsExclamationTriangleFill } from "react-icons/bs";
import PrimaryButton from "../components/PrimaryButton";

// Router
import { Link, useHistory } from "react-router-dom";

// Use-PWA
import usePwa from "use-pwa";

// Media Queries
import { useMediaQuery } from "react-responsive";

const InstallPage = () => {
  const isStandalone = useMediaQuery({ query: "(display-mode: standalone)" });

  useEffect(() => {
    console.log("Standalone:", isStandalone);
  }, [isStandalone]);

  return (
    <div className="p-5 bg-blue-500 dark:bg-gray-900 flex-grow flex flex-col items-center justify-center space-y-7 pt-12 pb-0">
      <h1 className="font-extrabold text-4xl md:text-5xl tracking-tighter text-white max-w-sm text-center">
        ALL YOUR LINKS IN ONE PLACE
      </h1>
      <p className="font-extralight text-sm max-w-md text-white text-center dark:text-gray-300">
        A single hub for all the places on the internet you need to go to is
        here! Links are portals to different parts of the internet. We know it's
        hard to keep track of them so we're here to provide your links the space
        they need.
      </p>
      <div className="flex flex-wrap text-center justify-center">
        <InstallButton />
        <Link
          to="/"
          className="bg-gray-900 dark:bg-gray-500 dark:hover:bg-gray-600 select-none text-white p-3 px-6 rounded-full my-1 mx-1 transition shadow hover:shadow-lg hover:bg-gray-800"
        >
          {`Proceed ${isStandalone ? "to app" : "with your browser"}`}
        </Link>
      </div>
      <img className="w-72 h-72" src="/assets/socket_illustration_1.svg" />
    </div>
  );
};

const InstallButton = () => {
  const history = useHistory();

  const { isLoading, canInstallprompt, appinstalled, showInstallPrompt } =
    usePwa();

  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(async () => {
    // Check if App is already installed
    const listOfInstalledApps = await navigator.getInstalledRelatedApps();
    if (listOfInstalledApps && listOfInstalledRelatedApps.length > 0) {
      setIsInstalled(true);
    }
  }, []);

  useEffect(() => {
    if (appinstalled) {
      toast("✅ Installed! Going to app...");
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, [appinstalled]);

  function renderButtonContent() {
    if (isLoading) {
      return "Checking if compatible";
    }
    if (isInstalled || appinstalled) {
      return "App already installed";
    }

    if (!canInstallprompt) {
      return (
        <>
          <BsExclamationTriangleFill size="1.2rem" />
          <span>Can't Install / Already Installed</span>
        </>
      );
    }

    return (
      <>
        <FiDownload />
        <span>Download for {osName}</span>
      </>
    );
  }

  return (
    <button
      onClick={() => {
        if (canInstallprompt) {
          showInstallPrompt();
        }
      }}
      disabled={isLoading || !canInstallprompt || isInstalled}
      className="flex items-center space-x-2 bg-white select-none text-gray-700 p-3 px-6 rounded-full my-1 mx-1 disabled:opacity-50"
    >
      {renderButtonContent()}
    </button>
  );
};

export default InstallPage;
