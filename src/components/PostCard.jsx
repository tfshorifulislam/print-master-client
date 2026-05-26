import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

const PostCard = ({ card }) => {
    return (
        <div className="relative break-inside-avoid overflow-hidden mb-3 group">

            {/* IMAGE LINK ONLY */}
            <Link href={`/post/${card._id}`} className="block relative">

                <Image
                    src={card.image}
                    alt={card.text || "post"}
                    width={500}
                    height={700}
                    className="w-full h-auto object-cover rounded-md transition group-hover:brightness-90"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />

                {/* bottom text */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition flex justify-between items-center">
                    <p className="bg-white/90 px-3 py-1 rounded-full text-xs truncate max-w-[70%]">
                        {card.text || "Creative Design"}
                    </p>

                    <div className="bg-white w-9 h-9 rounded-full flex items-center justify-center">
                        <FaHeart size={14} />
                    </div>
                </div>

            </Link>

            {/* SAVE BUTTON (OUTSIDE LINK) */}
            <button className="absolute top-3 right-3 bg-[#0055ff] text-white px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition">
                Save
            </button>

        </div>
    );
};

export default PostCard;