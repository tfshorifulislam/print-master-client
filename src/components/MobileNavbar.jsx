"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { RxDashboard } from "react-icons/rx";
import { FiMessageCircle, FiBell } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { HiOutlinePlus } from "react-icons/hi2";

const MobileNavbar = () => {
    const pathname = usePathname() || "";

    const items = [
        { id: "dashboard", icon: RxDashboard, path: "/" },
        { id: "message", icon: FiMessageCircle, path: "/messages" },
        { id: "post", icon: HiOutlinePlus, path: "/create" },
        { id: "notification", icon: FiBell, path: "/notification" },
        { id: "setting", icon: CiSettings, path: "/settings" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 sm:hidden">
            <div className="flex items-center justify-between px-6 py-3">

                {items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.path;

                    return (
                        <Link
                            key={item.id}
                            href={item.path}
                            className="relative flex flex-col items-center justify-center"
                        >
                            <Icon
                                className={`text-[22px] transition-colors ${active
                                        ? "text-black dark:text-white"
                                        : "text-neutral-500"
                                    }`}
                            />

                            {/* ACTIVE DOT */}
                            {active && (
                                <span className="absolute -bottom-1 h-1 w-1 rounded-full bg-black dark:bg-white" />
                            )}
                        </Link>
                    );
                })}

            </div>
        </div>
    );
};

export default MobileNavbar;