import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

// Make sure modalClass is for size
export default function SlideOver({
  isOpen,
  closeModal,
  children,
  closeMessage,
  slideOverClass,
}) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex justify-end h-full min-h-screen text-right bg-blue-400 bg-opacity-60 dark:bg-gray-700 dark:bg-opacity-60 backdrop-filter backdrop-blur-sm overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-x-5"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 translate-x-5"
            >
              <div
                className={`transform translate-x-0 bg-white transition-all h-full py-10 overflow-hidden shadow-xl overflow-y-auto ${slideOverClass}`}
              >
                <div>{children}</div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

// import React, { Fragment } from "react";
// import { Transition } from "@headlessui/react";
// import { useRef } from "react";

// const Modal = ({ active }) => {
//   const modalNode = useRef();
//   return (
//     <Transition
//       show={active}
//       as={Fragment}
//       enter="transition ease-out duration-100"
//       enterFrom="transform opacity-0 scale-95"
//       enterTo="transform opacity-100 scale-100"
//       leave="transition ease-in duration-75"
//       leaveFrom="transform opacity-100 scale-100"
//       leaveTo="transform opacity-0 scale-95"
//     >
//       <div
//         static
//         className="w-full origin-top-right fixed inset-0  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto"
//         style={{ maxHeight: "25rem" }}
//       >
//         <div ref={modalNode} className="py-1">
//           Modal Content Here
//         </div>
//       </div>
//     </Transition>
//   );
// };

// export default Modal;
