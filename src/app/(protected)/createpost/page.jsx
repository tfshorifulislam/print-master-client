"use client";
import { useSession } from "@/lib/auth-client";
import axios from "axios";
import { useState } from "react";
import { FaImage, FaPaperPlane, FaTimes, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import IsPendingLoading from "@/components/IsPendingLoading";
import ImagePostLoading from "@/components/ImagePostLoader";

export default function CreatePost() {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const reset = () => {
        setText("");
        setFile(null);
    };

    const { data: session, isPending, error } = useSession();

    if (isPending) {
        return <IsPendingLoading />;
    }

    if (error || !session?.user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                <p className="text-sm text-red-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-red-100">
                    Please log in to create a post.
                </p>
            </div>
        );
    }

    const user = session?.user;

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() && !file) return;

        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("text", text);
            formData.append("email", user?.email);
            formData.append("_id", user?._id);
            formData.append("id", user?.id);
            formData.append("name", user?.name);
            formData.append("userImage", user?.image || "");

            if (file) {
                formData.append("image", file);
            }

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/upload`,
                formData
            );

            reset();
            router.refresh();
            router.push('/')
        } catch (error) {
            console.error("Post creation failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-xl p-6 relative transition-all"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                    <h2 className="text-lg font-semibold text-gray-800">Create a Post</h2>
                    {(text || file) && (
                        <button
                            type="button"
                            onClick={reset}
                            className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                {/* User Info & Textarea */}
                <div className="flex gap-4 items-start">
                    {user?.image ? (
                        <img
                            src={user.image}
                            alt={user.name || "User"}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100 shadow-sm"
                        />
                    ) : (
                        <FaUserCircle className="w-12 h-12 text-gray-400" />
                    )}

                    <div className="flex-1">
                        {user?.name && (
                            <p className="text-sm font-semibold text-gray-700 mb-1">
                                {user.name}
                            </p>
                        )}
                        <textarea
                            name="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="w-full min-h-[140px] resize-none outline-none text-sm text-gray-800 placeholder-gray-400 bg-gray-50 border border-gray-100 rounded-xl p-3 focus:ring-2 focus:ring-blue-200 focus:bg-white transition"
                        />
                    </div>
                </div>

                {/* File Preview */}
                {file && (
                    <div className="mt-5 relative rounded-2xl overflow-hidden border border-gray-200 group shadow-sm">
                        <img
                            src={URL.createObjectURL(file)}
                            alt="preview"
                            className="w-full max-h-[380px] object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => setFile(null)}
                            className="absolute top-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition-all shadow-md"
                        >
                            <FaTimes size={14} />
                        </button>
                    </div>
                )}

                {/* Bottom Actions */}
                <div className="border-t border-gray-100 mt-5 pt-4 flex items-center justify-between">
                    <label className="flex items-center gap-2 text-gray-600 cursor-pointer hover:bg-gray-100 px-4 py-2 rounded-xl transition text-sm font-medium">
                        <FaImage className="text-green-500 text-lg" />
                        <span>Photo</span>
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            name="image"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={!text.trim() || loading}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 shadow-md active:scale-[0.98]"
                    >
                        {loading ? (
                            <ImagePostLoading />
                        ) : (
                            <>
                                <FaPaperPlane size={13} />
                                <span>Post</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
