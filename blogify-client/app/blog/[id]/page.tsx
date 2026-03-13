import { fetchBlogById } from "@/lib/blog-api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blogData = await fetchBlogById(id);

  if (!blogData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="page-title">Blog not found</h1>
        <Link href="/" className="link-primary mt-4 inline-block">
          {"<- Back to home"}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="link-primary mb-6 inline-block">
        {"<- Back"}
      </Link>

      <article className="card mt-3 space-y-3">
        <div className="relative h-48 w-full overflow-hidden rounded-xl">
          <Image
            src="/app-assets/vercel.svg"
            alt="title"
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-2xl font-bold leading-tight md:text-4xl">
          {blogData?.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-zinc-500">
          <span>Author</span>
          <span>&bull;</span>
          <span>
            {blogData.createdAt
              ? new Date(blogData.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>

        <p className="mt-4 leading-relaxed text-zinc-700">
          {blogData?.description || "No blog description available."}
        </p>
      </article>
    </div>
  );
};

export default BlogPage;
