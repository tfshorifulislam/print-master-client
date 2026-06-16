

import { auth } from "@/lib/auth";
import axios from "axios";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@heroui/react";

const PostDetails = async ({ params }) => {
    const { id } = await params;

    const token = await auth.api.getToken({
        headers: await headers()
    });

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

    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;

    const isOwnProfile = user && post && user.email === post.email;

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

    let downloadUrl = post?.image || "#";
    if (downloadUrl && downloadUrl.includes("res.cloudinary.com")) {
        downloadUrl = downloadUrl.replace("/upload/", "/upload/fl_attachment/");
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
                <div className="h-8 w-8 border-2 border-zinc-300 border-t-black dark:border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors">

            {/* HEADER */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/70 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">

                    <Link
                        href="/"
                        className="text-xs font-medium tracking-wide text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
                    >
                        ← Back to explore
                    </Link>

                    <a
                        href={downloadUrl}
                        download
                        className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black text-xs font-semibold hover:opacity-80 transition"
                    >
                        Download
                    </a>

                </div>
            </header>

            {/* MAIN */}
            <main className="max-w-6xl mx-auto px-4 py-10">

                {/* IMAGE */}
                <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 shadow-sm">
                    {post?.image && (
                        <Image
                            src={post.image}
                            alt={post?.text || "Post"}
                            width={1920}
                            height={1080}
                            priority
                            className="w-full max-h-[80vh] object-contain"
                        />
                    )}
                </div>

                {/* INFO CARD */}
                <div className="mt-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col md:flex-row justify-between gap-6">

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                        <Link href={isOwnProfile ? "/profile" : `/profile/${post?.email}`}>
                            <div className="relative">
                                <Avatar className="h-12 w-12 ring-1 ring-zinc-300 dark:ring-zinc-700">
                                    <Avatar.Image src={post?.userImage || "/avatar.jpg"} />
                                    <Avatar.Fallback>
                                        {post?.name?.charAt(0)}
                                    </Avatar.Fallback>
                                </Avatar>
                            </div>
                        </Link>

                        <div>
                            <h2 className="text-base font-semibold">
                                {post?.name || "Anonymous"}
                            </h2>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 max-w-xl">
                                {post?.text || "No description"}
                            </p>
                        </div>

                    </div>

                    {/* RIGHT BUTTONS */}
                    <div className="flex gap-3">

                        <button className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                            Like
                        </button>

                        <button className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black text-xs font-medium hover:opacity-80 transition">
                            Save
                        </button>

                    </div>

                </div>

            </main>

            {/* MORE POSTS */}
            <section className="border-t border-zinc-200 dark:border-zinc-800 py-14 bg-zinc-50 dark:bg-black">

                <div className="max-w-6xl mx-auto px-4">

                    <div className="mb-6">
                        <h3 className="text-sm font-semibold tracking-wide">
                            More from this creator
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1">
                            Explore other works
                        </p>
                    </div>

                    <div className="columns-1 sm:columns-2 md:columns-3 gap-5 space-y-5">

                        {userPosts?.map((item) => (
                            <Link
                                key={item._id}
                                href={`/post/${item._id}`}
                                className="block break-inside-avoid rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-md transition"
                            >
                                <img
                                    src={item.image}
                                    alt=""
                                    className="w-full object-cover hover:scale-[1.02] transition duration-300"
                                />

                                <div className="p-3">
                                    <p className="text-xs text-zinc-600 dark:text-zinc-300 truncate">
                                        {item.text || "Untitled"}
                                    </p>
                                </div>
                            </Link>
                        ))}

                    </div>

                    {userPosts?.length === 0 && (
                        <p className="text-center text-xs text-zinc-400 py-10">
                            No more posts
                        </p>
                    )}

                </div>

            </section>

        </div>
    );
};

export default PostDetails;