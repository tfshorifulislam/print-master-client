'use client'

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { FaEye } from "react-icons/fa6";

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
        <div className="group relative w-full select-none">

            {/* IMAGE WRAPPER */}
            <Link
                href={`/post/${card._id}`}
                className="relative block w-full aspect-[4/3] overflow-hidden rounded-2xl
                bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black
                border border-zinc-200/50 dark:border-zinc-800/50
                shadow-sm
                transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)]
                dark:group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.45)]
                group-hover:-translate-y-1"
            >
                <Image
                    src={card.image}
                    alt={postTitle}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.07]"
                />

                {/* SOFT PREMIUM OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                {/* CENTER HOVER CTA */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <span className="text-white text-xs tracking-wider font-semibold px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        Open Project
                    </span>
                </div>

                {/* subtle shine */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-gradient-to-tr from-white to-transparent pointer-events-none" />
            </Link>

            {/* INFO SECTION */}
            <div className="mt-3 flex items-start justify-between gap-3">

                {/* AUTHOR + TITLE */}
                <Link
                    href={isOwnProfile ? '/profile' : `/profile/${card?.email}`}
                    className="flex items-center gap-3 min-w-0 flex-1 group/author"
                >
                    {/* Avatar */}
                    <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-zinc-200/70 dark:ring-zinc-800/70 group-hover/author:ring-zinc-900 dark:group-hover/author:ring-zinc-100 transition">
                        <Image
                            src={userImage}
                            alt={userName}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* TEXT */}
                    <div className="min-w-0">
                        <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100 truncate leading-tight">
                            {postTitle}
                        </h3>

                        <p className="text-[12px] text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                            {userName}
                        </p>
                    </div>
                </Link>

                {/* VIEWS */}
                <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 flex-shrink-0 mt-0.5">
                    <FaEye className="w-3.5 h-3.5" />
                    <span className="text-[12px] font-medium">
                        {card.views || "1.2k"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;