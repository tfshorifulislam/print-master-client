import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import { FaTh, FaHeart, FaComment, FaEllipsisH } from 'react-icons/fa';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

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

    if (!userRes.ok) {
        return (
            <div className="h-screen flex items-center justify-center text-gray-500 font-medium">
                User not found or error loading profile.
            </div>
        );
    }
    const user = await userRes.json();

    const postsRes = await axios.get(`${process.env.API_URL}/uploads`);
    const allPosts = postsRes.data;

    const userPosts = allPosts.filter(post =>
        post.email === user.email && post.name === user.name
    );

    const username = user?.email ? user.email.split('@')[0] : 'username';
    const isOwnProfile = currentUserEmail === user?.email;

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white antialiased">
            <div className="max-w-6xl mx-auto px-4 pt-6 md:pt-12">

                {/* PROFILE HEADER SECTION */}
                <div className="flex flex-row items-center justify-start gap-6 md:gap-16 pb-8 md:pb-12 border-b border-gray-200 dark:border-zinc-800">
                    
                    {/* AVATAR CONTAINER */}
                    <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 overflow-hidden rounded-full border border-gray-200 dark:border-zinc-800 shrink-0">
                        <Image
                            src={user?.image || '/avatar.jpg'}
                            alt={`${user?.name}'s profile`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* USER DETAILS */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 mb-4">
                            <h2 className="text-xl font-normal truncate max-w-[200px] sm:max-w-xs md:max-w-sm">
                                {username}
                            </h2> 

                            <div className="flex items-center gap-2 sm:gap-3">
                                {isOwnProfile ? (
                                    <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-sm font-semibold rounded-lg transition cursor-pointer">
                                        Edit Profile
                                    </button>
                                ) : (
                                    <>
                                        <button className="px-5 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition cursor-pointer">
                                            Follow
                                        </button>
                                        <button className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-sm font-semibold rounded-lg transition cursor-pointer">
                                            Message
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition text-lg cursor-pointer">
                                            <FaEllipsisH />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* STATS & BIO (DESKTOP / TABLET VIEW) */}
                        <div className="hidden sm:block text-sm space-y-3">
                            <div className="text-base">
                                <span className="font-semibold">{userPosts.length}</span> posts
                            </div>
                            <h1 className="font-semibold text-base">{user?.name}</h1>
                            <p className="text-gray-600 dark:text-zinc-400 whitespace-pre-wrap leading-relaxed">
                                {user?.bio || "Digital Creator 🎬\nWelcome to my official profile ✨"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* BIO & STATS (MOBILE ONLY VIEW) */}
                <div className="block sm:hidden text-sm space-y-2 py-4 border-b border-gray-100 dark:border-zinc-900">
                    <h1 className="font-semibold text-base">{user?.name}</h1>
                    <p className="text-gray-600 dark:text-zinc-400 whitespace-pre-wrap leading-relaxed">
                        {user?.bio || "Digital Creator 🎬\nWelcome to my official profile ✨"}
                    </p>
                    <div className="text-sm pt-2 border-t border-gray-100 dark:border-zinc-900 mt-2">
                        <span className="font-semibold">{userPosts.length}</span> posts
                    </div>
                </div>

                {/* TABS HEADER */}
                <div className="flex justify-center uppercase tracking-widest text-xs font-semibold py-4">
                    <div className="flex items-center gap-1.5 text-black dark:text-white border-t border-black dark:border-white pt-4 -mt-4">
                        <FaTh className="text-[10px]" />
                        <span>Posts</span>
                    </div>
                </div>

                {/* POSTS GRID */}
                {userPosts.length === 0 ? (
                    <div className="h-64 flex flex-col items-center justify-center text-gray-400 gap-2">
                        <div className="p-4 border-2 border-gray-300 dark:border-zinc-700 rounded-full">
                            <FaTh className="text-3xl" />
                        </div>
                        <span className="text-lg font-semibold mt-2">No Posts Yet</span>
                    </div>
                ) : (
                    /* 🎯 ফিক্সড রেসপন্সিভ গ্রিড: মোবাইলে ৩ কলাম (Instagram-like), ট্যাবে ৪ কলাম, ডেক্সটপে ৫ কলাম */
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 md:gap-4 pb-12">
                        {userPosts.map((post) => (
                            <Link
                                href={`/post/${post._id}`}
                                key={post._id}
                                className="group relative aspect-square w-full bg-gray-100 dark:bg-zinc-900 overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={post.image || '/placeholder.jpg'}
                                    alt="User post"
                                    fill
                                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                                    className="object-cover transition duration-300 group-hover:scale-105"
                                />

                                {/* HOVER OVERLAY */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-200 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-white font-semibold text-xs sm:text-base md:text-lg p-1 text-center">
                                    <div className="flex items-center gap-1.5">
                                        <FaHeart className="text-xs sm:text-base" />
                                        <span>{post.likes || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FaComment className="text-xs sm:text-base" />
                                        <span>{post.comments || 0}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;