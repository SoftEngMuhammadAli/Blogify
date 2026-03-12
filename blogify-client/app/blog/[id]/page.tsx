import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-blue-500 hover:underline mb-6 inline-block"
      >
        ← Back
      </Link>

      <div className="relative w-full h-[250px] md:h-[400px] rounded-xl overflow-hidden">
        <Image
          src="/app-assets/vercel.svg"
          alt="Blog Image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-6 space-y-3">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight">
          Title of Blog
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>Author</span>
          <span>•</span>
          <span>Date</span>
        </div>

        <p className="text-gray-600 leading-relaxed mt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          possimus distinctio veritatis optio recusandae facere consectetur
          maxime architecto laudantium. Similique.
        </p>
      </div>
    </div>
  );
};

export default BlogPage;
