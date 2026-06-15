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
    FaEye
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
    }, [user, currentUserEmail]);

    if (isPending || loading) {
        return <IsPendingLoading />;
    }

    const username = user?.email?.split("@")[0] || "username";

    return (
        <div className="min-h-screen max-w-7xl mx-auto bg-[#07070a] text-zinc-100 transition-colors duration-300">

            {/* 🌌 FLOATING HEADER STICKY */}
            <div className="sticky top-0 z-40 backdrop-blur-md bg-[#07070a]/80 flex items-center justify-between h-16 px-4 sm:px-6 border-b border-zinc-900">
                <div className="flex flex-col">
                    <h1 className="text-base sm:text-lg font-bold tracking-tight text-white">
                        {user?.name || "User Workspace"}
                    </h1>
                    <span className="text-[11px] font-mono text-zinc-500 tracking-wide">
                        INDEXED: {posts.length} {posts.length === 1 ? "NODE" : "NODES"}
                    </span>
                </div>
                
                <span className="text-xs bg-zinc-900 text-zinc-400 font-mono px-3 py-1 rounded-md border border-zinc-800">
                    @{username}
                </span>
            </div>

            {/* 🎬 STUDIO HERO PROFILE BANNER */}
            <div className="relative">
                {/* BANNER CANVAS */}
                <div className="w-full aspect-[3.5/1] bg-zinc-950 relative overflow-hidden border-b border-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    {user?.banner ? (
                        <Image
                            src={user.banner}
                            alt="banner"
                            fill
                            className="object-cover opacity-75"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/20 via-zinc-950 to-zinc-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/20 to-transparent" />
                </div>

                {/* AVATAR + ACTIONS MATRIX */}
                <div className="px-4 sm:px-6 flex justify-between items-end relative -mt-16 sm:-mt-20 z-10">
                    {/* AVATAR */}
                    <div className="relative w-28 h-28 sm:w-36 sm:h-36">
                        <div className="absolute inset-0 rounded-[28px] border-[5px] border-[#07070a] overflow-hidden bg-zinc-900 shadow-2xl">
                            <Image
                                src={user?.image || "/avatar.jpg"}
                                alt="avatar"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <span className="absolute bottom-1 right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500"></span>
                        </span>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="mb-2 sm:mb-4 flex items-center gap-2.5">
                        <button className="p-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white rounded-xl transition-all duration-300">
                            <FaEllipsis className="w-4 h-4" />
                        </button>

                        <button className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 active:scale-95 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* 👤 CONTEXT BIO DATA */}
            <div className="px-4 sm:px-6 mt-6 max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{user?.name}</h2>

                <p className="mt-4 text-[14px] sm:text-[15px] leading-relaxed text-zinc-400 whitespace-pre-wrap font-light tracking-wide">
                    {user?.bio || "Digital Studio Architect · Curating immersive visual networks."}
                </p>

                {/* METADATA LINE BAR */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5 text-[12px] sm:text-[13px] text-zinc-500 font-medium">
                    <span className="flex items-center gap-1.5 bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-900">
                        <FaLocationDot className="text-purple-400" /> Distributed Node
                    </span>
                    <span className="flex items-center gap-1.5 text-purple-400 hover:text-purple-300 cursor-pointer bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-900 transition-colors">
                        <FaLink /> portfolio.network
                    </span>
                    <span className="flex items-center gap-1.5 bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-900">
                        <FaCalendarDays className="text-zinc-600" /> Active since 2026
                    </span>
                </div>
            </div>

            {/* 🗂️ IMMERSIVE MASONRY GRID (MATCHED WITH NEW POST CARD STRUCTURE) */}
            <div className="mt-12 border-t border-zinc-900 bg-[#0b0b0f] px-4 sm:px-6 pt-8 pb-20">
                <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {[...posts].reverse().map((post) => (
                        <div
                            key={post._id}
                            className="break-inside-avoid group relative w-full rounded-[20px] overflow-hidden bg-zinc-950 border border-zinc-900 shadow-lg transition-all duration-500 hover:translate-y-[-4px] hover:border-purple-500/40 hover:shadow-[0_20px_40px_rgba(147,51,234,0.1)]"
                        >
                            {/* CANVAS IMAGE */}
                            {post?.image && (
                                <div className="relative w-full h-auto">
                                    <Link href={`/post/${post._id}`} className="block relative">
                                        <img
                                            src={post.image}
                                            alt="Studio Asset"
                                            className="w-full h-auto object-cover block transition duration-700 group-hover:scale-[1.03]"
                                            loading="lazy"
                                        />
                                        {/* সিনেম্যাটিক অ্যাম্বিয়েন্ট ওভারলে */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                    
                                    {/* 🔮 INTERACTIVE HUD OVERLAY CONTAINER ON HOVER */}
                                    <div className="absolute inset-x-2.5 bottom-2.5 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/[0.06] opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none flex items-center justify-between gap-2">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-[11px] font-bold text-white truncate">
                                                {post.text || "Untitled Stream"}
                                            </p>
                                        </div>
                                        {/* ভিউজ মিটার */}
                                        <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-mono">
                                            <FaEye className="w-2.5 h-2.5 text-purple-400" />
                                            <span>{post.views || "1.2k"}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 🚨 SAFELY FLOATED ABSOLUTE DELETE TRIGGER */}
                            <div className="absolute top-2.5 right-2.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                                <div className="p-0.5 rounded-lg bg-black/60 backdrop-blur-sm border border-zinc-800">
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
                        </div>
                    ))}
                </div>

                {/* EMPTY STATE */}
                {posts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-zinc-600 font-mono text-xs tracking-widest uppercase">
                            No Workspace Nodes Available
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Profile;