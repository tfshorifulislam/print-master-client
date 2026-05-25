"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import {
  FaUser,
  FaCog,
  FaHome,
  FaSignOutAlt,
  FaTimes,
  FaGoogle,
} from "react-icons/fa";
import { Avatar } from "@heroui/react";

export default function MobileProfileDrawer() {
  const { data: user } = useSession();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const menuItems = [
    { href: "/", label: "Dashboard", icon: FaHome },
    { href: "/profile", label: "My Profile", icon: FaUser },
    { href: "/settings", label: "Settings", icon: FaCog },
  ];

  const handleSignOut = async () => {
    await signOut();
    close();
  };

  const userName = user?.user?.name || "User";
  const userEmail = user?.user?.email || "";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <>
      {/* Avatar */}
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        <Avatar size="lg">
          <Avatar.Image src={user?.user?.image} />
          <Avatar.Fallback>{userInitial}</Avatar.Fallback>
        </Avatar>
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 z-50 bg-white dark:bg-neutral-900 shadow-xl border-l border-neutral-200 dark:border-neutral-800 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-sm uppercase text-neutral-500">Account</h2>
          <button onClick={close}>
            <FaTimes />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto">

          {/* USER INFO (only if logged in) */}
          {user && (
            <>
              <div className="p-5 flex items-center gap-4 border-b">
                <Avatar size="lg">
                  <Avatar.Image src={user?.user?.image} />
                  <Avatar.Fallback>{userInitial}</Avatar.Fallback>
                </Avatar>

                <div>
                  <p className="font-medium">{userName}</p>
                  <p className="text-xs text-gray-500">{userEmail}</p>
                </div>
              </div>

              {/* MENU */}
              <div className="p-3 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <item.icon />
                    {item.label}
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* GUEST UI (inside scroll area, not bottom fixed) */}
          {!user && (
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-500">
                You are not signed in
              </p>
            </div>
          )}
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="p-5 border-t border-neutral-200 dark:border-neutral-800 space-y-3">

          {user ? (
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-3 py-3 text-red-500 bg-neutral-100 dark:bg-neutral-800 rounded-xl"
            >
              <FaSignOutAlt />
              Sign out
            </button>
          ) : (
            <>
              <Link
                href="/login"
                onClick={close}
                className="block text-center py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={close}
                className="block text-center py-3 border rounded-xl"
              >
                Sign up
              </Link>

              <button
                onClick={() => {
                  close();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-xl"
              >
                <FaGoogle />
                Continue with Google
              </button>
            </>
          )}

        </div>

      </div>
    </>
  );
}