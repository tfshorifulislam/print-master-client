"use client";

export default function ImagePostLoading() {
  return (
    <div className="
        flex items-center gap-3
        px-4 py-2
        rounded-full
        bg-gray-100 dark:bg-white/10
        border border-gray-200 dark:border-white/10
        text-sm text-gray-600 dark:text-gray-300
        w-fit
    ">

      {/* Animated dots loader */}
      <div className="flex gap-1 items-center">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
      </div>

      {/* Text */}
      <span className="font-medium tracking-wide">
        Uploading image...
      </span>

    </div>
  );
}