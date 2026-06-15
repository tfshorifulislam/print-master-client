import { auth } from "@/lib/auth";
import axios from "axios";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@heroui/react";
import { FaBookmark, FaShareNodes, FaArrowDown } from "react-icons/fa6"; // প্রিমিয়াম আইকন

const PostDetails = async ({ params }) => {
    const { id } = await params;

    // Server side token fetch
    const token = await auth.api.getToken({
        headers: await headers()
    });

    // ১. সিঙ্গেল পোস্ট ফেচ
    const res = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/uploads/${id}`, {
        headers: {
            authorization: `Bearer ${token.token}`
        }
    });
    const post = res.data;

    // ২. সেশন ইউজার ফেচ (সার্ভার সাইড)
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;

    const isOwnProfile = user?.email === post?.email;

    // ৩. ক্রিয়েটরের অন্যান্য পোস্ট ফেচ
    const postsRes = await axios.get(`${process.env.NEXT_PUBLIC_AUTH_URL}/uploads`, {
        headers: {
            authorization: `Bearer ${token.token}`
        }
    });
    const userPosts = postsRes.data?.filter(
        (p) => p.email === post?.email
    );

    // 🎯 ক্লাউডিনারি ফোর্স ডাউনলোড ইউআরএল কনভার্ট লজিক
    let downloadUrl = post?.image;
    if (downloadUrl && downloadUrl.includes("res.cloudinary.com")) {
        downloadUrl = downloadUrl.replace("/upload/", "/upload/fl_attachment/");
    }

    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300 antialiased">
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">

                {/* 🌟 MAIN SHOWCASE PANEL */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white dark:bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.03)] dark:shadow-black/50 overflow-hidden">
                    
                    {/* LEFT SIDE: HERO IMAGE SPLIT (7 Columns) */}
                    <div className="lg:col-span-7 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center p-4 sm:p-6 lg:p-10 relative group/hero border-b lg:border-b-0 lg:border-r border-zinc-200/80 dark:border-zinc-800/80">
                        {post?.image && (
                            <div className="relative overflow-hidden rounded-xl bg-white dark:bg-zinc-900 shadow-sm transition-all duration-500 group-hover/hero:shadow-xl w-full">
                                <Image
                                    src={post.image}
                                    alt={post?.text || "post"}
                                    width={1200}
                                    height={1200}
                                    priority
                                    className="w-full h-auto max-h-[75vh] object-contain block transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/hero:scale-[1.015]"
                                />
                                <div className="absolute inset-0 bg-black/[0.01] dark:bg-white/[0.01] pointer-events-none" />
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDE: METADATA & INTERACTIONS (5 Columns) */}
                    <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-white/50 dark:bg-transparent">
                        
                        <div>
                            {/* Creator Identity Block */}
                            <Link
                                href={isOwnProfile ? "/profile" : `/profile/${post?.email}`}
                                className="group flex items-center gap-4 mb-8 pb-6 border-b border-zinc-100 dark:border-zinc-800/60"
                            >
                                <Avatar className="h-12 w-12 sm:h-14 sm:w-14 ring-2 ring-zinc-200/80 dark:ring-zinc-800 transition-all duration-300 group-hover:ring-black dark:group-hover:ring-white">
                                    <Avatar.Image
                                        src={post?.userImage || "/avatar.jpg"}
                                        alt={post?.name}
                                        className="object-cover"
                                    />
                                    <Avatar.Fallback className="bg-zinc-900 text-white font-bold text-lg">
                                        {post?.name?.charAt(0)?.toUpperCase() || "U"}
                                    </Avatar.Fallback>
                                </Avatar>

                                <div className="min-w-0">
                                    <h2 className="font-bold text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition duration-200 truncate tracking-tight">
                                        {post?.name}
                                    </h2>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-0.5">
                                        Independent Creator
                                    </p>
                                </div>
                            </Link>

                            {/* Description Block */}
                            {post?.text && (
                                <div className="rounded-xl bg-zinc-100/50 dark:bg-zinc-900/80 p-5 sm:p-6 border border-zinc-200/40 dark:border-zinc-800/80 shadow-inner">
                                    <p className="text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line tracking-wide">
                                        {post.text}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Premium Call to Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10 lg:mt-12">
                            
                            {/* Save Button (Primary Theme Accent) */}
                            <button className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black font-bold text-[14px] transition-all duration-300 active:scale-98 shadow-md shadow-black/5 dark:shadow-white/5">
                                <FaBookmark className="w-3.5 h-3.5" />
                                Save
                            </button>

                            {/* Share Button (Minimal Glass) */}
                            <button className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-[14px] border border-zinc-200/50 dark:border-zinc-700/50 transition-all duration-300 active:scale-98">
                                <FaShareNodes className="w-4 h-4" />
                                Share
                            </button>

                            {/* Download Button (Ghost Line/Solid Hybrid) */}
                            <a
                                href={downloadUrl}
                                download={`${post?.name || "download"}-post.jpg`}
                                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800/40 text-zinc-900 dark:text-zinc-100 font-bold text-[14px] border-2 border-zinc-200 dark:border-zinc-800 transition-all duration-300 active:scale-98"
                            >
                                <FaArrowDown className="w-3.5 h-3.5" />
                                Download
                            </a>
                        </div>

                    </div>
                </div>

                {/* 🗂️ "MORE FROM CREATOR" GRID SECTION */}
                <section className="mt-20">
                    
                    {/* Header */}
                    <div className="flex items-end justify-between mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                More from {post?.name || "this creator"}
                            </h3>
                        </div>
                        <span className="text-xs sm:text-sm font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-3 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800">
                            {userPosts?.length || 0} Projects
                        </span>
                    </div>

                    {/* Masonry Responsive Matrix Grid */}
                    {/* মোবাইল ও ট্যাবলেটে ২ কলাম, বড় স্ক্রিনে ৪ কলাম */}
                    <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
                        {userPosts?.map((item) => (
                            <Link
                                key={item._id}
                                href={`/post/${item._id}`}
                                className="block break-inside-avoid group/card"
                            >
                                <div className="relative overflow-hidden rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/card:translate-y-[-4px] group-hover/card:shadow-[0_20px_40px_rgba(0,0,0,0.06)] dark:group-hover/card:shadow-black/60">
                                    <div className="relative overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.text || "post"}
                                            width={600}
                                            height={800}
                                            className="w-full h-auto object-cover block transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/card:scale-[1.04]"
                                        />

                                        {/* Behance-inspired Content Blur Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex items-end p-4">
                                            {item.text && (
                                                <p className="text-white text-xs font-medium leading-snug line-clamp-2 transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                                                    {item.text}
                                                </p>
                                            )}
                                        </div>
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