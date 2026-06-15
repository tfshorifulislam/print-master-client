'use client'

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa6"; // আইকন দিয়ে ড্রিবল ভাইব আনার জন্য

const PostCard = ({ card }) => {
    const userImage =
        card?.userImage &&
        card.userImage !== "undefined" &&
        card.userImage.trim() !== ""
            ? card.userImage
            : "/avatar.jpg";

    const userName = card?.name || "Anonymous";
    const postTitle = card?.text || "Untitled Project";

    const { data } = useSession();
    const user = data?.user;
    const isOwnProfile = user?.email === card?.email;

    return (
        <div className="group flex flex-col bg-transparent w-full select-none">
            
            {/* 🖼️ IMAGE CONTAINER (PREMIUM BEHANCE & DRIBBBLE STYLE) */}
            <Link
                href={`/post/${card._id}`}
                className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:translate-y-[-4px] group-hover:shadow-[0_24px_48px_rgba(0,0,0,0.08)] dark:group-hover:shadow-[0_24px_48px_rgba(0,0,0,0.4)]"
            >
                <Image
                    src={card.image}
                    alt={postTitle}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.05]"
                />

                {/* Smooth Gradient Overlay on Hover (Behance Concept) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none">
                    <span className="text-white text-xs font-medium tracking-wide bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm hidden sm:inline-block">
                        View Case Study
                    </span>
                </div>

                {/* Subtle Edge Glow for Dark Mode */}
                <div className="absolute inset-0 bg-black/[0.01] dark:bg-white/[0.02] pointer-events-none" />
            </Link>

            {/* 👤 BOTTOM DETAILS (CONTRA / DRIBBBLE STYLE MINIMALISM) */}
            <div className="mt-3 px-0.5 flex items-start justify-between gap-3">
                <Link
                    href={isOwnProfile ? '/profile' : `/profile/${card?.email}`}
                    className="flex items-center gap-2.5 min-w-0 flex-1 group/author"
                >
                    {/* Minimalist Bordered Avatar */}
                    <div className="relative w-7 h-7 overflow-hidden rounded-full flex-shrink-0 bg-zinc-200 dark:bg-zinc-800 ring-1 ring-zinc-200 dark:ring-zinc-800 group-hover/author:ring-zinc-900 dark:group-hover/author:ring-zinc-100 transition-all duration-300">
                        <Image
                            src={userImage}
                            alt={userName}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Typography Grid */}
                    <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] font-bold text-zinc-900 dark:text-zinc-500 transition-colors duration-300 group-hover:text-black dark:group-hover:text-zinc-100 truncate tracking-tight">
                            {postTitle}
                        </h3>
                        <p className="text-[12px] font-medium text-zinc-500 dark:text-zinc-400 group-hover/author:text-zinc-900 dark:group-hover/author:text-zinc-200 transition-colors duration-200 truncate mt-0.5">
                            {userName}
                        </p>
                    </div>
                </Link>

                {/* 👁️ DRIBBBLE STYLE VIEWS INDICATOR */}
                <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 flex-shrink-0 pt-0.5">
                    <FaEye className="w-3.5 h-3.5" />
                    <span className="text-[12px] font-bold tracking-tight text-zinc-600 dark:text-zinc-400">
                        {card.views || "1.2k"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;