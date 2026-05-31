import React from "react";
import Link from "next/link";

const LogoCenter = () => {
  return (
    <div className="w-full flex items-center justify-center py-3 border rounded-b-lg border-zinc-200 dark:border-zinc-800">
      
      <Link href="/" className="select-none hover:scale-105 transition">
        <h1 className="text-3xl font-extrabold tracking-wide">
          <span className="text-black dark:text-white">Pixo</span>
          <span className="text-blue-500">ra</span>
        </h1>
      </Link>

    </div>
  );
};

export default LogoCenter;