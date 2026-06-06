'use client'

import Image from "next/image";

const PostCard = ({ card }) => {
    const userImage =
        card?.userImage &&
        card.userImage !== "undefined" &&
        card.userImage.trim() !== ""
            ? card.userImage
            : "/avatar.jpg";

    const userName = card?.name || "Creative Designer";
    const postTitle = card?.text || "Untitled Project";

    return (
        <div className="group flex flex-col bg-transparent w-full select-none">
            
            {/* 🖼️ IMAGE CONTAINER (MODERN SHARP & CLEAN GRID) */}
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-500 ease-out group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:group-hover:shadow-[0_20px_50px_rgba(255,255,255,0.02)]">
                <Image
                    src={card.image || "/placeholder.jpg"}
                    alt={postTitle}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
                />

                {/* Subtle Edge Glow on Hover */}
                <div className="absolute inset-0 bg-black/[0.02] dark:bg-white/[0.02] opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* 👤 BOTTOM DETAILS (BEHANCE / CONTRA STYLE MINIMALISM) */}
            <div className="mt-3.5 px-1 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    {/* Minimal Borderless Avatar */}
                    <div className="relative w-7 h-7 overflow-hidden rounded-full flex-shrink-0 bg-zinc-200 dark:bg-zinc-800">
                        <Image
                            src={userImage}
                            alt={userName}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Typography Grid */}
                    <div className="min-w-0">
                        <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100 truncate tracking-tight transition-colors duration-200 group-hover:text-zinc-500 dark:group-hover:text-zinc-400">
                            {postTitle}
                        </h3>
                        <p className="text-[12px] font-medium text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                            {userName}
                        </p>
                    </div>
                </div>

                {/* Premium Views Indicator */}
                <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 flex-shrink-0 pl-2">
                    <span className="text-[11px] font-semibold tracking-wider uppercase bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 rounded-md text-xs">
                        {card.views || "1.2k"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;