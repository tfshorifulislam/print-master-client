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
    // Layout shift বন্ধ করতে এবং সাইডবার ভাঙা এড়াতে ফাঁকা স্পেস রিটার্ন করবে
    return <div className="h-[28px] w-[28px]" />; 
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center justify-center xl:justify-start gap-5 text-xl text-zinc-900 dark:text-zinc-100 transition-all w-fit xl:w-full focus:outline-none"
      title="Toggle Theme"
    >
      {/* আইকন কন্টেইনার - যা সব স্ক্রিনেই পারফেক্ট সাইজে থাকবে */}
      <div className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition">
        {isDark ? (
          <IoIosSunny size={26} className="text-amber-500" />
        ) : (
          <WiMoonAltWaningCrescent2 size={26} className="text-zinc-700 dark:text-zinc-300" />
        )}
      </div>

      {/* 🛠️ আসল ফিক্স: ছোট স্ক্রিনে টেক্সট হাইড থাকবে, শুধু XL স্ক্রিনে দৃশ্যমান হবে */}
      <span className="hidden xl:inline text-sm">
        Theme
      </span>
    </button>
  );
}