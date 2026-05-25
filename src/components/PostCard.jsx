import Image from "next/image";

const PostCard = ({ card }) => {
    return (
        <div className="group relative overflow-hidden rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 break-inside-avoid">
            
            {/* Main Image */}
            <div className="relative w-full aspect-square">
                <Image
                    src={card.image}
                    alt={card.text || "post"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Subtle Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Optional Save Button on Hover (Pinterest Feel) */}
            <button className="absolute top-4 right-4 bg-white text-black text-sm font-semibold px-5 py-2 rounded-3xl shadow-md opacity-0 group-hover:opacity-100 hover:bg-[#0055ff] hover:text-white transition-all duration-200 active:scale-95">
                Save
            </button>
        </div>
    );
};

export default PostCard;