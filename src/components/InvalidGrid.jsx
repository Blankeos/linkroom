// This component is shown when cards data is invalid.
import React from "react";
import cardsValidate from "../data/cardsValidate";

// Contexts
import { useCardsContext } from "../contexts/CardsContext";

// Components
import { Disclosure, Transition } from "@headlessui/react";

// Icons
import {
  BiChevronDown as ChevronDown,
  BiChevronUp as ChevronUp,
} from "react-icons/bi";

const InvalidGrid = () => {
  const { importCards } = useCardsContext();
  return (
    <div className="flex-grow text-center flex flex-col space-y-3 justify-center items-center text-sm font-light pb-16">
      <h2 className="tracking-tighter font-extrabold text-4xl text-gray-800 dark:text-gray-100">
        Uh Oh!
      </h2>
      <p className="text-gray-600 max-w-md dark:text-gray-400">
        LinkRoom{" "}
        <b className="font-medium">can't read your current cards data</b>. Your
        data might be outdated because of a recent update on LinkRoom's schema.
        Here are the errors we found:
      </p>
      <div className="max-w-5xl w-full px-10">
        <div className="w-full bg-blue-50 rounded-lg p-2 dark:bg-gray-700">
          <Disclosure as="div" className="">
            {({ open }) => (
              <>
                <Disclosure.Button className="shadow flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-500 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-gray-400">
                  <span>Show Errors</span>
                  {open ? (
                    <ChevronUp size="1.1rem" />
                  ) : (
                    <ChevronDown size="1.1rem" />
                  )}
                </Disclosure.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Disclosure.Panel className="px-4 py-3 pt-4 text-sm text-gray-500 dark:text-gray-400 flex flex-col space-y-3">
                    {cardsValidate.errors.map((error, i) => (
                      <ErrorItem key={i} error={error} />
                    ))}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        </div>
      </div>
      <h2 className="tracking-tighter font-extrabold text-3xl text-gray-800 dark:text-gray-100 pt-8">
        What you can do
      </h2>
      <p className="text-gray-600 max-w-md dark:text-gray-400">
        Try fixing the problem with either of these solutions:
      </p>
      <div className="max-w-5xl w-full px-10 grid grid-cols-2 gap-4">
        <div className="w-full bg-blue-500 shadow-md rounded-2xl overflow-hidden flex flex-col">
          <div className="p-5 pt-8 flex flex-col items-center space-y-2 flex-grow">
            <h3 className="font-semibold text-xl text-white">
              Delete All Cards
            </h3>
            <p className="text-gray-200 max-w-xs">
              Clear all data in cardsStorage and start fresh! You have to make
              your cards all over again though.
            </p>
          </div>
          <button
            className="w-full p-5 bg-gray-800 text-white hover:bg-gray-900 dark:bg-gray-900 dark:hover:bg-black dark:text-gray-200 transition"
            onClick={() => importCards({ cards: [] })}
          >
            Sure, clear my cards
          </button>
        </div>
        <div className="w-full bg-white border shadow-md rounded-2xl overflow-hidden dark:bg-gray-800 dark:border-gray-900 transition">
          <div className="p-5 py-8 flex flex-col items-center space-y-2">
            <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-100">
              Import with Proper Format
            </h3>
            <p className="text-gray-700 max-w-xs dark:text-gray-400">
              Click on <b className="font-medium">Import/Export</b> button and
              edit the JSON text that follows the proper Cards Schema.
            </p>
            <p className="text-blue-400 pt-5">Cards Schema</p>
            <p className="text-blue-400">Example Proper JSON format</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function ErrorItem({ error }) {
  return (
    <div className="text-left">
      <p>
        <span className="font-medium">{error.instancePath}</span>
        <span> </span>
        <span>{error.message}</span>
      </p>
    </div>
  );
}
export default InvalidGrid;
