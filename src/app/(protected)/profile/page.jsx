'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useSession } from "@/lib/auth-client";
import IsPendingLoading from '@/components/IsPendingLoading';
import { 
    FaRegComment, 
    FaRetweet, 
    FaRegHeart, 
    FaRegBookmark, 
    FaArrowUpFromBracket,
    FaEllipsis 
} from "react-icons/fa6";
import { FaCalendarDays, FaLink, FaLocationDot } from "react-icons/fa6";

const Profile = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { data: session, isPending } = useSession();
    const user = session?.user;

    useEffect(() => {
        if (!user?.email) return;

        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);

                // ✅ Use NEXT_PUBLIC_ prefix
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

                const res = await axios.get(`${apiUrl}/uploads`);

                const userPosts = res.data.filter(post => 
                    post.email === user.email && 
                    post.name === user.name
                );

                setPosts(userPosts);
            } catch (err) {
                console.error("Axios Error:", err);
                setError(err.response?.status === 404 
                    ? "API endpoint not found. Check your backend URL." 
                    : "Failed to load posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [user]);

    if (isPending || loading) {
        return <IsPendingLoading />;
    }

    const username = user?.email ? user.email.split('@')[0] : 'username';

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white border-x border-zinc-200 dark:border-zinc-800 max-w-2xl mx-auto">

            {/* Sticky Header */}
            <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-zinc-200 dark:border-zinc-800 h-14 flex items-center px-4">
                <div>
                    <h1 className="font-bold text-xl">{user?.name}</h1>
                    <p className="text-xs text-zinc-500 -mt-1">{posts.length} Posts</p>
                </div>
            </div>

            {/* Banner */}
            <div className="h-52 bg-gradient-to-r from-zinc-800 to-black relative">
                {user?.banner && (
                    <Image src={user.banner} alt="banner" fill className="object-cover" />
                )}
            </div>

            {/* Avatar + Button */}
            <div className="px-4 flex justify-between items-start -mt-14 relative z-10">
                <div className="w-28 h-28 rounded-full border-[4px] border-white dark:border-black overflow-hidden bg-zinc-200">
                    <Image
                        src={user?.image || "/avatar.jpg"}
                        alt={user?.name}
                        width={112}
                        height={112}
                        className="object-cover"
                    />
                </div>

                <button className="mt-4 px-6 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 font-bold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900">
                    Edit Profile
                </button>
            </div>

            {/* User Information */}
            <div className="px-4 mt-3">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-zinc-500">@{username}</p>

                <p className="mt-3 text-[15px] leading-relaxed">
                    {user?.bio || "Building amazing projects 🚀 | Full Stack Developer"}
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-[15px] text-zinc-500">
                    <span className="flex items-center gap-1"><FaLocationDot /> Bangladesh</span>
                    <span className="flex items-center gap-1"><FaLink className="text-sky-500" /> yoursite.com</span>
                    <span className="flex items-center gap-1"><FaCalendarDays /> Joined May 2025</span>
                </div>

                <div className="flex gap-6 mt-4 text-[15px]">
                    <div><span className="font-bold">142</span><span className="text-zinc-500 ml-1">Following</span></div>
                    <div><span className="font-bold">8.4K</span><span className="text-zinc-500 ml-1">Followers</span></div>
                </div>
            </div>

            {/* Tab */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 mt-6">
                <div className="text-center py-4 font-bold border-b-4 border-black dark:border-white w-fit mx-auto">
                    Posts
                </div>
            </div>

            {/* Posts */}
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {error && <div className="text-red-500 text-center py-10">{error}</div>}

                {posts.length === 0 && !error ? (
                    <div className="text-center py-20 text-zinc-500">No posts yet</div>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-950/50 transition">
                            <div className="flex gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                    <Image
                                        src={user?.image || "/avatar.jpg"}
                                        alt="avatar"
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold">{user?.name}</span>
                                        <span className="text-zinc-500">@{username}</span>
                                        <span className="text-zinc-500">· 2h</span>
                                        <FaEllipsis className="ml-auto cursor-pointer" />
                                    </div>

                                    <p className="text-[15px] mt-1 leading-normal">{post.text}</p>

                                    {post.image && (
                                        <div className="mt-3 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-700">
                                            <Image
                                                src={post.image}
                                                alt="post"
                                                width={700}
                                                height={450}
                                                className="w-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="flex justify-between max-w-md mt-4 text-zinc-500">
                                        <button className="flex items-center gap-2 hover:text-sky-500"><FaRegComment size={19} /> <span>{post.comments || 0}</span></button>
                                        <button className="flex items-center gap-2 hover:text-green-500"><FaRetweet size={19} /></button>
                                        <button className="flex items-center gap-2 hover:text-pink-500"><FaRegHeart size={19} /> <span>{post.likes || 0}</span></button>
                                        <button className="hover:text-sky-500"><FaRegBookmark size={19} /></button>
                                        <button className="hover:text-sky-500"><FaArrowUpFromBracket size={19} /></button>
                                    </div>
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