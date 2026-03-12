import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogCardProps {
  title?: string;
  description?: string;
  image?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title = "Title of Blog",
  description = "Description of blog goes here. It explains what the article is about.",
  image = "/app-assets/vercel.svg",
}) => {
  return (
    <Link href={`/blog/1`}>
      <div className="group bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition duration-300 cursor-pointer">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        <div className="p-4 space-y-2">
          <h2 className="text-lg font-semibold line-clamp-2">{title}</h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
