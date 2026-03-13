import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogCardProps {
  id: string;
  title: string;
  image?: string | null;
  description?: string | null;
}

const BlogCard = ({ id, title, image, description }: BlogCardProps) => {
  return (
    <Link href={`/blog/${id}`} className="block group">
      <article className="card relative overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src="/app-assets/vercel.svg"
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5 space-y-3">
          <h2 className="line-clamp-2 text-lg font-semibold text-zinc-900 transition group-hover:text-blue-600">
            {title}
          </h2>

          <p className="line-clamp-3 text-sm text-zinc-600">{description}</p>

          <div className="link-primary flex items-center pt-2">
            Read article
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              {"->"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
