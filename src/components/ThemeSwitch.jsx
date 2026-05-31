"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoIosSunny } from "react-icons/io";
import { WiMoonAltWaningCrescent2 } from "react-icons/wi";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
    >
      <span className="text-xl flex items-center gap-5">
        {theme === "dark" ? (
          <IoIosSunny />
        ) : (
          <WiMoonAltWaningCrescent2 />
        )}
        Theme
      </span>
    </button>
  );
}