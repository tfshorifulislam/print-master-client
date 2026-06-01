"use client";

import React from "react";
import { Avatar, Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  BiHomeCircle,
  BiSearch,
  BiBell,
  BiMessageSquareDetail,
  BiBookmark,
  BiUser,
} from "react-icons/bi";

import { MdDashboardCustomize } from "react-icons/md";
import { signOut, useSession } from "@/lib/auth-client";
import CreatePost from "./CreatePost";
import { ThemeSwitch } from "./ThemeSwitch";

export function ProfileAvatar() {
  const { data: user } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  let closeDrawerRef = React.useRef(null);

  const navItems = [
    { name: "Home", icon: BiHomeCircle, path: "/" },
    { name: "Search", icon: BiSearch, path: "/search" },
    { name: "Notification", icon: BiBell, path: "/notification" },
    { name: "Chat", icon: BiMessageSquareDetail, path: "/chat" },
    { name: "Bookmarks", icon: BiBookmark, path: "/bookmarks" },
    { name: "Dashboard", icon: MdDashboardCustomize, path: "/dashboard" },
    { name: "Profile", icon: BiUser, path: "/profile" },
  ];

  const handleNavigate = (path) => {
    closeDrawerRef.current?.click();
    router.push(path);
  };

  const handleSignOut = async () => {
    closeDrawerRef.current?.click();
    await signOut();
    router.push("/");
  };

  return (
    <Drawer>
      {/* TRIGGER */}
      <Drawer.Trigger className="cursor-pointer">
        <Avatar
          size="sm"
          className="ring-2 ring-offset-2 ring-white dark:ring-neutral-900 shadow-md"
        >
          <Avatar.Image
            alt={user?.user?.name}
            src={user?.user?.image}
          />
          <Avatar.Fallback className="bg-linear-to-br from-blue-500 to-indigo-600 text-white font-semibold">
            {user?.user?.name?.charAt(0) || "U"}
          </Avatar.Fallback>
        </Avatar>
      </Drawer.Trigger>

      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog className="w-72 bg-white dark:bg-zinc-950 text-black dark:text-white flex flex-col h-full">

            {/* 🔥 HIDDEN CLOSE TRIGGER (IMPORTANT) */}
            <Drawer.CloseTrigger ref={closeDrawerRef} />

            <Drawer.Header className="border-b border-zinc-200 dark:border-zinc-800">
              <Drawer.Heading className="text-lg font-semibold">
                Menu
              </Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body className="flex-1 overflow-y-auto py-3">
              <nav className="flex flex-col gap-1">

                {navItems.map((item) => {
                  const isActive = pathname === item.path;

                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigate(item.path)}
                      className={`flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition
                        ${isActive
                          ? "bg-zinc-200 dark:bg-zinc-900 font-semibold"
                          : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                        }`}
                    >
                      <item.icon
                        className={`text-xl ${isActive
                            ? "text-black dark:text-white"
                            : "text-zinc-500 dark:text-zinc-400"
                          }`}
                      />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
                <div className="ml-1">
                  <ThemeSwitch />
                </div>


                <div className="mt-3">
                  <CreatePost />
                </div>

              </nav>
            </Drawer.Body>

            <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
              <Button
                onClick={handleSignOut}
                className="w-full rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </Button>
            </div>

          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}