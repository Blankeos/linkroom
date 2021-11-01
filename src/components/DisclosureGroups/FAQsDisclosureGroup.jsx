import React from "react";
import { Disclosure, Transition } from "@headlessui/react";

// Icons
import {
  BiChevronDown as ChevronDown,
  BiChevronUp as ChevronUp,
} from "react-icons/bi";

export default function FAQsDisclosureGroup() {
  return (
    <div className="w-full px-4">
      <div className="flex flex-col space-y-2 w-full max-w-md p-2 mx-auto bg-white rounded-2xl dark:bg-gray-600">
        <MyDisclosure
          panelContent="You can't fam sorry. At least, not for now. For now you only have 1 room to work with but you can put as many cards and links on it as you like."
          buttonContent="Can I have more than 1 room for my links?"
        />
        <MyDisclosure
          panelContent="For now, the app still works with local storage which means other people can't see your links."
          buttonContent="How do I share my LinkRoom?"
        />
        <MyDisclosure
          panelContent="Since the app uses local storage as the main source of data, we can't do any syncing functionalities yet. You can however 'export' your current LinkRoom and 'import' it on another device."
          buttonContent="How do I sync my LinkRoom on another device?"
        />
      </div>
    </div>
  );
}

function MyDisclosure({ panelContent = "", buttonContent = "" }) {
  return (
    <Disclosure as="div" className="">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-500 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-gray-400">
            <span>{buttonContent}</span>
            {open ? <ChevronUp size="1.1rem" /> : <ChevronDown size="1.1rem" />}
          </Disclosure.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 dark:text-gray-400">
              {panelContent}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
