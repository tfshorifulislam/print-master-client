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
        {
            href: "/settings",
            icon: CiSettings,
        },
    ];

    const isActive = (path) => pathname === path;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sm:hidden">

            <div className="flex items-center justify-between px-6 py-2">

                {/* Left + Center Nav Items */}
                {navItems.slice(0, 2).map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="relative flex flex-col items-center justify-center p-2"
                    >
                        <item.icon
                            className={`text-2xl transition-colors ${isActive(item.href)
                                ? "text-black dark:text-white"
                                : "text-neutral-500 dark:text-neutral-400"
                                }`}
                        />

                        {isActive(item.href) && (
                            <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-black dark:bg-white" />
                        )}
                    </Link>
                ))}

                {/* Create Button (Center Floating Style) */}
                <div className="relative -mt-10">
                    <div className="bg-black text-white rounded-full p-1 shadow-lg">
                        <CreatePost />
                    </div>
                </div>

                {/* Settings + Profile */}
                <Link
                    href="/settings"
                    className="relative flex flex-col items-center justify-center p-2"
                >
                    <CiSettings
                        className={`text-2xl transition-colors ${isActive("/settings")
                            ? "text-black dark:text-white"
                            : "text-neutral-500 dark:text-neutral-400"
                            }`}
                    />

                    {isActive("/settings") && (
                        <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-black dark:bg-white" />
                    )}
                </Link>
                <MobileProfileDropdown />
            </div>
        </div>
    );
};

export default MobileNavbar;