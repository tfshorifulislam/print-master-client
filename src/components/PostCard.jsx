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

    // 🚀 লিংকের ভেতর লিংক কনফ্লিক্ট এড়ানোর জন্য সেফ নেভিগেশন হ্যান্ডলার
    const handleCardClick = (e) => {
        // যদি ইউজার প্রোফাইল বা বাটন ছাড়া কার্ডের অন্য কোথাও ক্লিক পড়ে, তবেই পোস্টে যাবে
        if (e.target.closest('.stop-propagation')) return;
        router.push(`/post/${card._id}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="group relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden rounded-[24px] bg-zinc-950 border border-zinc-200/40 dark:border-zinc-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-black/40 transition-all duration-600 ease-[cubic-bezier(0.25,1,0.5,1)] hover:translate-y-[-6px] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_40px_80px_-15px_rgba(147,51,234,0.15)] cursor-pointer select-none"
        >

            {/* 🎥 CANVAS IMAGE ENGINE */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src={card.image}
                    alt={postTitle}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06] group-hover:rotate-[0.5deg]"
                />

                {/* সিনেম্যাটিক ফিক্সড অ্যাম্বিয়েন্ট গ্রেডিয়েন্ট শ্যাডো */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5 opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
            </div>

            {/* 👑 TOP FLOATING BADGE (VIEWS & LIVE MONITOR) */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                {/* ভিউজ ট্যাগ */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] tracking-wider shadow-sm transform group-hover:scale-95 transition-transform duration-500">
                    <FaEye className="w-3 h-3 text-purple-400" />
                    <span>{card.views || "1.2k"}</span>
                </div>

                {/* ডাইনামিক হোভার ইনডিকেটর */}
                <div className="h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_10px_#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* 🔮 INTERACTIVE GLASS HUB (HUD CONTAINER) */}
            <div className="absolute inset-x-3 bottom-3 z-20 p-4 rounded-[18px] bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between gap-4">

                {/* ১. প্রজেক্ট এবং টাইটেল ডাটা */}
                <div className="space-y-1">
                    <h3 className="block text-sm font-bold text-white tracking-wide line-clamp-1">
                        {postTitle}
                    </h3>
                </div>

                {/* ২. ক্রিয়েটর মেটা প্যানেল */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10 dark:border-white/[0.05]">

                    {/* ইউজার প্রোফাইল কম্পোনেন্ট - ক্ল্যাশ এড়াতে stop-propagation ক্লাস ব্যবহার করা হয়েছে */}
                    <Link
                        href={isOwnProfile ? '/profile' : `/profile/${card?.email}`}
                        className="stop-propagation flex items-center gap-2 group/author min-w-0"
                    >
                        <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-white/50 group-hover/author:ring-purple-400 transition-all duration-300">
                            <Image
                                src={userImage}
                                alt={userName}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <span className="text-[11px] font-medium text-zinc-200 hover:text-white truncate transition-colors">
                            {userName}
                        </span>
                    </Link>

                    {/* ক্লিক ট্রিগার বাটন - stop-propagation */}
                    <div className="stop-propagation text-[10px] font-bold uppercase tracking-widest text-white px-2.5 py-1 rounded-md bg-white/10 group-hover:bg-purple-600 transition-all duration-300 flex-shrink-0">
                        Explore
                    </div>

                </div>

            </div>

            {/* ✨ LUXURY EDGE SHINE EFFECT */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        </div>
    );
};

export default PostCard;