"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Dropdown } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import { FaUser, FaCog, FaHome, FaSignOutAlt } from "react-icons/fa";

export default function ProfileDropdown({ handleSignOut }) {
  const { data: user, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const menuItems = [
    { href: "/", label: "Dashboard", icon: FaHome },
    { href: "/profile", label: "My Profile", icon: FaUser },
    { href: "/settings", label: "Settings", icon: FaCog },
  ];

  return (
    <Dropdown placement="bottom-end" isOpen={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <Dropdown.Trigger>
        <div className="cursor-pointer transition-transform hover:scale-105 active:scale-95">
          <Avatar size="lg" className="ring-2 ring-offset-2 ring-white dark:ring-neutral-900 shadow-md">
            <Avatar.Image 
              alt={user?.user?.name} 
              src={user?.user?.image} 
              className="object-cover"
            />
            <Avatar.Fallback className="bg-linear-to-br from-blue-500 to-indigo-600 text-white font-semibold">
              {user?.user?.name?.charAt(0) || "U"}
            </Avatar.Fallback>
          </Avatar>
        </div>
      </Dropdown.Trigger>

      {/* Popover Panel - Awesome Design */}
      <Dropdown.Popover className="w-72 p-2 rounded-xl border border-neutral-200 bg-white shadow-xl dark:bg-neutral-900 dark:border-neutral-700 overflow-hidden">
        
        {/* Profile Header */}
        <div className="px-5 py-6 flex items-center gap-4 border-b border-neutral-100 dark:border-neutral-800 cursor-pointer">
          <Avatar size="xl" className="shadow-md">
            <Avatar.Image alt={user?.user?.name} src={user?.user?.image} />
            <Avatar.Fallback className="bg-linear-to-br from-blue-500 to-indigo-600 text-white text-2xl font-bold">
              {user?.user?.name?.charAt(0) || "U"}
            </Avatar.Fallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="font-semibold text-lg text-neutral-900 dark:text-white truncate">
              {user?.user?.name}
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
              {user?.user?.email}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-3 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-200 rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all active:scale-[0.985]"
            >
              <item.icon className="text-neutral-400 dark:text-neutral-500" />
              {item.label}
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-100 dark:bg-neutral-800 mx-4" />

        {/* Logout Button */}
        <div className="p-2">
          <button
            onClick={() => {
              close();
              handleSignOut();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-500 rounded-2xl hover:bg-red-50 dark:hover:bg-red-500/10 transition-all active:scale-[0.985]"
          >
            <FaSignOutAlt />
            Log Out
          </button>
        </div>

        {/* Footer Info (Optional) */}
        <div className="px-5 py-3 text-[10px] text-center text-neutral-400 dark:text-neutral-600 border-t border-neutral-100 dark:border-neutral-800">
          Signed in as {user?.user?.email}
        </div>
      </Dropdown.Popover>
    </Dropdown>
  );
}