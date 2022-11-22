import React, { useState } from "react";
import { AiFillWarning as WarningIcon } from "react-icons/ai";
import { IoClose as CloseIcon } from "react-icons/io5";

const TerminationNotice = () => {
  console.log(window.location.origin);
  if (window.location.origin === "https://linkroom.vercel.live") return <></>;

  const [isShown, setIsShown] = useState(true);
  return (
    <>
      {isShown && (
        <div
          className="fixed bg-yellow-400 text-gray-800 z-50 py-3 w-full grid place-items-center text-sm shadow-xl"
          style={{
            zIndex: 100,
          }}
        >
          <button
            className="absolute top-0 right-0 p-2"
            onClick={() => setIsShown(false)}
          >
            <CloseIcon size="1.2rem" className="hover:text-red-500" />
          </button>
          <span className="flex gap-x-2 items-center">
            <WarningIcon size="1.1rem" />
            <span>
              <a className="font-semibold text-base">linkroom.live</a> is
              expiring!
            </span>
            <WarningIcon size="1.1rem" />
          </span>
          <span className="px-8 text-center">
            Export your cards from here and imports your cards to{" "}
            <a className="font-semibold" href="https://linkroom.vercel.app/">
              linkroom.vercel.app
            </a>{" "}
            for now!
          </span>
        </div>
      )}
    </>
  );
};

export default TerminationNotice;
