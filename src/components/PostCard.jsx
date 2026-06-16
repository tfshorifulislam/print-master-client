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
            className="group relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-2xl bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer select-none"
        >

            {/* IMAGE */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src={card.image}
                    alt={postTitle}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />

                {/* subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* TOP BADGE */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 text-[11px] text-black dark:text-white">
                    <FaEye className="w-3 h-3" />
                    <span>{card.views || "1.2k"}</span>
                </div>

                <div className="h-2 w-2 rounded-full bg-black dark:bg-white opacity-70 group-hover:opacity-100 transition" />
            </div>

            {/* BOTTOM CONTENT */}
            <div className="absolute inset-x-3 bottom-3 z-20 p-4 rounded-xl bg-white/85 dark:bg-black/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-sm translate-y-1 group-hover:translate-y-0 transition-all duration-500">

                {/* TITLE */}
                <h3 className="text-sm font-semibold text-black dark:text-white line-clamp-1">
                    {postTitle}
                </h3>

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-zinc-200 dark:border-zinc-800">

                    {/* AUTHOR */}
                    <Link
                        href={isOwnProfile ? '/profile' : `/profile/${card?.email}`}
                        className="stop-propagation flex items-center gap-2 min-w-0"
                    >
                        <div className="relative w-7 h-7 rounded-full overflow-hidden ring-1 ring-zinc-300 dark:ring-zinc-700">
                            <Image
                                src={userImage}
                                alt={userName}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <span className="text-[11px] text-zinc-600 dark:text-zinc-300 truncate">
                            {userName}
                        </span>
                    </Link>

                    {/* BUTTON */}
                    <div className="stop-propagation text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition">
                        Explore
                    </div>

                </div>
            </div>

        </div>
    );
};

export default PostCard;