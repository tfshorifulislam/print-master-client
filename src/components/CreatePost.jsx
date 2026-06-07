"use client";

import { Button, Modal, Avatar } from "@heroui/react";

import axios from "axios";
import { useState, useRef } from "react";
import { FaImage, FaPaperPlane, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaCirclePlus, FaFeatherPointed } from "react-icons/fa6";
import { authClient, useSession } from "@/lib/auth-client";

export default function CreatePost({ isMobileFloating = false }) {
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;

    try {
      setLoading(true);
      let base64Image = "";
      if (file) {
        base64Image = await convertToBase64(file);
      }

      const postData = {
        text,
        email: user?.email,
        _id: user?._id,
        id: user?.id,
        name: user?.name,
        userImage: user?.image || "",
        image: base64Image,
      };

      const { data: token } = await authClient.token();
      
      await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/upload`, 
        postData, 
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token.token}`
          }
        }
      );
      
      reset();
      router.refresh();
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      {/* CONDITIONAL TRIGGER BASED ON SCREEN / DEVICE TYPE */}
      {isMobileFloating ? (
        /* 📱 Mobile Floating Button */
        <Button
          disabled={isPending}
          variant="none"
          className="h-14 w-14 min-w-0 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-lg flex items-center justify-center"
        >
          <FaFeatherPointed size={22} />
        </Button>
      ) : (
        /* 🖥️ Desktop / Tablet Sidebar Button */
        <Button
          disabled={isPending}
          variant="none"
          className="font-bold shadow-md bg-sky-500 hover:bg-sky-600 text-white rounded-full w-12 h-12 xl:w-11/12 xl:h-12 flex items-center justify-center transition duration-200"
        >
          {/* Tablet view show only icon */}
          <span className="xl:hidden"><FaFeatherPointed size={20} /></span>
          {/* Desktop view show full text */}
          <span className="hidden xl:inline text-[17px]">Post</span>
        </Button>
      )}

      <Modal.Backdrop className="bg-black/40 dark:bg-zinc-900/60" variant="blur">
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[600px] bg-white dark:bg-black p-4 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800">
            <Modal.Header className="flex justify-between items-center border-b pb-2 border-zinc-100 dark:border-zinc-800">
              <Modal.Heading className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Create Post
              </Modal.Heading>
            </Modal.Header>

            <form onSubmit={onSubmit}>
              <Modal.Body className="py-4 flex flex-col gap-3">
                <div className="flex gap-3 items-start">
                  <Avatar
                    src={user?.image || '/avatar.jpg'}
                    name={user?.name}
                    size="md"
                    className="h-10 w-10"
                  />
                  <div className="flex-1">
                    <textarea
                      placeholder="What is happening?!"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={4}
                      className="w-full text-xl p-1 bg-transparent border-none outline-none resize-none text-gray-900 dark:text-gray-100 placeholder-zinc-500 focus:ring-0"
                    />
                  </div>
                </div>

                {previewUrl && (
                  <div className="relative rounded-2xl overflow-hidden max-h-[300px] flex justify-center bg-gray-50 dark:bg-zinc-950 ml-12">
                    <img
                      src={previewUrl}
                      alt="Upload preview"
                      className="object-cover w-full h-full max-h-[300px]"
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

                <div className="flex justify-between items-center border-t border-zinc-100 dark:border-zinc-800 pt-3 ml-12">
                  <Button
                    type="button"
                    isIconOnly
                    variant="light"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sky-500 hover:bg-sky-50 dark:hover:bg-zinc-900 rounded-full"
                  >
                    <FaImage size={20} />
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      type="submit"
                      disabled={loading || (!text.trim() && !file)}
                      className="px-5 h-9 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold rounded-full text-sm transition"
                    >
                      {loading ? "Posting..." : "Post"}
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </form>
            <Modal.CloseTrigger onClick={reset} />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}