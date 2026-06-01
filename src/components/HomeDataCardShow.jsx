import React from "react";
import PostCard from "./PostCard";
import LogoCenter from "./LogoCenter";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const HomeDataCardShow = async () => {

    //server side get token
    const token = await auth.api.getToken({
        headers: await headers()
    })


    const res = await fetch(`${process.env.API_URL}/uploads`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token.token}`
        }
    });

    const data = await res.json();

    return (
        <div className="border-b max-w-xl mx-auto">
            <LogoCenter />

            {/* FEED CONTAINER */}
            <div className="border-x grid grid-cols-2">
                {data?.reverse()?.map((card) => (
                    <PostCard key={card._id} card={card} />
                ))}
            </div>
        </div>
    );
};

export default HomeDataCardShow;