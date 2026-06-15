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

    // ২. সিঙ্গেল পোস্ট ডেটা ফেচ (টোকেন চেক সহ)
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

    // 🌟 [FIXED ERROR]: post ভেরিয়েবল অ্যাসাইন করার পর এখন ওনারশিপ চেক করা হচ্ছে
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

    // পোস্ট পাওয়া না গেলে সেফটি রিটার্ন
    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
                <p className="text-zinc-500">Post not found or failed to load.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-black dark:to-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 antialiased">
            <div className="max-w-6xl mx-auto px-4 py-10">

                {/* 🌟 HERO CARD PANEL */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden bg-white dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.04)] dark:shadow-black/50">

                    {/* LEFT CONTAINER: IMAGE DISPLAY (7 Columns) */}
                    <div className="lg:col-span-7 relative flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-zinc-100 dark:bg-zinc-950/40 border-b lg:border-b-0 lg:border-r border-zinc-200/60 dark:border-zinc-800/60 group/hero">
                        {post?.image && (
                            <div className="relative w-full overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-sm transition-all duration-500 group-hover/hero:shadow-xl">
                                <Image
                                    src={post.image}
                                    alt={post?.text || "Post artwork"}
                                    width={1200}
                                    height={1200}
                                    priority
                                    className="w-full h-auto max-h-[70vh] object-contain block transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/hero:scale-[1.015]"
                                />
                                <div className="absolute inset-0 bg-black/[0.01] dark:bg-white/[0.01] pointer-events-none" />
                            </div>
                        )}
                    </div>

                    {/* RIGHT CONTAINER: METADATA & ACTIONS (5 Columns) */}
                    <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                        
                        <div>
                            {/* Creator Information */}
                            <Link
                                href={isOwnProfile ? "/profile" : `/profile/${post?.email}`}
                                className="flex items-center gap-4 group/author border-b border-zinc-100 dark:border-zinc-800/60 pb-6 mb-6"
                            >
                                <Avatar className="h-14 w-14 ring-2 ring-zinc-200/80 dark:ring-zinc-800 transition-all duration-300 group-hover/author:ring-black dark:group-hover/author:ring-white">
                                    <Avatar.Image 
                                        src={post?.userImage || "/avatar.jpg"} 
                                        alt={post?.name || "User"}
                                        className="object-cover"
                                    />
                                    <Avatar.Fallback className="bg-zinc-900 text-white font-bold text-lg">
                                        {post?.name?.charAt(0)?.toUpperCase() || "U"}
                                    </Avatar.Fallback>
                                </Avatar>

                                <div>
                                    <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 group-hover/author:text-zinc-600 dark:group-hover/author:text-zinc-400 transition">
                                        {post?.name || "Anonymous Creator"}
                                    </h2>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-0.5">
                                        Independent Creator
                                    </p>
                                </div>
                            </Link>

                            {/* Description Block */}
                            {post?.text && (
                                <div className="p-5 rounded-2xl bg-zinc-100/60 dark:bg-zinc-800/40 border border-zinc-200/40 dark:border-zinc-700/40 backdrop-blur-md shadow-inner">
                                    <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line tracking-wide">
                                        {post.text}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Interactive Buttons Matrix */}
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button className="flex items-center justify-center px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black font-bold text-[14px] shadow-md shadow-black/5 dark:shadow-white/5 transition duration-200 active:scale-98">
                                Save
                            </button>

                            <button className="flex items-center justify-center px-6 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-[14px] border border-zinc-200/40 dark:border-zinc-700/40 transition duration-200 active:scale-98">
                                Share
                            </button>

                            <a
                                href={downloadUrl}
                                download={`${post?.name || "download"}-post.jpg`}
                                className="flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-[14px] shadow-lg shadow-emerald-500/10 transition duration-200 active:scale-98 hover:opacity-95"
                            >
                                Download
                            </a>
                        </div>

                    </div>
                </div>

                {/* 🗂️ MORE POSTS GRID SECTION */}
                <section className="mt-20">
                    <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                            More from {post?.name || "this creator"}
                        </h3>
                        <span className="text-xs sm:text-sm font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-3 py-1.5 rounded-full border border-zinc-200/40 dark:border-zinc-800">
                            {userPosts?.length} {userPosts?.length === 1 ? "project" : "projects"}
                        </span>
                    </div>

                    {/* Grid System: Mobile/Tablet 2 columns, Desktop 4 columns */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {userPosts?.map((item) => (
                            <Link
                                key={item._id}
                                href={`/post/${item._id}`}
                                className="group/card relative overflow-hidden rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:translate-y-[-4px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:hover:shadow-black/60"
                            >
                                <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.text || "Creator artwork"}
                                        fill
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                        className="object-cover group-hover/card:scale-105 transition duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                                    />
                                    
                                    {/* Glassmorphism Title Slider on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex items-end p-3 sm:p-4">
                                        {item.text && (
                                            <p className="text-white text-xs font-medium leading-snug line-clamp-2 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                                                {item.text}
                                              </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default PostDetails;