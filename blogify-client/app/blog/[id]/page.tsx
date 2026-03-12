import Image from "next/image";
import Link from "next/link";
import React from "react";

async function fetchBlogById(id: string) {
  try {
    const res = await fetch(
      `http://127.0.0.1:1337/api/blogs/${id}?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error("Status:", res.status);
      throw new Error("Failed to fetch blog");
    }

    return await res.json();
  } catch (error) {
    console.error("Blog fetch error:", error);
    return { data: null };
  }
}

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await fetchBlogById(id);

  const blogData = blog?.data;

  if (!blogData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Blog not found</h1>
        <Link
          href="/"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-sm text-blue-500 hover:underline mb-6 inline-block"
      >
        ← Back
      </Link>

      {/* Blog Content */}
      <div className="mt-6 space-y-3">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight">
          {blogData?.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>Author</span>
          <span>•</span>
          <span>
            {blogData?.createdAt
              ? new Date(blogData.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>

        <p className="text-gray-600 leading-relaxed mt-4">
          {blogData?.description || "No blog description available."}
        </p>
      </div>
    </div>
  );
};

export default BlogPage;
