'use client'
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import {
    FiHeart,
    FiMessageCircle,
    FiRepeat,
    FiSend,
    FiPlus
} from "react-icons/fi";
import IsPendingLoading from "./IsPendingLoading";

const PostCard = ({ card }) => {


    const { data: session, isPending } = useSession()
    const user = session?.user

    if (isPending) {
        return (
            <IsPendingLoading />
        )
    }


    const userImage =
        card?.userImage &&
            card.userImage !== "undefined" &&
            card.userImage.trim() !== ""
            ? card.userImage
            : "/avatar.jpg";



    return (
        <div className="border-b border-zinc-100 dark:border-zinc-900 p-4 bg-white dark:bg-black hover:bg-zinc-50/30 dark:hover:bg-zinc-950/20 transition-colors duration-200 cursor-pointer select-none">

            {/* MAIN TWO-COLUMN THREADS LAYOUT */}
            <div className="flex gap-3">

                {/* LEFT COLUMN: AVATAR & CONTINUOUS THREAD LINE */}
                <div className="flex flex-col items-center shrink-0">

                    {/* AVATAR */}
                    <Link href={`/profile/${card?.email}`} className="relative w-10 h-10 cursor-pointer group">
                        <Image
                            width={50}
                            height={50}
                            className="rounded-full"
                            alt="user"
                            src={userImage}
                        />
                        {/* Threads Follow Badge Button */}
                        <button className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center border border-white dark:border-black shadow-md transition-transform duration-150 active:scale-90">
                            <FiPlus className="text-[10px] stroke-[3.5]" />
                        </button>
                    </Link>

                    {/* THE INTERACTIVE VERTICAL THREAD LINE */}
                    <div className="w-0.5 grow mt-3.5 bg-zinc-200 dark:bg-zinc-800 rounded-full" />

                    {/* THREAD FOOTER AVATAR BUBBLE PREVIEW (If replies exist) */}
                    <div className="relative w-5 h-5 my-2 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-zinc-300 dark:bg-zinc-700 ring-2 ring-white dark:ring-black" />
                    </div>
                </div>

                {/* RIGHT COLUMN: MAIN CONTENT & ACTIONS */}
                <div className="flex-1 min-w-0 pb-1">

                    {/* HEADER: USERNAME & TIMESTAMP */}
                    <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center min-w-0">
                            <Link href={`/profile/${card?.email}`} className="font-semibold text-[14.5px] text-zinc-950 dark:text-zinc-50 hover:underline truncate cursor-pointer">
                                {card?.name}
                            </Link>
                        </div>
                        <div className="flex items-center gap-2 text-[14px] text-zinc-400 dark:text-zinc-500">
                            <span>2h</span>
                            {/* Threads Triple Dot Option */}
                            <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
                                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><circle cx="12" cy="12" r="1.75"></circle><circle cx="6" cy="12" r="1.75"></circle><circle cx="18" cy="12" r="1.75"></circle></svg>
                            </button>
                        </div>
                    </div>

                    {/* CONTENT TEXT */}
                    <div className="text-[14.5px] tracking-normal text-zinc-900 dark:text-zinc-100 mb-3 leading-normal whitespace-pre-wrap wrap-break-word">
                        {card.text || "No caption available"}
                    </div>

                    {/* MEDIA IMAGE */}
                    {card.image && (
                        <Link href={`/post/${card._id}`} className="block mb-3.5">
                            <div className="rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900 max-h-113 flex items-center justify-center">
                                <Image
                                    src={card.image}
                                    alt="Post content"
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover max-h-113"
                                    priority={false}
                                />
                            </div>
                        </Link>
                    )}

                    {/* ================= THREADS THIN LINE ACTION BAR ================= */}
                    <div className="flex flex-col gap-2.5 mt-2">

                        {/* COMPACT ICON GROUP */}
                        <div className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 -ml-2">

                            {/* LIKE BUTTON */}
                            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-150 active:scale-90 group">
                                <FiHeart className="text-[20px] stroke-2 group-hover:scale-105 transition-transform" />
                            </button>

                            {/* SHARE BUTTON */}
                            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-150 active:scale-90 group">
                                <FiSend className="text-[20px] stroke-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                    {/* ================================================================ */}

                </div>
            </div>
        </div>
    );
};

export default PostCard;