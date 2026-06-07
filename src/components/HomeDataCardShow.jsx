import React from "react";
import PostCard from "./PostCard";
import LogoCenter from "./LogoCenter";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const HomeDataCardShow = async () => {
    // server side get token
    const token = await auth.api.getToken({
        headers: await headers()
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/uploads`, {
        cache: "no-store",
        headers: {
            authorization: `Bearer ${token.token}`
        }
    });

    const data = await res.json();

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <LogoCenter />

            {/* CONTRA & BEHANCE INSPIRATIONAL 2-COLUMN GRID */}
            <div className="grid grid-cols-2 gap-x-2 sm:gap-x-8  gap-y-5 sm:gap-y-10 mt-8">
                {data?.map((card) => (
                    <PostCard key={card._id} card={card} />
                ))}
            </div>
        </div>
    );
};

export default HomeDataCardShow;