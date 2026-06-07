import React from "react";
import Link from "next/link";

const LogoCenter = () => {
  return (
    <header 
      className="w-full sticky top-0 z-50 select-none bg-white/[0.15] dark:bg-black/[0.02] backdrop-blur-[4px] border-b border-zinc-200/40 dark:border-white/[0.08] shadow-[inset_0_-1px_1px_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.01)]"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-center pb-3 px-4">

        <Link
          href="/"
          className="group flex items-center gap-1 select-none transition-transform active:scale-95"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <span className="text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors duration-200">
              Pixo
            </span>
            <span className="text-blue-500 group-hover:text-blue-400 transition-colors duration-200">
              ra
            </span>
          </h1>
        </Link>

      </div>
    </header>
  );
};

export default LogoCenter;