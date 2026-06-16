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
    const [error, setError] = useState("");

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

    return (
        <div className="min-h-screen max-w-6xl mx-auto bg-white dark:bg-black text-black dark:text-white">

            {/* HEADER */}
            <div className="sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-black/95 flex items-center h-14 px-4 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold">
                        {user?.name || "User Name"}
                    </h1>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {posts.length} {posts.length === 1 ? "Post" : "Posts"}
                    </span>
                </div>
            </div>

            {/* HERO */}
            <div>
                {/* BANNER */}
                <div className="w-full aspect-[3/1] bg-zinc-200 dark:bg-zinc-800 relative overflow-hidden">
                    {user?.banner && (
                        <Image
                            src={user.banner}
                            alt="banner"
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* AVATAR + ACTIONS */}
                <div className="px-4 flex justify-between relative -mt-12 sm:-mt-16">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                        <div className="absolute inset-0 rounded-full border-4 border-white dark:border-black overflow-hidden bg-zinc-900 shadow-sm">
                            <Image
                                src={user?.image || "/avatar.jpg"}
                                alt="avatar"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    <div className="mt-14 sm:mt-18 flex items-center gap-2">
                        <button className="p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            <FaEllipsis className="w-4 h-4" />
                        </button>

                        <button className="px-5 py-2 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                            Edit Profile
                        </button>
                    </div>
                </div>

                {/* USER INFO */}
                <div className="px-4 mt-3">
                    <h2 className="text-2xl font-bold tracking-tight">{user?.name}</h2>

                    <span className="text-zinc-500 dark:text-zinc-400 text-[15px]">
                        @{username}
                    </span>

                    <p className="mt-3 text-[15px] leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap">
                        {user?.bio || "Digital Creator 🎬 · Welcome to my profile ✨"}
                    </p>

                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 text-[14px] text-zinc-500 dark:text-zinc-400">
                        <span className="flex items-center gap-1.5">
                            <FaLocationDot className="text-zinc-400" /> Global
                        </span>
                        <span className="flex items-center gap-1.5 text-sky-500 hover:underline cursor-pointer">
                            <FaLink /> domain.com
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FaCalendarDays className="text-zinc-400" /> Joined 2026
                        </span>
                    </div>

                    <div className="flex gap-6 mt-4 text-sm pb-5 border-b border-zinc-100 dark:border-zinc-900">
                        <span>
                            <b className="text-black dark:text-white font-bold">
                                {posts.length}
                            </b>{" "}
                            Posts
                        </span>
                    </div>
                </div>
            </div>

            {/* POSTS GRID UPDATE */}
            {/* columns-2 থেকে sm:columns-4 ব্যবহার করা হয়েছে যেন মোবাইল স্ক্রিনে ২টা এবং বড় স্ক্রিনে ৪টা কলামে Masonry লেআউট তৈরি হয় */}
            <div className="columns-2 sm:columns-4 gap-3 sm:gap-4 px-4 pt-5 pb-10">
                {[...posts].reverse().map((post) => (
                    <div
                        key={post._id}
                        className="mb-3 sm:mb-4 break-inside-avoid group relative rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-900/50 hover:shadow-md transition-all duration-300"
                    >
                        {post?.image && (
                            <Link
                                href={`/post/${post._id}`}
                                className="block relative overflow-hidden"
                            >
                                <Image
                                    src={post.image}
                                    alt="post"
                                    width={500} // Masonry গ্রিডের জন্য ৮০০-র চেয়ে ৫০০ উইডথ বেশি অপ্টিমাইজড ও ফাস্ট লোড হবে
                                    height={500}
                                    className="w-full h-auto object-cover block group-hover:scale-[1.02] transition-transform duration-300"
                                />
                            </Link>
                        )}

                        {/* DELETE BUTTON */}
                        <div className="absolute top-2 right-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
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
    );
};

export default Profile;