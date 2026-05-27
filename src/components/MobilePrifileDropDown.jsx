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
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <>
      {/* Avatar */}
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        <Avatar size="lg">
          <Avatar.Image src={user?.user?.image} />
          <Avatar.Fallback>
            {user?.user?.name?.charAt(0) || "U"}
          </Avatar.Fallback>
        </Avatar>
      </div>

      {/* OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            onClick={close}
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      {/* DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed rounded-sm right-0 bottom-0 w-60 h-full
            bg-white dark:bg-neutral-900 z-9999
            shadow-2xl flex flex-col"
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
              <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                Account Menu
              </h2>

              <button
                onClick={close}
                className="flex items-center justify-center w-10 h-10 rounded-full
                bg-black text-white dark:bg-white dark:text-black shadow-md"
              >
                <FaTimes />
              </button>
            </div>

            {/* USER */}
            {user && (
              <Link
                href="/profile"
                onClick={close}
                className="p-5 flex items-center gap-4 border-b border-neutral-200 dark:border-neutral-800"
              >
                <Avatar size="lg">
                  <Avatar.Image src={user?.user?.image} />
                  <Avatar.Fallback>
                    {user?.user?.name?.charAt(0) || "U"}
                  </Avatar.Fallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="font-medium truncate">
                    {user?.user?.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.user?.email}
                  </p>
                </div>
              </Link>
            )}

            {/* MENU */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {user ? (
                menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl
                    hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  >
                    <item.icon className="text-neutral-500" />
                    {item.label}
                  </Link>
                ))
              ) : (
                <div className="p-3 text-sm text-gray-500">
                  You are not signed in
                </div>
              )}
            </div>

            {/* BOTTOM */}
            <div className="p-5 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-center gap-3 py-3
                  text-red-500 bg-neutral-100 dark:bg-neutral-800 rounded-xl"
                >
                  <FaSignOutAlt />
                  Sign out
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={close}
                    className="block text-center py-3 bg-black text-white rounded-xl"
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

                  <button className="w-full flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-xl">
                    <FaGoogle />
                    Google
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}