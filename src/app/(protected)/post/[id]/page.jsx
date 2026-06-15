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
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505]">
                <p className="text-zinc-400 text-sm font-light tracking-widest animate-pulse">LOADING WORK...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 antialiased selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
            
            {/* 🎥 CINEMATIC HERO WORKSPACE */}
            <div className="w-full max-w-5xl mx-auto px-4 pt-8 pb-24 sm:pt-12 sm:pb-32">
                
                {/* BACK BUTTON / MINI HEADER */}
                <div className="mb-8 flex items-center justify-between">
                    <Link 
                        href="/" 
                        className="text-xs font-medium tracking-widest uppercase text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                        ← Back to Gallery
                    </Link>
                    <span className="text-xs font-mono text-zinc-400">
                        ID: {id.slice(-6)}
                    </span>
                </div>

                {/* 🖼️ MASTERPIECE VIEWER (ফুল ও অরিজিনাল সাইজ ফোকাস) */}
                <div className="relative w-full rounded-3xl overflow-hidden bg-zinc-50 dark:bg-[#0a0a0c] p-2 sm:p-6 flex items-center justify-center transition-all duration-700 shadow-[0_30px_100px_rgba(0,0,0,0.04)] dark:shadow-black/40">
                    {post?.image && (
                        <Image
                            src={post.image}
                            alt={post?.text || "Showcase item"}
                            width={1600}
                            height={1200}
                            priority
                            className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
                        />
                    )}
                </div>

                {/* 🎛️ FLOATING GLASS CONTROL BAR & INFO (নিচে এক লাইনে মডার্ন লেআউট) */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start px-2">
                    
                    {/* বাম পাশ: ক্রিয়েটর এবং ডেসক্রিপশন (7 Columns) */}
                    <div className="md:col-span-7 space-y-6">
                        
                        {/* ক্রিয়েটর ব্লক (বর্ডার ছাড়া একদম ক্লিন) */}
                        <Link
                            href={isOwnProfile ? "/profile" : `/profile/${post?.email}`}
                            className="flex items-center gap-3.5 group"
                        >
                            <Avatar className="h-11 w-11 ring-1 ring-zinc-200 dark:ring-zinc-800 group-hover:scale-105 transition-transform duration-300">
                                <Avatar.Image src={post?.userImage || "/avatar.jpg"} className="object-cover" />
                                <Avatar.Fallback className="bg-black text-white text-sm font-bold">
                                    {post?.name?.charAt(0)}
                                </Avatar.Fallback>
                            </Avatar>
                            <div>
                                <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:opacity-70 transition">
                                    {post?.name || "Anonymous Artist"}
                                </h2>
                                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-light">
                                    Posted Work
                                </p>
                            </div>
                        </Link>

                        {/* ডেসক্রিপশন (কোনো ভারী বক্স নেই, জাস্ট ক্লিন মিনিমালিস্ট প্যারাগ্রাফ) */}
                        {post?.text && (
                            <p className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-line font-light tracking-wide max-w-xl">
                                {post.text}
                            </p>
                        )}
                    </div>

                    {/* ডান পাশ: প্রিমিয়াম ও স্লীক অ্যাকশন বাটন প্যানেল (5 Columns) */}
                    <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col gap-3 w-full md:justify-end">
                        
                        <div className="grid grid-cols-2 gap-3 w-full">
                            {/* Save বাটন */}
                            <button className="flex-1 px-5 py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black font-semibold text-xs tracking-wider uppercase transition-all active:scale-95 shadow-sm">
                                Save
                            </button>

                            {/* Share বাটন */}
                            <button className="flex-1 px-5 py-3.5 rounded-full bg-transparent text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 font-semibold text-xs tracking-wider uppercase border border-zinc-200 dark:border-zinc-800 transition-all active:scale-95">
                                Share
                            </button>
                        </div>

                        {/* Download বাটন (ফুল উইডথ লাইনার) */}
                        <a
                            href={downloadUrl}
                            download={`${post?.name || "artwork"}.jpg`}
                            className="w-full px-5 py-3.5 rounded-full bg-zinc-100 dark:bg-[#111115] hover:bg-zinc-200 dark:hover:bg-[#16161c] text-zinc-900 dark:text-zinc-100 font-semibold text-xs tracking-wider uppercase transition-all active:scale-95 text-center border border-zinc-200/40 dark:border-zinc-800/40"
                        >
                            Download Source File
                        </a>
                    </div>

                </div>

            </div>

            {/* 🗂️ CLEAN ART PORTFOLIO MATRIX (নিচের সেকশন) */}
            <div className="bg-zinc-50/50 dark:bg-[#0a0a0c]/40 border-t border-zinc-100 dark:border-zinc-900/60 w-full">
                <div className="max-w-5xl mx-auto px-4 py-20">
                    
                    {/* সেকশন হেডার */}
                    <div className="flex items-baseline justify-between mb-12">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                            More Creations
                        </h3>
                        <span className="text-xs font-mono text-zinc-400">
                            [{userPosts?.length || 0}]
                        </span>
                    </div>

                    {/* গ্রিড সিস্টেম: কোনো বর্ডার বা শ্যাডো নেই, জাস্ট ক্লিন ইমেজ ম্যাট্রিক্স */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8">
                        {userPosts?.map((item) => (
                            <Link
                                key={item._id}
                                href={`/post/${item._id}`}
                                className="group block space-y-3"
                            >
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                                    <Image
                                        src={item.image}
                                        alt={item.text || "Portfolio asset"}
                                        fill
                                        sizes="(max-width: 640px) 50vw, 33vw"
                                        className="object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03] group-hover:opacity-90 grayscale-[30%] group-hover:grayscale-0"
                                    />
                                </div>
                                {item.text && (
                                    <p className="text-xs font-light text-zinc-500 dark:text-zinc-400 truncate tracking-wide px-0.5 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                                        {item.text}
                                    </p>
                                )}
                            </Link>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    );
};

export default PostDetails;