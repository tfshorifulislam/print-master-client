"use client";

import React from "react";
import SearchInputRightSideTop from "./SearchInputRightSideTop";
import { useSession } from "@/lib/auth-client";
import IsPendingLoading from "./IsPendingLoading";
import { FaArrowRight, FaRegNewspaper } from "react-icons/fa6";

const RightSideBar = () => {
  const { isPending } = useSession();

  if (isPending) {
    return <IsPendingLoading />;
  }

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
    <aside className="hidden lg:flex flex-col w-80 xl:w-[350px] h-screen sticky top-0 p-4 gap-4 overflow-y-auto no-scrollbar bg-white dark:bg-black text-black dark:text-white transition-colors duration-200">

      {/* 🔍 SEARCH INPUT */}
      <div className="pb-2">
        <SearchInputRightSideTop />
      </div>

      {/* 💰 CARD 1 */}
      <div className="rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col gap-2.5 group cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:border-sky-500/50 dark:hover:border-sky-500/30 transition duration-200">
        <div className="flex justify-between items-center">
          <span className="text-sky-500 dark:text-sky-400 text-xs font-bold tracking-widest uppercase">
            Creator Program
          </span>
          <div className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 group-hover:bg-sky-500 group-hover:text-white transition duration-200 shrink-0">
            <FaArrowRight size={12} />
          </div>
        </div>

        <h3 className="text-[17px] font-extrabold tracking-tight leading-snug group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
          Earn money sharing your creativity on Pixora
        </h3>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
          Join thousands of global artists. Upload high-quality designs, grow your audience, and receive guaranteed monthly revenue payouts.
        </p>
      </div>

      {/* 💼 CARD 2 */}
      <div className="rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
        <h2 className="text-xl font-bold px-5 pt-5 pb-2 tracking-tight">Pixora Jobs</h2>

        <div className="flex flex-col">
          {jobItems.map((job) => (
            <div
              key={job.id}
              className="px-5 py-3.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 cursor-pointer group transition duration-200"
            >
              <p className="font-bold text-[15px] tracking-tight group-hover:text-sky-500 transition-colors duration-200">
                {job.title}
              </p>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1 inline-block">
                {job.meta}
              </span>
            </div>
          ))}
        </div>

        <button className="w-full text-left px-5 py-4 text-sky-500 dark:text-sky-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 font-bold text-[14px] transition border-t border-zinc-100 dark:border-zinc-800/50">
          Show all jobs
        </button>
      </div>

      {/* 📰 CARD 3: PIXORA NEWS */}
      <div className="rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 flex flex-col gap-3 group cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-500 dark:text-sky-400 font-bold text-xs uppercase tracking-widest">
            <FaRegNewspaper size={14} />
            Pixora News
          </div>

          <FaArrowRight
            size={12}
            className="text-zinc-500 group-hover:text-sky-500 transition"
          />
        </div>

        <p className="text-sm font-semibold leading-snug group-hover:text-sky-500 transition-colors">
          Latest updates, creator stories & platform announcements
        </p>

        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Stay updated with what’s happening inside Pixora
        </span>
      </div>

      {/* 📝 FOOTER */}
      <div className="mt-auto pt-6 text-[11px] text-zinc-500 dark:text-zinc-400 text-center space-y-1 select-none font-medium">
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