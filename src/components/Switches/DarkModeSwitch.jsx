import React from "react";
import { Switch } from "@headlessui/react";
import { useDarkThemeContext } from "../../contexts/DarkThemeContext";

export default function DarkModeSwitch() {
  const { isDark, setIsDark } = useDarkThemeContext();

  return (
    <Switch
      checked={isDark}
      onChange={setIsDark}
      className={`${
        isDark ? "bg-gray-700 border-gray-900" : "bg-blue-400 border-blue-500"
      }
          no-tap-highlight relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${
          isDark ? "translate-x-9 bg-yellow-200" : "translate-x-0 bg-white"
        }
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full shadow-lg transform ring-0 transition ease-in-out duration-200`}
      />
    </Switch>
  );
}
