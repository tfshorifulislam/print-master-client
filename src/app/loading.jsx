"use client";

import { Skeleton } from "@heroui/react";

const PinterestLoader = () => {
    return (
        <div
            className="
                w-[95%]
                mx-auto
                mt-6
                columns-2
                sm:columns-3
                md:columns-4
                lg:columns-5
                gap-4
            "
        >

            {
                Array.from({ length: 15 }).map((_, index) => (

                    <div
                        key={index}
                        className="mb-4 break-inside-avoid"
                    >

                        {/* Image Skeleton */}
                        <Skeleton
                            className={`
                                w-full
                                rounded-2xl
                                ${index % 3 === 0
                                    ? "h-[320px]"
                                    : index % 2 === 0
                                        ? "h-[420px]"
                                        : "h-[260px]"
                                }
                            `}
                        />

                    </div>

                ))
            }

        </div>
    );
};

export default PinterestLoader;