import React from "react";
import PostCard from "./PostCard";
import LogoCenter from "./LogoCenter";

const HomeDataCardShow = async () => {
    const res = await fetch(`${process.env.API_URL}/uploads`, {
        cache: "no-store",
    });

    const data = await res.json();

    return (
        <div className="border-b max-w-xl mx-auto">
            <LogoCenter />

            {/* FEED CONTAINER */}
            <div className="border-x">
                {data?.reverse()?.map((card) => (
                    <PostCard key={card._id} card={card} />
                ))}
            </div>
        </div>
    );
};

export default HomeDataCardShow;