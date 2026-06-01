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
    BiDotsHorizontalRounded,
} from "react-icons/bi";
import { MdDashboardCustomize } from "react-icons/md";

import { ProfileAvatar } from "./PrifileAvatar";
import { ThemeSwitch } from "./ThemeSwitch";
import { PiDropboxLogoFill } from "react-icons/pi";
import { useSession } from "@/lib/auth-client";
import IsPendingLoading from "./IsPendingLoading";
import CreatePost from "./CreatePost";

const Asidebar = () => {
    const pathname = usePathname();

    const { data: session, isPending } = useSession()
    const user = session?.user;
    const userName = user?.email ? user.email.split('@')[0] : 'username';
    if (isPending) {
        return (
            <IsPendingLoading />
        )
    }

    const navItems = [
        { name: "Home", icon: BiHomeCircle, path: "/" },
        { name: "Explore", icon: BiSearch, path: "/explore" },
        { name: "Notifications", icon: BiBell, path: "/notification" },
        // { name: "Messages", icon: BiMessageSquareDetail, path: "/chat" },
        { name: "Bookmarks", icon: BiBookmark, path: "/bookmarks" },
        { name: "Dashboard", icon: MdDashboardCustomize, path: "/dashboard" },
        { name: "Profile", icon: BiUser, path: "/profile" },
    ];

    return (
        <aside className="hidden lg:flex flex-col justify-between h-screen w-72 xl:w-80 p-3 transition-all duration-300 sticky top-0 overflow-y-auto">
            {/* TOP SECTION */}
            <div className="flex flex-col">
                {/* X Logo */}
                <div className="px-4 py-3 mb-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full w-fit transition-colors cursor-pointer">
                    <PiDropboxLogoFill size={32} className="text-black dark:text-white" />
                </div>

                {/* NAV ITEMS */}
                <nav className="flex flex-col gap-1 mt-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <Link
                                key={item.name}
                                href={item.path}
                                className={`group flex items-center gap-5 px-4 py-3.5 rounded-3xl text-xl transition-all duration-200 
                                    ${isActive
                                        ? "font-bold bg-zinc-100 dark:bg-zinc-900"
                                        : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                    }`}
                            >
                                <item.icon
                                    size={28}
                                    className={isActive ? "text-black dark:text-white" : "text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white"}
                                />

                                <span
                                    className={`hidden xl:inline tracking-tight ${isActive
                                        ? "text-black dark:text-white"
                                        : "text-zinc-700 dark:text-zinc-300"
                                        }`}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}

                    {/* theme Button */}
                    <div className="px-4 mt-2">
                        <ThemeSwitch />
                    </div>

                </nav>

                {/* POST BUTTON */}
                    <CreatePost />

            </div>

            {/* BOTTOM SECTION - User Profile */}
            <div className="mt-auto mb-4">
                <div className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-3xl cursor-pointer transition-all group">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <ProfileAvatar />
                    </div>

                    {/* User Info - Visible on large screens */}
                    <div className="hidden xl:flex flex-col flex-1 min-w-0">
                        <Link href={'/profile'} className="flex items-center justify-between">
                            <div>
                                <p className="font-bold text-[15px] text-black dark:text-white truncate">
                                    {user?.name}
                                </p>
                                <p className="text-zinc-500 dark:text-zinc-400 text-[15px] truncate">
                                    @{userName}
                                </p>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <BiDotsHorizontalRounded size={20} />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Asidebar;