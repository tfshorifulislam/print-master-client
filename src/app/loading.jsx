"use client";

import { Skeleton } from "@heroui/react";

const PinterestLoader = () => {
    return (
        <div
            className="w-[95%] mx-auto mt-6 grid grid-cols-2 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-3">

                    <Skeleton
                        className={`
                            w-full rounded-2xl
                            ${index % 3 === 0
                                ? "h-[260px]"
                                : index % 2 === 0
                                    ? "h-[320px]"
                                    : "h-[220px]"
                            }
                        `}
                    />

                    {/* optional text skeleton */}
                    <Skeleton className="h-3 w-3/4 rounded-lg" />
                    <Skeleton className="h-3 w-1/2 rounded-lg" />

                </div>
            ))}
        </div>
    );
};

export default PinterestLoader;