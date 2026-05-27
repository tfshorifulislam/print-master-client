import { auth } from "@/lib/auth";
import axios from "axios";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Avatar } from "@heroui/react";

const PostDetails = async ({ params }) => {
    const { id } = await params;

    // ১. সিঙ্গেল পোস্ট ফেচ
    const res = await axios.get(`${process.env.API_URL}/upload/${id}`);
    const post = res.data;

    // ২. সেশন ইউজার ফেচ (সার্ভার সাইড)
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;
    
    // 🎯 নিজের প্রোফাইল চেক করার কন্ডিশন
    const isOwnProfile = user?.email === post?.email;

    // ৩. ক্রিয়েটরের অন্যান্য পোস্ট ফেচ
    const postsRes = await axios.get(`${process.env.API_URL}/uploads`);
    const userPosts = postsRes.data?.filter(
        (p) => p.email === post?.email
    );

    // 🎯 ক্লাউডিনারি ফোর্স ডাউনলোড ইউআরএল কনভার্ট লজিক
    let downloadUrl = post?.image;
    if (downloadUrl && downloadUrl.includes("res.cloudinary.com")) {
        // ইউআরএল-এর 'upload/' অংশটিকে 'upload/fl_attachment/' দিয়ে রিপ্লেস করা হলো
        downloadUrl = downloadUrl.replace("/upload/", "/upload/fl_attachment/");
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="w-[95%] max-w-6xl mx-auto py-10">

                {/* MAIN SECTION */}
                <div className="grid md:grid-cols-2 gap-10">

                    {/* LEFT - IMAGE */}
                    <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-50">
                        {post?.image && (
                            <Image
                                src={post.image}
                                alt={post?.text || "post"}
                                width={900}
                                height={900}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        )}
                    </div>

                    {/* RIGHT - INFO */}
                    <div className="flex flex-col gap-6">
                        
                        {/* 🎯 প্রোফাইল লিংক কন্ডিশনাল */}
                        <Link 
                            href={isOwnProfile ? '/profile' : `/profile/${post?.email}`} 
                            className="flex items-center gap-3 group"
                        >
                            <Avatar size="lg">
                                <Avatar.Image src={post?.userImage} alt={post?.name} />
                                <Avatar.Fallback className="bg-linear-to-br from-blue-500 to-indigo-600 text-white font-bold">
                                    {post?.name?.charAt(0)?.toUpperCase() || "U"}
                                </Avatar.Fallback>
                            </Avatar>

                            <div>
                                <h2 className="font-semibold text-lg group-hover:underline">
                                    {post?.name || "User"}
                                </h2> 
                                <p className="text-xs text-gray-500">Creator</p>
                            </div>
                        </Link>

                        {/* TEXT */}
                        {post?.text && (
                            <p className="text-gray-700 text-sm leading-relaxed">{post.text}</p>
                        )}

                        {/* ACTIONS */}
                        <div className="flex gap-3 flex-wrap">
                            <button className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-red-700 cursor-pointer">
                                Save
                            </button>

                            <button className="bg-gray-100 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 cursor-pointer">
                                Share
                            </button>

                            <a
                                href={downloadUrl}
                                download={`${post?.name || 'download'}-post.jpg`}
                                className="bg-black text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 cursor-pointer text-center inline-block"
                            >
                                Download
                            </a>
                        </div>
                    </div>
                </div>

                {/* USER OTHER POSTS */}
                <div className="mt-16">
                    <h3 className="text-lg font-semibold mb-4">More from this creator</h3>
                    <div className="columns-2 sm:columns-3 md:columns-4 gap-4 space-y-4">
                        {userPosts?.map((item) => (
                            <Link key={item._id} href={`/post/${item._id}`} className="block break-inside-avoid">
                                <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                                    <Image
                                        src={item.image}
                                        alt={item.text || "post"}
                                        width={500}
                                        height={700}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PostDetails;