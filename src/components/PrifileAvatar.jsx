"use client";

import React from "react";
import { Avatar, Drawer } from "@heroui/react";
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

export function ProfileAvatar() {
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
    <Drawer>
      {/* TRIGGER (NO BUTTON WRAPPER) */}
      <Drawer.Trigger className="cursor-pointer">
        <Avatar>
          <Avatar.Image
            alt="John Doe"
            src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
          />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
      </Drawer.Trigger>

      {/* DRAWER */}
      <Drawer.Backdrop>
        <Drawer.Content placement="left">

          <Drawer.Dialog className="bg-white text-black dark:bg-[#0b0b0d] dark:text-white">

            <Drawer.CloseTrigger />

            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
              <nav className="flex flex-col gap-1 mt-2">

                {navItems.map((item) => {
                  const isActive = pathname === item.path;

                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition

                        ${
                          isActive
                            ? "bg-zinc-200 dark:bg-zinc-900 font-semibold"
                            : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                        }
                      `}
                    >
                      <item.icon
                        className={
                          isActive
                            ? "text-black dark:text-white text-xl"
                            : "text-zinc-500 dark:text-zinc-400 text-xl"
                        }
                      />

                      <span>{item.name}</span>
                    </Link>
                  );
                })}

              </nav>
            </Drawer.Body>

          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}