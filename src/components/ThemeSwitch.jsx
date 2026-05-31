"use client";

import { useTheme } from "next-themes";
import { IoIosSunny } from "react-icons/io";
import { WiMoonAltWaningCrescent2 } from "react-icons/wi";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <span className="text-3xl ">
        {theme === "dark" ? <IoIosSunny /> : <WiMoonAltWaningCrescent2 />}
      </span>
    </button>
  );
}