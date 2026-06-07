"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BiHomeCircle,
    BiSearch,
    BiBell,
    BiBookmark,
    BiUser,
    BiDotsHorizontalRounded,
} from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";
import { PiDropboxLogoFill } from "react-icons/pi";

import { ProfileAvatar } from "./PrifileAvatar";
import { useSession } from "@/lib/auth-client";
import IsPendingLoading from "./IsPendingLoading";
import CreatePost from "./CreatePost";
import { ThemeSwitch } from "./ThemeSwitch";

const Asidebar = () => {
    const pathname = usePathname();
    const { data: session, isPending } = useSession();

    const user = session?.user;
    const userName = user?.email?.split("@")[0] || "user";

    const navItems = [
        { name: "Home", icon: BiHomeCircle, path: "/" },
        { name: "Explore", icon: BiSearch, path: "/explore" },
        { name: "Notifications", icon: BiBell, path: "/notification" },
        { name: "Bookmarks", icon: BiBookmark, path: "/bookmarks" },
        { name: "Dashboard", icon: MdDashboardCustomize, path: "/dashboard" },
        { name: "Profile", icon: BiUser, path: "/profile" },
    ];

    const baseLink =
        "flex items-center justify-center lg:justify-start gap-4 px-4 py-3 rounded-2xl transition-all duration-200 text-[15px] font-medium";

    return (
        <aside className="hidden sm:flex flex-col justify-between h-screen w-20 lg:w-72 xl:w-80 p-3 sticky top-0 overflow-y-auto border-r border-zinc-200/40 dark:border-white/10 bg-transparent">

            {/* TOP SECTION */}
            <div>

                {/* LOGO */}
                <div className="px-4 py-3 mb-3 rounded-2xl w-fit mx-auto lg:mx-0 cursor-pointer transition hover:bg-zinc-100 dark:hover:bg-zinc-900">
                    <PiDropboxLogoFill size={32} />
                </div>

                {/* NAV */}
                <nav className="flex flex-col gap-1">

                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.path ||
                            pathname.startsWith(item.path + "/");

                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`${baseLink} ${
                                    isActive
                                        ? "bg-zinc-100 dark:bg-zinc-900 font-semibold"
                                        : "hover:bg-zinc-100/70 dark:hover:bg-zinc-900/70 text-zinc-700 dark:text-zinc-200"
                                }`}
                            >
                                <item.icon size={24} />

                                <span className="hidden lg:inline tracking-wide">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}

                    {/* THEME */}
                    <div className="mt-2 px-4 flex justify-center lg:justify-start">
                        <ThemeSwitch />
                    </div>
                </nav>

                {/* CREATE POST */}
                <div className="mt-10 flex justify-center lg:justify-start">
                    <CreatePost />
                </div>
            </div>

            {/* USER SECTION */}
            <div className="mt-auto mb-4">
                {isPending ? (
                    <IsPendingLoading />
                ) : (
                    <div className="flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-2xl cursor-pointer group hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">

                        <ProfileAvatar />

                        <div className="hidden lg:flex flex-col flex-1 min-w-0">
                            <Link href="/profile" className="flex items-center justify-between">
                                <div className="min-w-0">
                                    <p className="font-semibold text-[15px] truncate text-zinc-900 dark:text-zinc-100">
                                        {user?.name}
                                    </p>
                                    <p className="text-xs text-zinc-500 truncate">
                                        @{userName}
                                    </p>
                                </div>

                                <BiDotsHorizontalRounded className="opacity-0 group-hover:opacity-100 transition text-zinc-500" />
                            </Link>
                        </div>

                    </div>
                )}
            </div>
        </aside>
    );
};

export default Asidebar;