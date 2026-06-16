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

import { ProfilePostDelete } from "@/components/ProfilePostDelete";
import Link from "next/link";

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { data: session, isPending } = useSession();
    const user = session?.user;
    const currentUserEmail = user?.email;

    useEffect(() => {
        if (!user?.email) return;

        const fetchPosts = async () => {
            try {
                setLoading(true);

                const { data: token } = await authClient.token();

                const res = await axios.get(
                    `${process.env.NEXT_PUBLIC_AUTH_URL}/uploads`,
                    {
                        headers: {
                            authorization: `Bearer ${token.token}`,
                        },
                    }
                );

                const userPosts = res.data.filter(
                    (post) => post.email === currentUserEmail
                );

                setPosts(userPosts);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [user]);

    if (isPending || loading) {
        return <IsPendingLoading />;
    }

    const username = user?.email?.split("@")[0] || "user";

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

            {/* HEADER */}
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/70 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

                    <div>
                        <h1 className="text-xl font-semibold">
                            {user?.name || "User"}
                        </h1>
                        <p className="text-xs text-zinc-500">
                            {posts.length} posts
                        </p>
                    </div>

                    <button className="p-2 rounded-full border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
                        <FaEllipsis />
                    </button>

                </div>
            </div>

            {/* PROFILE HEADER */}
            <div className="max-w-6xl mx-auto px-4">

                {/* BANNER */}
                <div className="relative mt-4 aspect-[3/1] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    {user?.banner && (
                        <Image
                            src={user.banner}
                            alt="banner"
                            fill
                            className="object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* PROFILE INFO */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-10 px-2">

                    {/* LEFT */}
                    <div className="flex items-end gap-4">

                        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white dark:border-black overflow-hidden bg-zinc-200">
                            <Image
                                src={user?.image || "/avatar.jpg"}
                                alt="avatar"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold">
                                {user?.name}
                            </h2>

                            <p className="text-sm text-zinc-500">
                                @{username}
                            </p>

                            <p className="text-sm mt-2 text-zinc-600 dark:text-zinc-300 max-w-md">
                                {user?.bio || "Digital Creator ✨"}
                            </p>
                        </div>

                    </div>

                    {/* RIGHT ACTIONS */}
                    <div className="flex gap-3">

                        <button className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition">
                            Edit Profile
                        </button>

                        <button className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black text-sm font-medium hover:opacity-80 transition">
                            Share
                        </button>

                    </div>

                </div>

                {/* META INFO */}
                <div className="flex flex-wrap gap-4 mt-5 text-sm text-zinc-500">

                    <span className="flex items-center gap-2">
                        <FaLocationDot /> Global
                    </span>

                    <span className="flex items-center gap-2 hover:underline cursor-pointer">
                        <FaLink /> domain.com
                    </span>

                    <span className="flex items-center gap-2">
                        <FaCalendarDays /> Joined 2026
                    </span>

                </div>

                {/* STATS */}
                <div className="mt-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                    <span className="text-sm">
                        <b className="text-black dark:text-white">{posts.length}</b> Posts
                    </span>
                </div>

            </div>

            {/* POSTS GRID */}
            <div className="max-w-6xl mx-auto px-4 py-6">

                <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">

                    {[...posts].reverse().map((post) => (
                        <div
                            key={post._id}
                            className="group relative break-inside-avoid rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition"
                        >

                            <Link href={`/post/${post._id}`}>
                                <Image
                                    src={post.image}
                                    alt="post"
                                    width={600}
                                    height={600}
                                    className="w-full h-auto object-cover group-hover:scale-[1.03] transition duration-300"
                                />
                            </Link>

                            {/* DELETE */}
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                                <ProfilePostDelete
                                    postId={post._id}
                                    onDeleteSuccess={(id) => {
                                        setPosts((prev) =>
                                            prev.filter((p) => p._id !== id)
                                        );
                                    }}
                                />
                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default Profile;