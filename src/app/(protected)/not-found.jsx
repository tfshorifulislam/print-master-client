"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-950 text-center px-6">

      {/* Big 404 */}
      <h1 className="text-6xl font-bold text-neutral-900 dark:text-white">
        404
      </h1>

      {/* Message */}
      <p className="mt-4 text-neutral-500">
        Page not found. The page you’re looking for doesn’t exist.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="mt-6 px-6 py-3 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-80 transition"
      >
        Go Home
      </Link>

    </div>
  );
}