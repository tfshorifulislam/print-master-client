"use client";

import React from "react";
import Link from "next/link";
import {
    FiHome,
    FiSearch,
    FiBookmark,
} from "react-icons/fi";

import { ProfileAvatar } from "./PrifileAvatar";
import CreatePostForMobile from "./CreatePostForMobile";

const MobileScreenBottomNavbar = () => {
    const navItemClass =
        "flex flex-col items-center justify-center p-3 active:scale-90 transition-all duration-200";

    const iconClass =
        "text-gray-700 dark:text-white stroke-[1.8]";

    const textClass =
        "text-[10px] font-medium tracking-tight mt-1 text-gray-700 dark:text-white";

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 sm:hidden select-none pb-safe-bottom">
            {/* Glass Navbar */}
            <div
                className="w-full bg-white/80 dark:bg-black/20 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 shadow-lg px-4 py-2">
                <div className="flex items-center justify-between">
                    {/* Home */}
                    <Link href="/" className={navItemClass}>
                        <FiHome size={22} className={iconClass} />
                        <span className={textClass}>Home</span>
                    </Link>

                    {/* Search */}
                    <Link href="/search" className={navItemClass}>
                        <FiSearch size={22} className={iconClass} />
                        <span className={textClass}>Search</span>
                    </Link>

                    {/* Create Post */}
                    <div className="relative flex items-center justify-center">
                        <div
                            className=" w-12 h-12 rounded-full flex items-center justify-center bg-blue-600 text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ">
                            <CreatePostForMobile />
                        </div>
                    </div>

                    {/* Saved */}
                    <Link href="/saved" className={navItemClass}>
                        <FiBookmark size={22} className={iconClass} />
                        <span className={textClass}>Saved</span>
                    </Link>

                    {/* Profile */}
                    <Link href="/profile" className={navItemClass}>
                        <div
                            className=" w-7 h-7 rounded-full overflow-hidden flex items-center justify-center bg-gray-200 dark:bg-white/10 ring-1 ring-gray-300 dark:ring-white/30">
                            <ProfileAvatar />
                        </div>

                        <span className={textClass}>Profile</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MobileScreenBottomNavbar;