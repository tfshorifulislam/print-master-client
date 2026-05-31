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
        <div className="relative border-x min-h-screen">

            {/* Cover */}
            <div className="h-52 bg-gradient-to-r from-zinc-800 via-zinc-700 to-black" />

            {/* Avatar + Button */}
            <div className="px-6">

                <div className="flex justify-between items-start">

                    <div className="-mt-16">
                        <Image
                            src={user?.image}
                            alt="user"
                            width={128}
                            height={128}
                            className="
                        rounded-full
                        border-4
                        border-white
                        dark:border-black
                        object-cover
                    "
                        />
                    </div>

                    <button
                        className="
                    mt-4
                    px-5
                    py-2
                    rounded-full
                    border
                    border-zinc-300
                    dark:border-zinc-700
                    hover:bg-zinc-100
                    dark:hover:bg-zinc-900
                    transition
                "
                    >
                        Edit Profile
                    </button>

                </div>

                {/* User Info */}
                <div className="mt-4">

                    <h1 className="text-2xl font-bold">
                        {user?.name}
                    </h1>

                    <p className="text-zinc-500">
                        @{user?.email?.split("@")[0]}
                    </p>

                    <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                        Building amazing projects 🚀
                    </p>

                    <div className="flex gap-6 mt-4 text-sm">

                        <div>
                            <span className="font-semibold">0</span>
                            <span className="ml-1 text-zinc-500">
                                Following
                            </span>
                        </div>

                        <div>
                            <span className="font-semibold">0</span>
                            <span className="ml-1 text-zinc-500">
                                Followers
                            </span>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;