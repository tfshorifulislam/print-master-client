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

            <div className="flex gap-3">

                <div className="flex-1 min-w-0 pb-1">

                    {card.image && (
                        <Link href={`/post/${card._id}`} className="block mb-3.5">

                            <div className="w-full h-auto rounded-xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/80 bg-black flex items-center justify-center">

                                <Image
                                    src={card.image}
                                    alt="Post content"
                                    width={1200}
                                    height={1200}
                                    className="w-full h-full object-contain"
                                />

                            </div>

                        </Link>
                    )}

                </div>
            </div>
        </div>
    );
};

export default PostCard;