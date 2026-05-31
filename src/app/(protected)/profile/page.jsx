'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { FaTh, FaBookmark, FaShare } from 'react-icons/fa';
import { useSession } from "@/lib/auth-client";
import { motion } from "framer-motion";
import Link from 'next/link';

const Profile = () => {
    const [activeTab, setActiveTab] = useState("posts");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const { data: session, isPending } = useSession();
    const user = session?.user;

    // ---------------- FETCH POSTS ----------------
    useEffect(() => {

        if (!user?.id) return;

        const fetchPosts = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    `http://localhost:5000/uploads/user/${user.id}`
                );

                setPosts(res.data);

            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();

    }, [user]);

    // ---------------- LOADING ----------------
    if (isPending || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
                <p className="animate-pulse text-sm tracking-widest">
                    LOADING PROFILE...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">

            {/* CONTAINER */}
            <div className="max-w-6xl mx-auto">

                {/* PROFILE HEADER */}
                <div className="px-4 md:px-10 pt-10 pb-8 border-b border-black/10 dark:border-white/10">

                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

                        <div className="relative w-25 h-25 shrink-0 overflow-hidden rounded-full">
                            <Image
                                src={user?.image || '/avatar.jpg'}
                                alt="user"
                                fill
                                priority
                                quality={100}
                                sizes="(max-width: 768px) 112px, 160px"
                                className="object-cover"
                            />
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="flex-1 w-full">

                            {/* TOP */}
                            <div className="flex flex-col md:flex-row md:items-center gap-4">

                                <h1 className="text-2xl font-light tracking-wide">
                                    {user?.name}
                                </h1>

                                <div className="flex gap-3">

                                    <button className="
                                bg-black 
                                dark:bg-white 
                                text-white 
                                dark:text-black 
                                px-5 
                                py-2 
                                rounded-lg 
                                text-sm 
                                font-medium 
                                hover:opacity-90 
                                transition
                            ">
                                        Edit Profile
                                    </button>

                                    <button className="
                                w-10 
                                h-10 
                                border 
                                border-black/10 
                                dark:border-white/20 
                                rounded-lg 
                                flex 
                                items-center 
                                justify-center 
                                hover:bg-black 
                                hover:text-white
                                dark:hover:bg-white 
                                dark:hover:text-black 
                                transition
                            ">
                                        <FaShare size={14} />
                                    </button>

                                </div>

                            </div>

                            {/* USERNAME */}
                            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                                @{user?.userName || "username"}
                            </p>

                            {/* STATS */}
                            <div className="flex items-center gap-8 mt-6">

                                <div>
                                    <span className="font-bold text-lg">
                                        {posts.length}
                                    </span>

                                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                                        posts
                                    </span>
                                </div>

                                <div>
                                    <span className="font-bold text-lg">
                                        {user?.save?.length || 0}
                                    </span>

                                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                                        saved
                                    </span>
                                </div>

                            </div>

                            {/* BIO */}
                            <div className="mt-5 max-w-md">
                                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {user?.bio || "No bio added yet."}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* TABS */}
                <div className="relative flex items-center justify-center gap-4 sm:gap-12 border-b border-black/10 dark:border-white/10">

                    <button
                        onClick={() => setActiveTab("posts")}
                        className={`relative flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-[3px] transition-colors duration-200 ${activeTab === "posts"
                            ? "text-white dark:text-black"
                            : "text-gray-500 hover:text-black dark:hover:text-white"
                            }`}
                    >

                        {activeTab === "posts" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-black dark:bg-white rounded-t-md"
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                }}
                            />
                        )}

                        <span className="relative z-10 flex items-center gap-2">
                            <FaTh size={12} />
                            Posts
                        </span>

                    </button>

                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`relative flex items-center gap-2 px-4 py-3 text-xs uppercase tracking-[3px] transition-colors duration-200 ${activeTab === "saved"
                            ? "text-white dark:text-black"
                            : "text-gray-500 hover:text-black dark:hover:text-white"
                            }`}
                    >

                        {activeTab === "saved" && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-black dark:bg-white rounded-t-md"
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 30,
                                }}
                            />
                        )}

                        <span className="relative z-10 flex items-center gap-2">
                            <FaBookmark size={12} />
                            Saved
                        </span>

                    </button>

                </div>

                {/* POSTS GRID */}
                <div className="py-1">

                    {activeTab === "posts" && (

                        posts.length === 0 ? (

                            <div className="h-[400px] flex items-center justify-center">
                                <p className="text-gray-500 text-sm">
                                    No posts yet
                                </p>
                            </div>

                        ) : (

                            <div className="grid grid-cols-3 md:grid-cols-4 gap-[2px] md:gap-1">

                                {posts.map((post) => (

                                    <Link
                                        href={`/post/${post._id}`}
                                        key={post._id}
                                        className="
                                    relative 
                                    aspect-square 
                                    overflow-hidden 
                                    group 
                                    bg-gray-100 
                                    dark:bg-neutral-900
                                "
                                    >

                                        <Image
                                            src={post.image}
                                            alt="post"
                                            fill
                                            sizes="33vw"
                                            className="object-cover group-hover:scale-110 transition duration-500"
                                        />

                                        {/* OVERLAY */}
                                        <div
                                            className="absolute inset-0  bg-black/0  group-hover:bg-black/40 transition duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div
                                                className="text-center text-white">
                                                <p
                                                    className="font-semibold text-sm">
                                                    View
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )
                    )}

                    {/* SAVED */}
                    {activeTab === "saved" && (
                        <div className="h-100 flex items-center justify-center">
                            <p className="text-gray-500 text-sm">
                                Saved items will appear here
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Profile;