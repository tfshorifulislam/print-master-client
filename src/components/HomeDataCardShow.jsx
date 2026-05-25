// HomeDataCardShow.jsx
import axios from "axios";
import React from "react";
import PostCard from "./PostCard";

const HomeDataCardShow = async () => {

    const res = await axios.get(`${process.env.API_URL}/uploads`);
    const data = res.data;

    return (
        <div className="w-[95%] mx-auto mt-6 columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">

            {
                data.map((card) => (
                    <PostCard
                        key={card._id}
                        card={card}
                    />
                ))
            }

        </div>
    );
};

export default HomeDataCardShow;