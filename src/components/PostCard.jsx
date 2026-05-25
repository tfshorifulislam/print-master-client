// PostCard.jsx
import Image from "next/image";
import { FaHeart } from "react-icons/fa";

const PostCard = ({ card }) => {
    return (
        <div className="group relative  break-inside-avoid mb-3 overflow-hidden cursor-pointer">

            {/* Image Wrapper */}
            <div className="relative w-full">

                <Image
                    src={card.image}
                    alt={card.text || "post"}
                    width={500}
                    height={700}
                    className="w-full h-auto object-cover rounded-sm transition duration-500 group-hover:brightness-90"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />

                {/* Save Button */}
                <button className="absolute top-4 right-4 bg-red-600 text-white px-5 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-red-700">
                    Save
                </button>

                {/* Bottom Actions */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition duration-300">

                    <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-full text-xs font-medium truncate max-w-[70%]">
                        {card.text || "Creative Design"}
                    </div>

                    <button className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition">
                        <FaHeart size={14} />
                    </button>

                </div>
            </div>
        </div>
    );
};

export default PostCard;