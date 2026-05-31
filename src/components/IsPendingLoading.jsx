import React from "react";

const IsPendingLoading = () => {
  return (
    <div className="space-y-4 animate-pulse">
      
      {/* Post Card */}
      <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-zinc-300 dark:bg-zinc-800" />
          <div className="space-y-2">
            <div className="w-32 h-3 bg-zinc-300 dark:bg-zinc-800 rounded" />
            <div className="w-20 h-2 bg-zinc-200 dark:bg-zinc-900 rounded" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="w-5/6 h-3 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="w-4/6 h-3 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>

        {/* Image placeholder */}
        <div className="mt-4 w-full h-48 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />

        {/* Actions */}
        <div className="flex gap-4 mt-4">
          <div className="w-16 h-3 bg-zinc-300 dark:bg-zinc-800 rounded" />
          <div className="w-16 h-3 bg-zinc-300 dark:bg-zinc-800 rounded" />
          <div className="w-16 h-3 bg-zinc-300 dark:bg-zinc-800 rounded" />
        </div>

      </div>
    </div>
  );
};

export default IsPendingLoading;