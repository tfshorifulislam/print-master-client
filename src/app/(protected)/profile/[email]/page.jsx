import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import {
    FaCalendarDays,
    FaLink,
    FaLocationDot,
    FaEllipsis
} from "react-icons/fa6";
import { FiHeart, FiMessageCircle, FiRepeat, FiSend } from 'react-icons/fi';

const Profile = async ({ params }) => {
    const { email } = await params;
    const decodedEmail = email ? decodeURIComponent(email).trim() : "";

    const session = await auth.api.getSession({
        headers: await headers()
    });
    const currentUserEmail = session?.user?.email;

    const userRes = await fetch(`${process.env.API_URL}/user/${decodedEmail}`, {
        cache: 'no-store'
    });

    const user = await userRes.json();

    const postsRes = await axios.get(`${process.env.API_URL}/uploads`);
    const allPosts = postsRes.data;

    const userPosts = allPosts.filter(post =>
        post.email === user.email && post.name === user.name
    );

    const username = user?.email ? user.email.split('@')[0] : 'username';
    const isOwnProfile = currentUserEmail === user?.email;

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white antialiased border-x border-zinc-200 dark:border-zinc-800 max-w-2xl mx-auto">

            {/* TOP HEADER */}
            <div className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-black/80 flex items-center h-14 px-4">
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold tracking-tight leading-tight">
                        {user?.name || "User Name"}
                    </h1>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {userPosts?.length || 0} Posts
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
                        />
                    )}
                </div>

                {/* AVATAR + ACTIONS (FIXED OVERLAP) */}
                <div className="px-4 relative flex justify-between">

                    {/* AVATAR FIX */}
                    <div className="relative -mt-10 w-24 h-24 sm:w-32 sm:h-32">
                        <div className="absolute inset-0 rounded-full border-4 border-white dark:border-black overflow-hidden">
                            <Image
                                src={user?.image || "/avatar.jpg"}
                                alt="avatar"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-3 flex items-center gap-2">

                        {!isOwnProfile && (
                            <button className="p-2 border border-zinc-300 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
                                <FaEllipsis />
                            </button>
                        )}

                        {isOwnProfile ? (
                            <button className="px-4 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-900">
                                Edit profile
                            </button>
                        ) : (
                            <>
                                <button className="px-4 py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-full text-sm font-bold">
                                    Message
                                </button>
                                <button className="px-4 py-1.5 bg-black text-white dark:bg-white dark:text-black rounded-full text-sm font-bold">
                                    Follow
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* USER INFO */}
                <div className="px-4 mt-2">

                    <h2 className="text-xl font-extrabold">
                        {user?.name}
                    </h2>

                    <span className="text-zinc-500 text-[15px]">
                        @{username}
                    </span>

                    <p className="mt-3 text-[15px] text-zinc-900 dark:text-zinc-100 whitespace-pre-wrap">
                        {user?.bio || "Digital Creator 🎬 · Welcome to my profile ✨"}
                    </p>

                    {/* META */}
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
                    <div className="flex gap-5 mt-3 text-[14px] text-zinc-500 pb-4">
                        <span>
                            <b className="text-black dark:text-white">{userPosts.length}</b> Posts
                        </span>
                        <span>
                            <b className="text-black dark:text-white">142</b> Following
                        </span>
                        <span>
                            <b className="text-black dark:text-white">8.4K</b> Followers
                        </span>
                    </div>

                </div>
            </div>

            {/* TAB */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 text-center py-3 font-semibold">
                Posts
            </div>

            {/* POSTS */}
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">

                {userPosts?.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500">
                        No posts yet
                    </div>
                ) : (
                    userPosts.map((post) => (
                        <div key={post._id} className="p-4">

                            <div className="flex gap-3">

                                {/* avatar */}
                                <div className="w-10 h-10 relative rounded-full overflow-hidden">
                                    <Image
                                        src={user?.image || "/avatar.jpg"}
                                        alt="user"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* content */}
                                <div className="flex-1">

                                    <div className="flex gap-2 text-[15px]">
                                        <span className="font-bold">{user?.name}</span>
                                        <span className="text-zinc-500">@{username}</span>
                                        <span className="text-zinc-500">· 2h</span>
                                    </div>

                                    <p className="mt-1 text-[15px]">
                                        {post.text}
                                    </p>

                                    {post.image && (
                                        <div className="mt-3 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
                                            <Image
                                                src={post.image}
                                                alt="post"
                                                width={800}
                                                height={500}
                                                className="w-full object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* ===== THREADS THIN LINE ACTION BAR ====== */}
                                    <div className="flex flex-col gap-2.5 mt-2">

                                        {/* COMPACT ICON GROUP */}
                                        <div className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 -ml-2">

                                            {/* LIKE BUTTON */}
                                            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-150 active:scale-90 group">
                                                <FiHeart className="text-[20px] stroke-2 group-hover:scale-105 transition-transform" />
                                            </button>

                                            {/* SHARE BUTTON */}
                                            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-150 active:scale-90 group">
                                                <FiSend className="text-[20px] stroke-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                    {/* ================== */}

                                </div>
                            </div>

                        </div>
                    ))
                )}

            </div>

        </div>
    );
};

export default Profile;