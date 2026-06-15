import { auth } from "@/lib/auth";
import axios from "axios";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@heroui/react";

const PostDetails = async ({ params }) => {
    const { id } = await params;

    // ১. সার্ভার সাইড টোকেন ফেচ
    const token = await auth.api.getToken({
        headers: await headers()
    });

    // ২. সিঙ্গেল পোস্ট ডেটা ফেচ
    let post = null;
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_AUTH_URL}/uploads/${id}`,
            {
                headers: {
                    authorization: `Bearer ${token?.token}`
                }
            }
        );
        post = res.data;
    } catch (error) {
        console.error("Error fetching single post:", error);
    }

    // ৩. সেশন ইউজার ফেচ
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;

    const isOwnProfile = user && post && user.email === post.email;

    // ৪. ক্রিয়েটরের অন্যান্য পোস্ট ফেচ
    let userPosts = [];
    if (post?.email) {
        try {
            const postsRes = await axios.get(
                `${process.env.NEXT_PUBLIC_AUTH_URL}/uploads`,
                {
                    headers: {
                        authorization: `Bearer ${token?.token}`
                    }
                }
            );
            userPosts = postsRes.data?.filter((p) => p.email === post.email) || [];
        } catch (error) {
            console.error("Error fetching user posts:", error);
        }
    }

    // ৫. ক্লাউডিনারি ফোর্স ডাউনলোড ইউআরএল লজিক
    let downloadUrl = post?.image || "#";
    if (downloadUrl && downloadUrl.includes("res.cloudinary.com")) {
        downloadUrl = downloadUrl.replace("/upload/", "/upload/fl_attachment/");
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <p className="text-zinc-400 font-medium animate-pulse">Loading post workspace...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
            
            {/* মেইন কনটেন্ট র্যাপার - Behance স্টাইল ফ্লুইড লেআউট */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
                
                {/* 🌟 NEW STRUCTURE: STUDIO WORKSPACE LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* LEFT SIDE: IMMERSIVE ARTWORK VIEWER (7 Columns) */}
                    <div className="lg:col-span-7 xl:col-span-8 w-full">
                        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.02)] dark:shadow-black/20 group/viewer">
                            {post?.image && (
                                <div className="p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[50vh] lg:min-h-[75vh]">
                                    <Image
                                        src={post.image}
                                        alt={post?.text || "Creative showcase"}
                                        width={1600}
                                        height={1200}
                                        priority
                                        className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.04)] dark:shadow-black/40 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/viewer:scale-[1.01]"
                                    />
                                </div>
                            )}
                            {/* আর্টওয়ার্কের ওপর হালকা গ্লস ফিনিশ */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.02] via-transparent to-white/[0.02] pointer-events-none" />
                        </div>
                    </div>

                    {/* RIGHT SIDE: INSIGHTS & ACTIONS PANEL (5 Columns) - Sticky Enabled */}
                    <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-6">
                        
                        {/* মেটা ইনফো কার্ড */}
                        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-black/30 backdrop-blur-md">
                            
                            {/* ক্রিয়েটর প্রোফাইল হেডার */}
                            <Link
                                href={isOwnProfile ? "/profile" : `/profile/${post?.email}`}
                                className="flex items-center gap-4 group/user pb-6 mb-6 border-b border-zinc-100 dark:border-zinc-800/60"
                            >
                                <Avatar className="h-12 w-12 sm:h-14 sm:w-14 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 ring-2 ring-zinc-200 dark:ring-zinc-800 transition-all duration-500 ease-out group-hover/user:ring-zinc-950 dark:group-hover/user:ring-zinc-200">
                                    <Avatar.Image 
                                        src={post?.userImage || "/avatar.jpg"} 
                                        alt={post?.name || "Creator"}
                                        className="object-cover"
                                    />
                                    <Avatar.Fallback className="bg-zinc-950 text-white font-semibold">
                                        {post?.name?.charAt(0)?.toUpperCase() || "C"}
                                    </Avatar.Fallback>
                                </Avatar>

                                <div className="space-y-0.5">
                                    <h2 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover/user:text-zinc-600 dark:group-hover/user:text-zinc-400 transition duration-200">
                                        {post?.name || "Creative Talent"}
                                    </h2>
                                    <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 tracking-wide">
                                        Verified Network Asset
                                    </p>
                                </div>
                            </Link>

                            {/* প্রজেক্ট ডেসক্রিপশন */}
                            {post?.text && (
                                <div className="space-y-3">
                                    <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                                        Project Context
                                    </span>
                                    <p className="text-sm sm:text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-line font-normal">
                                        {post.text}
                                    </p>
                                </div>
                            )}

                            {/* প্রফেশনাল অ্যাকশন বাটন ম্যাট্রিক্স */}
                            <div className="mt-8 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="w-full flex items-center justify-center px-4 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 font-bold text-xs sm:text-sm tracking-wide transition duration-300 active:scale-[0.98] shadow-sm">
                                        Appreciate
                                    </button>
                                    <button className="w-full flex items-center justify-center px-4 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-bold text-xs sm:text-sm tracking-wide border border-zinc-200/40 dark:border-zinc-700/40 transition duration-300 active:scale-[0.98]">
                                        Share Asset
                                    </button>
                                </div>

                                <a
                                    href={downloadUrl}
                                    download={`${post?.name || "source"}-file.jpg`}
                                    className="w-full flex items-center justify-center px-4 py-3.5 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 dark:from-zinc-100 dark:to-zinc-200 dark:hover:from-zinc-200 dark:hover:to-zinc-300 text-white dark:text-zinc-950 font-bold text-xs sm:text-sm tracking-wide transition duration-300 text-center shadow-lg shadow-black/[0.03] dark:shadow-white/[0.02]"
                                >
                                    Download Source File
                                </a>
                            </div>

                        </div>
                    </div>

                </div>

                {/* 🗂️ MORE PROJECTS GRID - ULTRA MODERN GRID SYSTEM */}
                <section className="mt-24 lg:mt-32">
                    <div className="flex items-baseline justify-between mb-10 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-5">
                        <div className="space-y-1">
                            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                                Curator Portfolio Showcase
                            </h3>
                            <p className="text-xs text-zinc-400 dark:text-zinc-500">
                                Additional works indexed from {post?.name || "the artist"}
                            </p>
                        </div>
                        <span className="text-xs font-mono font-bold bg-zinc-100 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 px-3 py-1 rounded-md border border-zinc-200/40 dark:border-zinc-800">
                            INDEX: {userPosts?.length || 0}
                        </span>
                    </div>

                    {/* ৩ থেকে ৪ কলামের ডাইনামিক রেসপন্সিভ গ্রিড */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {userPosts?.map((item) => (
                            <Link
                                key={item._id}
                                href={`/post/${item._id}`}
                                className="group/card block space-y-3"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-zinc-800/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:shadow-[0_24px_48px_rgba(0,0,0,0.06)] dark:group-hover/card:shadow-black/50">
                                    <Image
                                        src={item.image}
                                        alt={item.text || "Portfolio node"}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:scale-105"
                                    />
                                    {/* কার্ডের ওপর ডার্ক গ্লেজ ওভারলে */}
                                    <div className="absolute inset-0 bg-black/[0.02] dark:bg-white/[0.01] pointer-events-none" />
                                </div>
                                
                                {/* কার্ডের নিচের মিনিমাল মেটা টেক্সট */}
                                {item.text && (
                                    <div className="px-1 transition-transform duration-300 group-hover/card:translate-x-1">
                                        <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 line-clamp-1 group-hover/card:text-zinc-900 dark:group-hover/card:text-zinc-100 transition">
                                            {item.text}
                                        </p>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default PostDetails;