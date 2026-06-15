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
        <div className="group relative w-full select-none flex flex-col justify-between">

            {/* 🌟 NEW ARTWORK CANVAS (ইমেজ ট্র্যাকিং ও স্মুথ জুম) */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-zinc-50 dark:bg-[#0c0c0e] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                
                {/* প্রজেক্ট লিংকার */}
                <Link
                    href={`/post/${card._id}`}
                    className="relative block w-full aspect-[4/3] sm:aspect-[1.35/1] overflow-hidden"
                >
                    <Image
                        src={card.image}
                        alt={postTitle}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />

                    {/* ডার্ক এবং লাইট মোডের জন্য আল্ট্রা-থিন গ্লেজ ওভারলে */}
                    <div className="absolute inset-0 bg-black/[0.01] dark:bg-white/[0.01] pointer-events-none" />
                    
                    {/* সিনেমাটিক ডার্ক রেডিয়েন্ট গ্রাডিয়েন্ট (হোভার করলে অ্যাক্টিভ হবে) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* মিনিমালিস্ট কর্নার ভিউয়ার অ্যাকশন বাটন */}
                    <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        <span className="text-[10px] text-white tracking-widest uppercase font-semibold px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                            View Work →
                        </span>
                    </div>
                </Link>

            </div>

            {/* 🏷️ STREAMLINED INFO MATRIX (ক্লিন ও প্রিমিয়াম ফুটার লেআউট) */}
            <div className="mt-3.5 px-0.5 flex items-center justify-between gap-3">

                {/* অথর এবং প্রজেক্ট টাইটেল ব্লক */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    
                    {/* ক্রিয়েটর অ্যাভাটার লিংকার */}
                    <Link
                        href={isOwnProfile ? '/profile' : `/profile/${card?.email}`}
                        className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-zinc-200/60 dark:ring-zinc-800/60 hover:ring-zinc-900 dark:hover:ring-zinc-100 transition duration-300"
                    >
                        <Image
                            src={userImage}
                            alt={userName}
                            fill
                            className="object-cover"
                        />
                    </Link>

                    {/* মেটা টাইপোগ্রাফি (ক্লিন এবং আন-বক্সড) */}
                    <div className="min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-2">
                        <Link 
                            href={`/post/${card._id}`}
                            className="text-[13px] font-bold text-zinc-800 dark:text-zinc-200 truncate tracking-wide group-hover:text-black dark:group-hover:text-white transition-colors duration-200"
                        >
                            {postTitle}
                        </Link>
                        
                        {/* ডেস্কটপ স্ক্রিনে ডট সেপারেটর */}
                        <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700 text-[10px]">•</span>

                        <Link
                            href={isOwnProfile ? '/profile' : `/profile/${card?.email}`}
                            className="text-[11px] text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400 truncate transition-colors duration-200"
                        >
                            {userName}
                        </Link>
                    </div>
                </div>

                {/* ভিউজ কাউন্টার (স্লীক অ্যান্ড মিনিমালিস্ট) */}
                <div className="flex items-center gap-1 text-zinc-400 dark:text-zinc-500 flex-shrink-0 font-mono text-[11px]">
                    <FaEye className="w-3 h-3 opacity-70" />
                    <span>
                        {card.views || "1.2k"}
                    </span>
                </div>

            </div>

        </div>
    );
};

export default PostCard;