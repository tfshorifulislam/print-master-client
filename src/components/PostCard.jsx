import Image from "next/image";
import Link from "next/link";
import {
    FaRegCommentDots,
    FaPaperPlane,
    FaRegHeart,
    FaRegBookmark
} from "react-icons/fa";

const PostCard = ({ card }) => {
    return (
        <div
            className="border-b  border-gray-100 dark:border-zinc-900 p-5 bg-white dark:bg-black hover:bg-gray-50/50 dark:hover:bg-zinc-950/40 transition-colors duration-300">
            {/* HEADER */}
            <div className="flex gap-3 items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-zinc-800" />
                <div>
                    <p className="font-semibold text-sm text-gray-950 dark:text-zinc-50">
                        User Name
                    </p>
                    <p className="text-xs text-gray-500 dark:text-zinc-500">
                        @username
                    </p>
                </div>
            </div>

            {/* TEXT & MEDIA */}
            <div>
                <p className="text-[15px] text-gray-800 dark:text-zinc-200 mb-3 leading-relaxed">
                    {card.text || "No caption available"}
                </p>

                {/* IMAGE */}
                <Link href={`/post/${card._id}`}>
                    {card.image && (
                        <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-900 shadow-sm">
                            <Image
                                src={card.image}
                                alt="post image"
                                width={800}
                                height={600}
                                className="w-full object-cover max-h-113 hover:scale-[1.01] transition-transform duration-500"
                            />
                        </div>
                    )}
                </Link>
            </div>

            {/* ================= RE-DESIGNED UNIQUE ACTION BAR ================= */}
            <div className="
                flex items-center justify-between mt-5 p-1.5
                bg-gray-50/80 dark:bg-zinc-900/30
                backdrop-blur-xl
                rounded-2xl
                border border-gray-200/50 dark:border-zinc-800/40
            ">
                {/* COMMENT BUTTON */}
                <button className="
                    flex items-center gap-2.5 px-4 py-2 rounded-xl
                    text-gray-600 dark:text-zinc-400
                    hover:text-blue-500 dark:hover:text-blue-400
                    hover:bg-blue-50 dark:hover:bg-blue-500/10
                    active:scale-95 hover:-translate-y-0.5
                    transition-all duration-200 group
                ">
                    <FaRegCommentDots className="text-lg transition-transform group-hover:rotate-6" />
                    <span className="text-xs font-bold tracking-wide">12</span>
                </button>

                {/* SHARE / SEND BUTTON */}
                <button className="
                    flex items-center gap-2.5 px-4 py-2 rounded-xl
                    text-gray-600 dark:text-zinc-400
                    hover:text-teal-500 dark:hover:text-teal-400
                    hover:bg-teal-50 dark:hover:bg-teal-500/10
                    active:scale-95 hover:-translate-y-0.5
                    transition-all duration-200 group
                ">
                    <FaPaperPlane className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    <span className="text-xs font-bold tracking-wide">4</span>
                </button>

                {/* LIKE BUTTON */}
                <button className="
                    flex items-center gap-2.5 px-4 py-2 rounded-xl
                    text-gray-600 dark:text-zinc-400
                    hover:text-rose-500 dark:hover:text-rose-400
                    hover:bg-rose-50 dark:hover:bg-rose-500/10
                    active:scale-95 hover:-translate-y-0.5
                    transition-all duration-200 group
                ">
                    <FaRegHeart className="text-base transition-transform group-hover:scale-110" />
                    <span className="text-xs font-bold tracking-wide">99</span>
                </button>

                {/* SAVE BUTTON */}
                <button className="
                    p-2.5 rounded-xl
                    text-gray-600 dark:text-zinc-400
                    hover:text-amber-500 dark:hover:text-amber-400
                    hover:bg-amber-50 dark:hover:bg-amber-500/10
                    active:scale-95 hover:-translate-y-0.5
                    transition-all duration-200 group
                ">
                    <FaRegBookmark className="text-base transition-transform group-hover:scale-105" />
                </button>
            </div>
            {/* ================================================================= */}
        </div>
    );
};

export default PostCard;