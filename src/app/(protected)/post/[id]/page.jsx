import { auth } from "@/lib/auth";
import axios from "axios";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@heroui/react";

const PostDetails = async ({ params }) => {
    const { id } = await params;

    //server side get token
    const token = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token.token, 'token')

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

    // ৩. ক্রিয়েটরের অন্যান্য পোস্ট ফেচ
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
        <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 py-8">

                {/* Main Post */}
                <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 dark:shadow-black/40">

                    {/* Left Image */}
                    <div className="relative bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center p-5 lg:p-8">
                        {post?.image && (
                            <div className="overflow-hidden rounded-lg w-full">
                                <Image
                                    src={post.image}
                                    alt={post?.text || "post"}
                                    width={1200}
                                    height={1200}
                                    priority
                                    className="w-full h-auto object-contain  transition duration-500 hover:scale-[1.02]"
                                />
                            </div>
                        )}
                    </div>

                    {/* Right Content */}
                    <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10">

                        <div>

                            {/* Creator */}
                            <Link
                                href={isOwnProfile ? "/profile" : `/profile/${post?.email}`}
                                className="group flex items-center gap-4 mb-8"
                            >
                                <Avatar className="h-14 w-14 ring-2 ring-zinc-200 dark:ring-zinc-700 transition group-hover:ring-red-500">
                                    <Avatar.Image
                                        src={post?.userImage}
                                        alt={post?.name}
                                    />
                                    <Avatar.Fallback className="bg-red-600 text-white font-bold">
                                        {post?.name?.charAt(0)?.toUpperCase()}
                                    </Avatar.Fallback>
                                </Avatar>

                                <div>
                                    <h2 className="font-bold text-lg group-hover:text-red-500 transition">
                                        {post?.name}
                                    </h2>

                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                        Creator
                                    </p>
                                </div>
                            </Link>

                            {/* Description */}
                            {post?.text && (
                                <div className="rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/60 p-5 border border-zinc-200 dark:border-zinc-700">
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                                        {post.text}
                                    </p>
                                </div>
                            )}

                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-3 mt-10">

                            <button
                                className="
                        px-6 py-3 rounded-full
                        bg-red-600 hover:bg-red-700
                        text-white font-semibold
                        transition-all duration-200
                        active:scale-95
                        shadow-lg shadow-red-500/20
                    "
                            >
                                Save
                            </button>

                            <button
                                className="
                        px-6 py-3 rounded-full
                        bg-zinc-200 hover:bg-zinc-300
                        dark:bg-zinc-800 dark:hover:bg-zinc-700
                        font-semibold
                        transition-all duration-200
                        active:scale-95
                    "
                            >
                                Share
                            </button>

                            <a
                                href={downloadUrl}
                                download={`${post?.name || "download"}-post.jpg`}
                                className="
                        px-6 py-3 rounded-full
                        bg-black hover:bg-zinc-800
                        dark:bg-white dark:hover:bg-zinc-200
                        text-white dark:text-black
                        font-semibold
                        transition-all duration-200
                        active:scale-95
                    "
                            >
                                Download
                            </a>
                        </div>

                    </div>
                </div>

                {/* More Posts */}
                <section className="mt-16">

                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold">
                            More from this creator
                        </h3>

                        <span className="text-sm text-zinc-500">
                            {userPosts?.length || 0} Posts
                        </span>
                    </div>

                    <div className="columns-2 md:columns-4 gap-x-2 space-y-2">

                        {userPosts?.map((item) => (
                            <Link
                                key={item._id}
                                href={`/post/${item._id}`}
                                className="block break-inside-avoid group">
                                <div
                                    className="overflow-hidden rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl dark:hover:shadow-black/30 transition-all duration-300">
                                    <div className="relative overflow-hidden">

                                        <Image
                                            src={item.image}
                                            alt={item.text || "post"}
                                            width={600}
                                            height={800}
                                            className="w-full h-auto object-cover transition duration-500 group-hover:scale-105" />

                                        <div
                                            className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition">
                                            {item.text && (
                                                <div className="absolute bottom-4 left-4 right-4">
                                                    <p className="text-white text-sm line-clamp-3">
                                                        {item.text}
                                                    </p>
                                                </div>
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