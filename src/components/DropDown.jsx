/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

const DropDown = ({ className = "", children, items, disabled = false }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button
              disabled={disabled}
              className={`focus:outline-none ${
                disabled && "pointer-events-none"
              } ${className}`}
            >
              {children}
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1 flex flex-col ">
                {items.map((item, i) => (
                  <MenuItem
                    key={i}
                    onClick={item.onClick || null}
                    icon={item.icon || null}
                    href={item.href || null}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default DropDown;

const MenuItem = ({ children, onClick, icon, href }) => {
  return (
    <Menu.Item>
      {({ active }) => {
        if (href) {
          return (
            <a
              href={href || "/404"}
              className={`${
                active && "bg-blue-100 dark:bg-gray-800"
              } text-left w-full px-3 py-1 text-gray-500 dark:text-gray-300 whitespace-nowrap flex items-center`}
            >
              {icon}
              <span className="px-3">{children}</span>
            </a>
          );
        } else {
          return (
            <button
              onClick={onClick || (() => {})}
              className={`${
                active && "bg-gray-100 dark:bg-gray-800"
              } text-left w-full px-3 py-1 text-gray-500 dark:text-gray-300 whitespace-nowrap flex items-center`}
            >
              <span className="text-blue-500">{icon}</span>
              <span className="px-3">{children}</span>
            </button>
          );
        }
      }}
    </Menu.Item>
  );
};
