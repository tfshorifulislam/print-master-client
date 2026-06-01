"use client";

import { Button, Modal, Avatar } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import axios from "axios";
import { useState, useRef } from "react";
import { FaImage, FaPaperPlane, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaCirclePlus } from "react-icons/fa6";

export default function CreatePost() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const reset = () => {
    setText("");
    setFile(null);
    setPreviewUrl("");
  };

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreviewUrl("");
  };

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

      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload`, formData);
      console.log(res.data, "final data");

      reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Button
        disabled={isPending}
        variant="none"
        className="font-semibold shadow-md mt-7 bg-black dark:bg-white text-white dark:text-black rounded-lg w-9/12 flex items-center justify-center gap-3">
        <FaCirclePlus />
        Create a Post
      </Button>

      <Modal.Backdrop
        className="bg-black/60 dark:bg-zinc-900/80"
        variant="blur"
      >
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[500px] bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-2xl">
            <Modal.Header className="flex justify-between items-center border-b pb-3 border-gray-100 dark:border-zinc-800">
              <Modal.Heading className="text-xl font-bold text-gray-800 dark:text-gray-100">
                Create Post
              </Modal.Heading>
            </Modal.Header>

            <form onSubmit={onSubmit}>
              <Modal.Body className="py-4 flex flex-col gap-4">
                {/* User Info */}
                <div className="flex items-center gap-3">
                  <Avatar
                    src={user?.image || "/avatar.jpg"}
                    name={user?.name}
                    size="md"
                    className="border-2 border-primary"
                  />
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                      {user?.name || "Guest User"}
                    </h4>
                    <p className="text-xs text-gray-500">Posting publicly</p>
                  </div>
                </div>

                {/* Standard HTML Textarea with Tailwind - Zero Import Errors */}
                <textarea
                  placeholder="What's on your mind?..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  className="w-full text-base p-3 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800 outline-none resize-none text-gray-800 dark:text-gray-200 focus:border-blue-500 dark:focus:border-blue-500 placeholder-gray-400"
                />

                {/* Image Preview */}
                {previewUrl && (
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 dark:border-zinc-800 max-h-[250px] flex justify-center bg-gray-50 dark:bg-zinc-950">
                    <img
                      src={previewUrl}
                      alt="Upload preview"
                      className="object-cover w-full h-full max-h-[250px]"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1.5 bg-black/70 text-white rounded-full hover:bg-black transition-colors"
                    >
                      <FaTimes size={14} />
                    </button>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />

                {/* Actions Bar */}
                <div className="flex justify-between items-center border border-gray-200 dark:border-zinc-800 rounded-lg p-2 mt-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 pl-2">
                    Add to your post
                  </span>
                  <Button
                    type="button"
                    isIconOnly
                    variant="light"
                    color="success"
                    onClick={() => fileInputRef.current?.click()}
                    title="Add Image"
                  >
                    <FaImage size={20} className="text-green-500" />
                  </Button>
                </div>
              </Modal.Body>

              <Modal.Footer className="pt-3 border-t border-gray-100 dark:border-zinc-800 gap-2">
                <Button
                  slot="close"
                  variant="light"
                  onClick={reset}
                  className="font-medium"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  isLoading={loading}
                  disabled={loading || (!text.trim() && !file)}
                  endContent={!loading && <FaPaperPlane className="text-xs" />}
                  className="px-6 font-semibold"
                >
                  {loading ? "Posting..." : "Post"}
                </Button>
              </Modal.Footer>
            </form>
            <Modal.CloseTrigger onClick={reset} />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}