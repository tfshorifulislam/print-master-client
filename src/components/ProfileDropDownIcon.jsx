"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Avatar, Dropdown } from "@heroui/react";

export default function ProfileDropdown({ user, handleSignOut }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const close = () => setOpen(false);


    const items = [
        { href: "/", label: "Dashboard" },
        { href: "/profile", label: "Profile" },
        { href: "/settings", label: "Settings" },
    ];

    return (
        <Dropdown placement="bottom-end" isOpen={open} onOpenChange={setOpen}>
            {/* Trigger */}
            <Dropdown.Trigger>
                <Avatar
                    size="lg"
                    className=" cursor-pointer ring-2 ring-transparent hover:ring-emerald-500 transition"
                >
                    <Avatar.Image src={user?.image} />
                    <Avatar.Fallback>
                        {user?.name?.[0]?.toUpperCase()}
                    </Avatar.Fallback>
                </Avatar>
            </Dropdown.Trigger>

            {/* Panel */}
            <Dropdown.Popover className="w-64 p-2 rounded-2xl border bg-white shadow-xl border-neutral-200 dark:bg-neutral-950 dark:border-neutral-800">

                {/* Header */}
                <div className="flex items-center gap-3 p-3 border-b border-neutral-200 dark:border-neutral-800">
                    <Avatar size="md">
                        <Avatar.Image src={user?.image} />
                        <Avatar.Fallback>
                            {user?.name?.[0]?.toUpperCase()}
                        </Avatar.Fallback>
                    </Avatar>

                    <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{user?.name}</p>
                        <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                    </div>
                </div>

                {/* Menu */}
                <div className="py-2">
                    {items.map((i) => (
                        <Link
                            key={i.href}
                            href={i.href}
                            onClick={close}
                            className="block px-3 py-2 text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                        >
                            {i.label}
                        </Link>
                    ))}

                    <div className="my-2 h-px bg-neutral-200 dark:bg-neutral-800" />

                    <button
                        onClick={handleSignOut}
                        className="w-full text-left px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                    >
                        Log out
                    </button>
                </div>
            </Dropdown.Popover>
        </Dropdown>
    );
}