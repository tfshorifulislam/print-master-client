"use client";

export default function GlobalLoader({ fullScreen = false }) {
  return (
    <div
      className={
        fullScreen
          ? "fixed inset-0 flex items-center justify-center bg-black/40 z-50"
          : "flex items-center justify-center"
      }
    >
      <div className="relative w-14 h-14">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20"></div>

        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>

        {/* Inner pulse dot */}
        <div className="absolute inset-3 bg-emerald-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}