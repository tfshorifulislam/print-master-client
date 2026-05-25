"use client";

import { useState } from "react";
import { FaPlus, FaImage, FaPaperPlane, FaTimes } from "react-icons/fa";

export default function CreatePost() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const reset = () => {
    setText("");
    setFile(null);
    setOpen(false);
  };

  return (
    <>
      {/* Floating + Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
      >
        <FaPlus />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          
          {/* Modal Box */}
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-4 relative">

            {/* Close */}
            <button
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
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full min-h-[120px] resize-none outline-none text-sm bg-gray-50 border border-gray-200 rounded-xl p-3"
              />
            </div>

            {/* File Preview */}
            {file && (
              <div className="mt-3 text-xs text-gray-600">
                Selected: {file.name}
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
                  onChange={(e) => setFile(e.target.files?.[0])}
                />
              </label>

              {/* Post */}
              <button
                disabled={!text && !file}
                className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-xl text-sm disabled:opacity-40"
                onClick={() => {
                  console.log({ text, file });
                  reset();
                }}
              >
                <FaPaperPlane size={14} />
                Post
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  );
}