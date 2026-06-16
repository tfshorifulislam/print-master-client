'use client'

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa6";

const PostCard = ({ card }) => {
    const router = useRouter();

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

    const handleCardClick = (e) => {
        if (e.target.closest('.stop-propagation')) return;
        router.push(`/post/${card._id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="group relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200/70 dark:border-zinc-800 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer select-none"
        >

            {/* IMAGE */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={card.image}
                    alt={postTitle}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                />

                {/* MODERN SOFT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-white/5 to-transparent transition" />
            </div>

            {/* TOP BADGE */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                    bg-white/70 dark:bg-black/40 backdrop-blur-xl 
                    border border-white/30 dark:border-white/10 
                    text-[11px] text-black dark:text-white shadow-sm">

                    <FaEye className="w-3 h-3 opacity-80" />
                    <span className="font-medium">{card.views || "1.2k"}</span>
                </div>

                <div className="h-2.5 w-2.5 rounded-full bg-black dark:bg-white opacity-60 group-hover:opacity-100 transition" />
            </div>

            {/* CONTENT CARD */}
            <div className="absolute inset-x-3 bottom-3 z-20 p-4 rounded-2xl 
                bg-white/75 dark:bg-black/50 backdrop-blur-2xl 
                border border-zinc-200/50 dark:border-white/10 
                shadow-lg translate-y-2 group-hover:translate-y-0 
                transition-all duration-500">

                {/* TITLE */}
                <h3 className="text-[15px] font-semibold text-black dark:text-white line-clamp-1 tracking-tight">
                    {postTitle}
                </h3>

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-3 mt-3 
                    border-t border-zinc-200/60 dark:border-white/10">

                    {/* AUTHOR */}
                    <Link
                        href={isOwnProfile ? '/profile' : `/profile/${card?.email}`}
                        className="stop-propagation flex items-center gap-2 min-w-0"
                    >
                        <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-zinc-300 dark:ring-zinc-700">
                            <Image
                                src={userImage}
                                alt={userName}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <span className="text-xs text-zinc-600 dark:text-zinc-300 truncate font-medium">
                            {userName}
                        </span>
                    </Link>

                    {/* BUTTON */}
                    <div className="stop-propagation px-3 py-1.5 rounded-lg 
                        bg-black text-white dark:bg-white dark:text-black 
                        text-[10px] font-semibold tracking-widest uppercase 
                        hover:scale-95 active:scale-90 transition">
                        Explore
                    </div>

                </div>
            </div>

        </div>
    );
};

export default PostCard;