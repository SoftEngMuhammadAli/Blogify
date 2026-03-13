import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ id, title, image, description }: any) => {
  return (
    <Link href={`/blog/${id}`} className="block group">
      <article className="relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={image || "/app-assets/vercel.svg"}
            alt={title}
            fill
            className="object-fit transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition">
            {title}
          </h2>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
            {description}
          </p>

          {/* Read More */}
          <div className="flex items-center text-sm font-medium text-blue-600 pt-2">
            Read article
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
