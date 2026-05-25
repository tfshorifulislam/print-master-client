"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { FaUser, FaCog, FaHome, FaSignOutAlt, FaTimes } from "react-icons/fa";
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

    const drawerBase =
        "fixed top-0 right-0 h-full w-80 z-50 bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-xl transition-transform duration-300";

    const menuItemBase =
        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition";

    const menuItemStyle =
        "text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800";

    return (
        <>
            {/* Avatar Trigger */}
            <div onClick={() => setOpen(true)} className="cursor-pointer">
                <Avatar size="lg" className="ring-1 ring-neutral-300 dark:ring-neutral-700">
                    <Avatar.Image src={user?.user?.image} />
                    <Avatar.Fallback className="bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
                        {userInitial}
                    </Avatar.Fallback>
                </Avatar>
            </div>

            {/* Overlay */}
            {open && (
                <div
                    onClick={close}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                />
            )}

            {/* Drawer */}
            <div
                className={`${drawerBase} ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
                    <h2 className="text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                        Account
                    </h2>

                    <button
                        onClick={close}
                        className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                    >
                        <FaTimes className="text-neutral-500" />
                    </button>
                </div>

                {/* User Info */}
                <div className="p-5 flex items-center gap-4 border-b border-neutral-200 dark:border-neutral-800">
                    <Avatar size="lg">
                        <Avatar.Image src={user?.user?.image} />
                        <Avatar.Fallback className="bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200">
                            {userInitial}
                        </Avatar.Fallback>
                    </Avatar>

                    <div className="min-w-0">
                        <p className="font-medium text-neutral-900 dark:text-neutral-100 truncate">
                            {userName}
                        </p>
                        {userEmail && (
                            <p className="text-xs text-neutral-500 truncate">
                                {userEmail}
                            </p>
                        )}
                    </div>
                </div>

                {/* Menu */}
                <div className="p-3 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={close}
                            className={`${menuItemBase} ${menuItemStyle}`}
                        >
                            <item.icon className="text-neutral-500" />
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Logout */}
                <div className="absolute bottom-5 left-0 right-0 px-5">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center gap-3 py-3 text-sm text-red-500 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700 rounded-xl transition"
                    >
                        <FaSignOutAlt />
                        Sign out
                    </button>
                </div>
            </div>
        </>
    );
}