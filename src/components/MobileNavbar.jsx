"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { FiBell } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import CreatePost from "./CreatePost";
import MobileProfileDropdown from "./MobilePrifileDropDown";

const MobileNavbar = () => {
    const pathname = usePathname();

    const navItems = [
        {
            href: "/",
            icon: RxDashboard,
        },
        {
            href: "/notification",
            icon: FiBell,
        },
    ];

    const isActive = (path) => pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white dark:bg-[#0A0A0A] border-t border-gray-100 dark:border-zinc-800/80 px-2 py-1.5 sm:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.03)] dark:shadow-[0_-4px_30px_rgba(0,0,0,0.4)] transition-colors duration-300">
            <div className="flex items-center justify-between max-w-md mx-auto">

                {/* Left Side Nav Items (Dashboard & Notification) */}
                <div className="flex items-center justify-around w-2/5">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-col items-center justify-center p-2 group"
                        >
                            <item.icon
                                className={`text-2xl transition-all duration-300 ${
                                    isActive(item.href)
                                        ? "text-[#7C3AED] dark:text-[#A78BFA] scale-105"
                                        : "text-neutral-400 dark:text-neutral-500"
                                }`}
                            />

                            {/* একটিভ ইন্ডিকেটর ডট */}
                            {isActive(item.href) && (
                                <span className="absolute bottom-0 h-1 w-1 rounded-full bg-[#7C3AED] dark:bg-[#A78BFA]" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* 🎯 Center Create Button - একদম পারফেক্টলি অ্যালাইনড এবং সমান হাইটে */}
                <div className="w-1/5 flex items-center justify-center">
                    <div className="bg-gradient-to-tr from-[#7C3AED] via-[#3B82F6] to-[#A78BFA] p-[2px] rounded-full shadow-md active:scale-95 transition-all duration-200">
                        <div className="bg-white dark:bg-[#0A0A0A] active:bg-transparent rounded-full p-2.5 text-[#7C3AED] dark:text-white flex items-center justify-center">
                            <CreatePost />
                        </div>
                    </div>
                </div>

                {/* Right Side Items (Settings & Profile) */}
                <div className="flex items-center justify-around w-2/5">
                    {/* Settings Link */}
                    <Link
                        href="/settings"
                        className="relative flex flex-col items-center justify-center p-2 group"
                    >
                        <CiSettings
                            className={`text-2xl transition-all duration-300 ${
                                isActive("/settings")
                                    ? "text-[#7C3AED] dark:text-[#A78BFA] scale-105"
                                    : "text-neutral-400 dark:text-neutral-500"
                            }`}
                        />

                        {/* একটিভ ইন্ডিকেটর ডট */}
                        {isActive("/settings") && (
                            <span className="absolute bottom-0 h-1 w-1 rounded-full bg-[#7C3AED] dark:bg-[#A78BFA]" />
                        )}
                    </Link>

                    {/* Profile Dropdown */}
                    <div className="flex items-center justify-center">
                        <MobileProfileDropdown />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MobileNavbar;