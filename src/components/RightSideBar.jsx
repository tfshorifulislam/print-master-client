"use client";

import React from "react";
import SearchInputRightSideTop from "./SearchInputRightSideTop";

const RightSideBar = () => {
  return (
    <aside className="hidden lg:block sticky top-0 flex-col w-72 lg:w-80 h-screen p-4 gap-5">

      {/* SEARCH */}
      <SearchInputRightSideTop />

      {/* TITLE */}
      <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
        Sponsored
      </h2>

      {/* AD 1 */}
      <div className="rounded-lg p-4 min-h-40 flex items-center justify-center text-sm text-zinc-600 dark:text-zinc-400 hover:scale-[1.02] transition">
        Advertisement 1
      </div>

      {/* AD 2 */}
      <div className="rounded-lg p-4 min-h-40 flex items-center justify-center text-sm text-zinc-600 dark:text-zinc-400 hover:scale-[1.02] transition">
        Advertisement 2
      </div>

      {/* FOOTER */}
      <div className="mt-auto text-xs text-zinc-500 text-center">
        © 2026 Pixora
      </div>

    </aside>
  );
};

export default RightSideBar;