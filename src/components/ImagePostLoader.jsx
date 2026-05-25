"use client";

export default function ImagePostLoadingn () {
  return (
    <div className="flex items-center gap-2">
      {/* Spinner */}
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

      <span>Uploading...</span>
    </div>
  );
}