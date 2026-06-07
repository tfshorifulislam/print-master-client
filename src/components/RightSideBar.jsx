"use client";

import React from "react";
import SearchInputRightSideTop from "./SearchInputRightSideTop";
import { useSession } from "@/lib/auth-client";
import IsPendingLoading from "./IsPendingLoading";
import { FaArrowRight, FaRegNewspaper } from "react-icons/fa6";

const RightSideBar = () => {
  const { isPending } = useSession();

  if (isPending) return <IsPendingLoading />;

  const jobItems = [
    {
      id: 1,
      title: "Frontend Designer Needed",
      meta: "Pixora Jobs · Remote · 2h ago",
    },
    {
      id: 2,
      title: "UI/UX Creative Artist",
      meta: "Pixora Jobs · Full-time · 1 day ago",
    },
    {
      id: 3,
      title: "Motion Graphics Expert",
      meta: "Pixora Jobs · Freelance · 3 days ago",
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-80 xl:w-[350px] h-screen sticky top-0 p-4 gap-5 overflow-y-auto no-scrollbar bg-white dark:bg-black text-black dark:text-white">

      {/* SEARCH */}
      <SearchInputRightSideTop />

      {/* CREATOR PROGRAM */}
      <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 p-5 space-y-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition cursor-pointer group">

        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-sky-500 tracking-widest uppercase">
            Creator Program
          </span>

          <div className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 group-hover:bg-sky-500 group-hover:text-white transition">
            <FaArrowRight size={12} />
          </div>
        </div>

        <h3 className="text-[16px] font-bold leading-snug group-hover:text-sky-500 transition">
          Earn money sharing your creativity on Pixora
        </h3>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          Upload designs, grow your audience, and earn monthly payouts.
        </p>
      </div>

      {/* JOBS */}
      <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 overflow-hidden">

        <div className="p-5 pb-2">
          <h2 className="text-lg font-bold">Pixora Jobs</h2>
        </div>

        <div>
          {jobItems.map((job) => (
            <div
              key={job.id}
              className="px-5 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 cursor-pointer transition"
            >
              <p className="font-semibold text-[14px] group-hover:text-sky-500">
                {job.title}
              </p>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {job.meta}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full text-left px-5 py-4 text-sky-500 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition">
          Show all jobs
        </button>
      </div>

      {/* NEWS */}
      <div className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 p-5 space-y-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition cursor-pointer">

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sky-500 text-xs font-bold uppercase tracking-widest">
            <FaRegNewspaper size={14} />
            Pixora News
          </div>

          <FaArrowRight size={12} className="text-zinc-500" />
        </div>

        <p className="text-sm font-semibold">
          Latest updates, creator stories & announcements
        </p>

        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Stay updated with what’s happening inside Pixora
        </span>
      </div>

      {/* FOOTER */}
      <div className="mt-auto pt-4 text-[11px] text-zinc-500 text-center space-y-2">
        <div>© 2026 Pixora</div>
        <div className="flex justify-center gap-4 text-[10px]">
          <span className="hover:underline cursor-pointer">Terms</span>
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Cookies</span>
        </div>
      </div>

    </aside>
  );
};

export default RightSideBar;