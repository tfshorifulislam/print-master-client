"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BiHomeCircle,
  BiSearch,
  BiBell,
  BiMessageSquareDetail,
  BiBookmark,
  BiUser,
} from "react-icons/bi";

import { MdDashboardCustomize } from "react-icons/md";
import { ProfileAvatar } from "./ProfileAvatar";
import { ThemeSwitch } from "./ToggleTheme";

const Asidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", icon: BiHomeCircle, path: "/" },
    { name: "Search", icon: BiSearch, path: "/search" },
    { name: "Notification", icon: BiBell, path: "/notification" },
    { name: "Chat", icon: BiMessageSquareDetail, path: "/chat" },
    { name: "Bookmarks", icon: BiBookmark, path: "/bookmarks" },
    { name: "Dashboard", icon: MdDashboardCustomize, path: "/dashboard" },
    { name: "Profile", icon: BiUser, path: "/profile" },
  ];

  return (
    <aside className="hidden md:flex flex-col justify-between h-screen p-3 transition-all duration-300">

      {/* TOP */}
      <div className="flex flex-col gap-2 mt-2">

        {/* PROFILE */}
        <div className="px-2 mb-4">
          <ProfileAvatar />
        </div>

        {/* NAV ITEMS */}
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-100 dark:bg-zinc-900"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
              >
                <item.icon
                  size={24}
                  className={
                    isActive
                      ? "text-black dark:text-white"
                      : "text-zinc-600 dark:text-zinc-400"
                  }
                />

                <span
                  className={`hidden lg:inline text-base tracking-wide ${
                    isActive
                      ? "font-bold text-black dark:text-white"
                      : "text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col gap-3">

        <ThemeSwitch />

        <button className="w-full py-3 rounded-lg font-bold text-lg bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-all duration-200 active:scale-95">
          Post
        </button>

      </div>
    </aside>
  );
};

export default Asidebar;