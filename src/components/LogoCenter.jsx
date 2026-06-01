import React from "react";
import Link from "next/link";

const LogoCenter = () => {
  return (
    <header className="w-full sticky top-0 z-50 border-b border-zinc-200/40 dark:border-zinc-800/60 bg-white/70 dark:bg-black/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-center py-3 px-4">

        <Link
          href="/"
          className="group flex items-center gap-1 select-none transition-transform active:scale-95"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="text-black dark:text-white group-hover:text-blue-500 transition-colors">
              Pixo
            </span>
            <span className="text-blue-500 group-hover:text-blue-400 transition-colors">
              ra
            </span>
          </h1>
        </Link>

      </div>
    </header>
  );
};

export default LogoCenter;