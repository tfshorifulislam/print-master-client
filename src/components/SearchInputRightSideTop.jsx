"use client";

import { useState } from "react";
import { BiSearch } from "react-icons/bi";

const SearchInputRightSideTop = () => {
  const [value, setValue] = useState("");

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        
        <BiSearch size={18} className="text-zinc-500" />

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
          className="w-full bg-transparent outline-none text-sm text-zinc-900 dark:text-white"
        />
      </div>
    </div>
  );
};

export default SearchInputRightSideTop;