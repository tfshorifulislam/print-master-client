"use client";

import { authClient, useSession } from "@/lib/auth-client";
import axios from "axios";
import { useState } from "react";
import { FaPlus, FaImage, FaPaperPlane, FaTimes } from "react-icons/fa";
import ImagePostLoadingn from "./ImagePostLoader";
import { useRouter } from "next/navigation";


export default function CreatePost() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setText("");
    setFile(null);
    setOpen(false);
  };


  const { data: session, isPending } = authClient.useSession()
  console.log(session)
  const user = session?.user
  console.log(user)

  const router = useRouter()

  const handleOpen = () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setOpen(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const formData = new FormData();

      formData.append("text", text);
      formData.append("email", user?.email);
      formData.append("_id", user?._id);
      formData.append("id", user?.id);
      formData.append("name", user?.name);
      formData.append("userImage", user?.image || '');

      if (file) {
        formData.append("image", file);
      }

      const res = await axios.post("http://localhost:5000/upload",
        formData
      );

      console.log(res.data, "final data");

      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <>
      {/* Floating + Button */}
      <button
        disabled={isPending}
        onClick={handleOpen}
        className="cursor-pointer text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
      >
        <FaPlus />
      </button>

      {/* Modal */}
      {open && (
        <form
          onSubmit={onSubmit}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        // onClick={reset}
        >
          {/* Modal Box */}
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={reset}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <FaTimes />
            </button>

            {/* Header */}
            <h2 className="text-sm font-semibold mb-4">
              Create a Post
            </h2>

            {/* User + Textarea */}
            <div className="flex gap-3">
              <img
                src="https://i.pravatar.cc/150?img=5"
                className="w-10 h-10 rounded-full"
              />

              <textarea
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your Beautiful Day"
                className="w-full min-h-30 resize-none outline-none text-sm bg-gray-50 border border-gray-200 rounded-xl p-3"
              />
            </div>

            {/* File Preview */}
            {file && (
              <div className="mt-3">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-full max-h-96 object-cover rounded-xl border"
                />

              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between mt-4">
              {/* Upload */}
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-black text-sm">
                <FaImage />
                Photo

                <input
                  type="file"
                  hidden
                  name="image"
                  onChange={(e) => setFile(e.target.files?.[0])}
                />
              </label>

              {/* Post */}
              <button
                type="submit"
                disabled={!file || loading}
                className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-xl text-sm disabled:opacity-40"
              >
                {loading ? (<>
                  <ImagePostLoadingn />
                </>)
                  : (<>
                    <FaPaperPlane size={14} />Post
                  </>)}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}