"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { authClient, useSession } from "@/lib/auth-client";
import IsPendingLoading from "@/components/IsPendingLoading";

import {
    FaEllipsis,
    FaCalendarDays,
    FaLink,
    FaLocationDot,
} from "react-icons/fa6";

import {
    FiHeart,
    FiMessageCircle,
    FiRepeat,
    FiSend,
} from "react-icons/fi";

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { data: session, isPending } = useSession();
    const user = session?.user;

    const currentUserEmail = user?.email;
    console.log(currentUserEmail)

    useEffect(() => {
        if (!user?.email) return;

        const fetchPosts = async () => {
            try {
                setLoading(true);
                //client side get token
                const { data: token } = await authClient.token()
                // console.log(token)
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/uploads`, {
                    headers: {
                        authorization: `Bearer ${token.token}`
                    }
                });

                console.log('res', res)

                const userPosts = res.data.filter(
                    (post) => post.email === currentUserEmail
                );
                console.log(userPosts, 'post emai')

                setPosts(userPosts);
            } catch (err) {
                console.error(err);
                setError("Failed to load posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [user]);

    if (isPending || loading) {
        return <IsPendingLoading />;
    }

    const username = user?.email?.split("@")[0] || "username";

    const isOwnProfile = true;

    return (
        <div className="min-h-screen bg-white dark:bg-black">

            {/* TOP HEADER */}
            <div className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-black/80 flex items-center h-14 px-4 border-b border-zinc-200 dark:border-zinc-800 text-gray-900">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold leading-tight">
                        {user?.name || "User Name"}
                    </h1>
                    <span className="text-xs text-zinc-500">
                        {posts.length} Posts
                    </span>
                </div>
            </div>

            {/* HERO */}
            <div>

                {/* BANNER */}
                <div className="w-full aspect-3/1 bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                    {user?.banner && (
                        <Image
                            src={user.banner}
                            alt="banner"
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* AVATAR + ACTIONS */}
                <div className="px-4 flex justify-between relative">

                    {/* AVATAR */}
                    <div className="-mt-10 relative w-24 h-24 sm:w-32 sm:h-32">
                        <div className="absolute inset-0 rounded-full border-4 border-white dark:border-black overflow-hidden bg-black">
                            <Image
                                src={user?.image || "/avatar.jpg"}
                                alt="avatar"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-3 flex items-center gap-2">

                        <button className="p-2 border border-zinc-300 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
                            <FaEllipsis />
                        </button>

                        {isOwnProfile ? (
                            <button className="px-4 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900">
                                Edit Profile
                            </button>
                        ) : (
                            <>
                                <button className="px-4 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900">
                                    Message
                                </button>

                                <button className="px-4 py-1.5 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-bold hover:scale-105 transition">
                                    Follow
                                </button>
                            </>
                        )}

                    </div>
                </div>

                {/* INFO */}
                <div className="px-4 mt-3">

                    <h2 className="text-xl font-extrabold">
                        {user?.name}
                    </h2>

                    <span className="text-zinc-500 text-[15px]">
                        @{username}
                    </span>

                    <p className="mt-3 text-[15px] text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap">
                        {user?.bio || "Digital Creator 🎬 · Welcome to my profile ✨"}
                    </p>


                    <div className="flex flex-wrap gap-4 mt-3 text-[14px] text-zinc-500">

                        <span className="flex items-center gap-1">
                            <FaLocationDot /> Global
                        </span>

                        <span className="flex items-center gap-1 text-sky-500">
                            <FaLink /> domain.com
                        </span>

                        <span className="flex items-center gap-1">
                            <FaCalendarDays /> Joined 2026
                        </span>

                    </div>

                    {/* STATS */}
                    <div className="flex gap-6 mt-4 text-sm pb-4 text-gray-600 dark:text-gray-300">

                        <span>
                            <b className="text-gray-900 dark:text-white">{posts.length}</b>{" "}
                            Posts
                        </span>

                        {/* <span>
                            <b className="text-gray-900 dark:text-white">142</b>{" "}
                            Following
                        </span>

                        <span>
                            <b className="text-gray-900 dark:text-white">8.4K</b>{" "}
                            Followers
                        </span> */}

                    </div>

                </div>
            </div>

            {/* POSTS */}
            <div className="columns-2 gap-4 px-4 pb-10">
                {[...posts].reverse().map((post) => (
                    <div
                        key={post._id}
                        className="mb-4 break-inside-avoid"
                    >
                        {post?.image && (
                            <Image
                                src={post.image}
                                alt="post"
                                width={800}
                                height={800}
                                className="w-full h-auto object-cover rounded-xl"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;