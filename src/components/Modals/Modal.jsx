import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

export default function Modal({ isOpen, closeModal, children, closeMessage }) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center bg-blue-400 bg-opacity-70">
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

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div>{children}</div>
                {closeMessage && (
                  <div className="mt-4">
                    <button
                      type="button"
                      className="select-none inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      {closeMessage}
                    </button>
                  </div>
                )}
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
