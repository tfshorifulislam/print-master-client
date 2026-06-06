'use client';

import React from 'react';
import { AiFillHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { ProfileAvatar } from './PrifileAvatar';
import CreatePostForMobile from './CreatePostForMobile';

const MobileScreenBottomNavbar = () => {
    return (
        <div
            className="fixed bottom-0 left-0 w-full flex justify-between items-center px-4 py-2 z-50 sm:hidden bg-white text-black border-t border-gray-200 dark:bg-[#0b0b0d] dark:text-white dark:border-zinc-800 ">

            {/* Home */}
            <button className="flex flex-col items-center text-gray-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                <AiFillHome size={22} />
            </button>

            {/* Search */}
            <button className="flex flex-col items-center text-gray-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                <FiSearch size={22} />
            </button>

            {/* Post (IMPORTANT FIX) */}
            <div className="flex flex-col items-center">
                <CreatePostForMobile />
            </div>

            {/* Bookmark */}
            <button className="flex flex-col items-center text-gray-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                <BsBookmark size={22} />
            </button>

            {/* Profile */}
            <div className="flex flex-col items-center text-gray-600 hover:text-black dark:text-zinc-400 dark:hover:text-white">
                <ProfileAvatar />
            </div>

        </div>
    );
};

export default MobileScreenBottomNavbar;