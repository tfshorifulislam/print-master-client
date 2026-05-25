"use client";

export default function GlobalLoader({ fullScreen = true }) {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[9999]"
          : "flex items-center justify-center min-h-[200px]"
      }
    >
      <div className="relative w-16 h-16 flex items-center justify-center">

        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20" />

        {/* Spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />

        {/* Dot */}
        <div className="w-5 h-5 bg-emerald-500 rounded-full animate-pulse" />

      </div>
    </div>
  );
}