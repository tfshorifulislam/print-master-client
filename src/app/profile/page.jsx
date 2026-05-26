'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { FaTh, FaBookmark, FaShare } from 'react-icons/fa';
import { useSession } from "@/lib/auth-client";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("posts");

    const { data: session, isPending } = useSession();
    const user = session?.user;

  


    return (
        <div className="min-h-screen bg-white">

            <div className="w-full max-w-3xl mx-auto pt-8 pb-20">

                {/* PROFILE HEADER */}
                <div className="px-5 flex gap-5">

                    <div className="relative w-24 h-24">
                        <Image
                            src={user?.image || '/avatar.jpg'}
                            alt="user"
                            fill
                            className="rounded-full object-cover border-4 border-white shadow"
                        />
                    </div>

                    <div className="flex-1">

                        <h1 className="text-2xl font-bold">
                            {user?.name}
                        </h1>

                        <p className="text-gray-500">
                            @{user?.userName || "username"}
                        </p>

                        <p className="text-sm text-gray-700 mt-2">
                            {user?.bio || "No bio yet"}
                        </p>

                        <div className="flex gap-6 mt-4">
                            <div>
                                <p className="font-bold">
                                    {/* {userPosts?.length || 0} */}
                                    </p>
                                <p className="text-xs text-gray-500">Posts</p>
                            </div>

                            <div>
                                <p className="font-bold">{user?.save?.length || 0}</p>
                                <p className="text-xs text-gray-500">Saved</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-6 px-5">
                    <button className="flex-1 bg-black text-white py-2 rounded-full">
                        Edit Profile
                    </button>

                    <button className="px-4 border rounded-full">
                        <FaShare />
                    </button>
                </div>

                {/* TABS */}
                <div className="mt-8 border-b flex justify-center gap-10">

                    <button
                        onClick={() => setActiveTab("posts")}
                        className={`py-3 flex items-center gap-2 border-b-2 ${
                            activeTab === "posts"
                                ? "border-black text-black"
                                : "border-transparent text-gray-400"
                        }`}
                    >
                        <FaTh /> Posts
                    </button>

                    <button
                        onClick={() => setActiveTab("saved")}
                        className={`py-3 flex items-center gap-2 border-b-2 ${
                            activeTab === "saved"
                                ? "border-black text-black"
                                : "border-transparent text-gray-400"
                        }`}
                    >
                        <FaBookmark /> Saved
                    </button>

                </div>

                {/* CONTENT */}
                <div className="px-4 py-8">

                    {/* POSTS TAB */}
                    {/* {activeTab === "posts" && (
                        userPosts.length === 0 ? (
                            <p className="text-center text-gray-400 py-10">
                                No posts found
                            </p>
                        ) : (
                            <div className="columns-2 sm:columns-3 gap-3 space-y-3">
                                {userPosts.map((post) => (
                                    <div key={post._id} className="break-inside-avoid">
                                        <Image
                                            src={post.image}
                                            alt="post"
                                            width={500}
                                            height={700}
                                            className="rounded-lg w-full h-auto"
                                        />
                                    </div>
                                ))}
                            </div>
                        )
                    )} */}

                    {/* SAVED TAB */}
                    {activeTab === "saved" && (
                        <p className="text-center text-gray-400 py-10">
                            Saved items will appear here
                        </p>
                    )}

                </div>

            </div>
        </div>
    );
};

export default Profile;