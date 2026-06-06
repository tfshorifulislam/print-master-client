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

import { ProfileAvatar } from "./PrifileAvatar";

import { PiDropboxLogoFill } from "react-icons/pi";
import { useSession } from "@/lib/auth-client";
import IsPendingLoading from "./IsPendingLoading";
import CreatePost from "./CreatePost";
import { ThemeSwitch } from "./ThemeSwitch";

const Asidebar = () => {
    const pathname = usePathname();
    const { data: session, isPending } = useSession();

    const user = session?.user;
    const userName = user?.email?.split("@")[0] || "username";

    const navItems = [
        { name: "Home", icon: BiHomeCircle, path: "/" },
        { name: "Explore", icon: BiSearch, path: "/explore" },
        { name: "Notifications", icon: BiBell, path: "/notification" },
        { name: "Bookmarks", icon: BiBookmark, path: "/bookmarks" },
        { name: "Dashboard", icon: MdDashboardCustomize, path: "/dashboard" },
        { name: "Profile", icon: BiUser, path: "/profile" },
    ];

    return (
        <aside className="hidden sm:flex flex-col justify-between h-screen w-20 lg:w-72 xl:w-80 p-3 sticky top-0 overflow-y-auto border-r transition-all">

            {/* TOP SECTION */}
            <div>

                {/* LOGO */}
                <div className="px-4 py-3 mb-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full w-fit cursor-pointer mx-auto lg:mx-0">
                    <PiDropboxLogoFill size={32} />
                </div>

                {/* NAVIGATION */}
                <nav className="flex flex-col gap-1 mt-1">

                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.path ||
                            pathname.startsWith(item.path + "/");

                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`flex items-center justify-center lg:justify-start gap-0 lg:gap-5 px-3 lg:px-4 py-3.5 rounded-3xl text-xl transition-all
                                ${isActive
                                        ? "font-bold bg-zinc-100 dark:bg-zinc-900"
                                        : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                    }`}
                            >
                                <item.icon size={26} />

                                {/* TEXT ONLY LG+ */}
                                <span className="hidden lg:inline">
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}

                    {/* THEME SWITCH */}
                    <div className="px-4 mt-2 flex justify-center lg:justify-start">
                        <ThemeSwitch />
                    </div>

                </nav>

                {/* CREATE POST */}
                <div className="flex mt-10 justify-center lg:justify-start">
                    <CreatePost />
                </div>
            </div>

            {/* BOTTOM USER */}
            <div className="mt-auto mb-4">

                {isPending ? (
                    <IsPendingLoading />
                ) : (
                    <div className="flex items-center justify-center lg:justify-start gap-3 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-3xl cursor-pointer group">

                        {/* AVATAR */}
                        <ProfileAvatar />

                        {/* USER INFO ONLY LG+ */}
                        <div className="hidden lg:flex flex-col flex-1 min-w-0">

                            <Link
                                href="/profile"
                                className="flex justify-between items-center"
                            >
                                <div>
                                    <p className="font-bold truncate">
                                        {user?.name}
                                    </p>
                                    <p className="text-zinc-500 text-sm truncate">
                                        @{userName}
                                    </p>
                                </div>

                                <BiDotsHorizontalRounded className="opacity-0 group-hover:opacity-100 transition" />
                            </Link>

                        </div>

                    </div>
                )}

            </div>
        </aside>
    );
};

export default Asidebar;