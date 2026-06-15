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
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="h-8 w-8 border-2 border-t-purple-500 border-zinc-800 rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#07070a] text-zinc-100 transition-colors duration-300">
            
            {/* 🌟 STREAMLINED FLOATING TOP NAVIGATION */}
            <header className="sticky top-0 z-50 bg-[#07070a]/80 backdrop-blur-md border-b border-zinc-900 px-4 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Explore Stream
                    </Link>
                    
                    {/* টপ বারে ইন্টারেক্টিভ অ্যাকশন বাটন */}
                    <div className="flex items-center gap-3">
                        <a
                            href={downloadUrl}
                            download={`${post?.name || "file"}.jpg`}
                            className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs tracking-wide transition shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                        >
                            Get Source
                        </a>
                    </div>
                </div>
            </header>

            {/* 🚀 MAIN HERO CONTENT: IMMERSIVE FULL-WIDTH VIEW */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                
                {/* ইমেজ কন্টেইনার - নিয়ন বর্ডার গ্লো এবং ডার্ক মোড ভাইব */}
                <div className="relative w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-900 shadow-[0_24px_60px_rgba(0,0,0,0.8)]">
                    {post?.image && (
                        <Image
                            src={post.image}
                            alt={post?.text || "Stream showcase"}
                            width={1920}
                            height={1085}
                            priority
                            className="w-full h-auto max-h-[80vh] object-contain mx-auto block"
                        />
                    )}
                </div>

                {/* 🏷️ META CONTEXT & ACTIONS BANNER */}
                <div className="mt-8 bg-zinc-900/40 border border-zinc-900/80 rounded-2xl p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                    
                    {/* বাম পাশ: ক্রিয়েটর ডাটা */}
                    <div className="flex items-center gap-4">
                        <Link href={isOwnProfile ? "/profile" : `/profile/${post?.email}`} className="relative group">
                            <Avatar className="h-12 w-12 ring-2 ring-purple-500/50 group-hover:ring-purple-400 transition-all">
                                <Avatar.Image src={post?.userImage || "/avatar.jpg"} className="object-cover" />
                                <Avatar.Fallback className="bg-zinc-800 text-zinc-200">{post?.name?.charAt(0)}</Avatar.Fallback>
                            </Avatar>
                            <span className="absolute -bottom-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span>
                        </Link>
                        
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-base font-bold tracking-tight text-white">{post?.name || "Anonymous"}</h2>
                                <span className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full font-mono">PRO</span>
                            </div>
                            {post?.text ? (
                                <p className="text-sm text-zinc-400 mt-1 line-clamp-2 max-w-xl font-light">{post.text}</p>
                            ) : (
                                <p className="text-xs text-zinc-500 mt-0.5">Active Studio Creator</p>
                            )}
                        </div>
                    </div>

                    {/* ডান পাশ: সোশ্যাল ইন্টারঅ্যাকশন বাটন */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-xs tracking-wide transition active:scale-95 border border-zinc-700/50">
                            Appreciate
                        </button>
                        <button className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white font-medium text-xs tracking-wide transition active:scale-95 border border-zinc-800">
                            Collect
                        </button>
                    </div>

                </div>

            </main>

            {/* 🗂️ PINTEREST-STYLE MASONRY STREAM (নিচের রিকমেন্ডেশন গ্যালারি) */}
            <section className="bg-[#0b0b0f] border-t border-zinc-900 mt-16 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    
                    {/* সেকশন টাইটেল */}
                    <div className="mb-10">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400">
                            More From This Space
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1">Discover other assets uploaded by the same creator account</p>
                    </div>

                    {/* ডাইনামিক Pinterest টাইপ কলাম সিস্টেম */}
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                        {userPosts?.map((item) => (
                            <Link
                                key={item._id}
                                href={`/post/${item._id}`}
                                className="break-inside-avoid block relative rounded-xl overflow-hidden group bg-zinc-950 border border-zinc-900/60 transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_10px_30px_rgba(147,51,234,0.1)]"
                            >
                                <div className="relative w-full h-auto">
                                    <img
                                        src={item.image}
                                        alt="Gallery Grid Node"
                                        className="w-full h-auto object-cover block transition duration-500 group-hover:scale-[1.02]"
                                        loading="lazy"
                                    />
                                    
                                    {/* স্মার্ট ওভারলে হভার ইফেক্ট */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                                        <p className="text-xs text-white font-medium truncate">{item.text || "View Project"}</p>
                                        <span className="text-[10px] text-purple-400 font-mono mt-1">Click to view →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* কোনো পোস্ট না থাকলে সেফটি মেসেজ */}
                    {userPosts?.length === 0 && (
                        <p className="text-zinc-600 text-xs text-center py-8 font-mono">NO MORE NODES FOUND IN THIS REPOSITORY</p>
                    )}

                </div>
            </section>

        </div>
    );
};

export default PostDetails;