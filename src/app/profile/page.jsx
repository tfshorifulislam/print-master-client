'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaTh, FaBookmark, FaUserEdit, FaShare } from 'react-icons/fa';
import { useSession } from "@/lib/auth-client";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("posts");
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <div className="min-h-screen bg-white">

            <div className="w-full max-w-3xl mx-auto pt-8 pb-20">

                {/* Profile Header - TikTok Style */}
                <div className="px-5">

                    <div className="flex gap-5">

                        {/* Avatar */}
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
                            <Image
                                src={user?.image || '/avatar.png'}
                                alt={user?.name || 'User'}
                                fill
                                className="rounded-full object-cover border-4 border-white shadow-md"
                            />
                        </div>

                        {/* User Info */}
                        <div className="flex-1 mt-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-black">
                                    {user?.name || "Username"}
                                </h1>
                            </div>

                            <p className="text-gray-500 mt-1">
                                @{user?.userName || "username"}
                            </p>

                            {/* Stats */}
                            <div className="flex gap-6 mt-5">
                                <div>
                                    <p className="font-semibold text-lg">{user?.post?.length || 0}</p>
                                    <p className="text-xs text-gray-500">Posts</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-lg">{user?.save?.length || 0}</p>
                                    <p className="text-xs text-gray-500">Saved</p>
                                </div>
                            </div>

                            {/* Bio */}
                            <p className="mt-4 text-[15px] text-gray-700 leading-relaxed">
                                {user?.bio || "This user has no bio yet."}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6">
                        <button className="flex-1 py-2.5 bg-black text-white font-medium rounded-full text-sm hover:bg-gray-800 transition">
                            Edit Profile
                        </button>
                        <button className="px-5 py-2.5 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                            <FaShare />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-10 border-b border-gray-200">
                    <div className="flex justify-center">

                        <button
                            onClick={() => setActiveTab("posts")}
                            className={`flex-1 max-w-[180px] py-4 flex items-center justify-center gap-2 font-medium transition-all border-b-2 ${activeTab === "posts"
                                    ? "border-black text-black"
                                    : "border-transparent text-gray-400"
                                }`}
                        >
                            <FaTh size={18} />
                            Posts
                        </button>

                        <button
                            onClick={() => setActiveTab("saved")}
                            className={`flex-1 max-w-[180px] py-4 flex items-center justify-center gap-2 font-medium transition-all border-b-2 ${activeTab === "saved"
                                    ? "border-black text-black"
                                    : "border-transparent text-gray-400"
                                }`}
                        >
                            <FaBookmark size={18} />
                            Saved
                        </button>

                    </div>
                </div>

                {/* Tab Content */}
                <div className="px-4 py-8">
                    {activeTab === "posts" && (
                        <div className="text-center text-gray-400 py-12">
                            Your Posts will appear here
                        </div>
                    )}

                    {activeTab === "saved" && (
                        <div className="text-center text-gray-400 py-12">
                            Your Saved items will appear here
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Profile;