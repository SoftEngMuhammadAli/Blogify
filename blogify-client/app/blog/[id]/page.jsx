import { fetchBlogById } from "@/lib/blog-api";
import Image from "next/image";
import Link from "next/link";

const BlogPage = async ({ params }) => {
  const { id } = await params;
  const blogData = await fetchBlogById(id);

  if (!blogData) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-zinc-900">Blog not found</h1>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const description = blogData?.description?.trim() || "";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-block text-sm font-medium text-blue-600 transition hover:underline"
      >
        ← Back
      </Link>

      <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="relative h-56 w-full md:h-72">
          <Image
            src="/app-assets/vercel.svg"
            alt={blogData?.title || "Blog image"}
            fill
            className="object-cover"
          />
        </div>

        <div className="px-5 py-6 md:px-8 md:py-8 lg:px-10">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-zinc-900 md:text-4xl">
            {blogData?.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
            <span className="font-medium">Author</span>
            <span>•</span>
            <span>
              {blogData?.createdAt
                ? new Date(blogData.createdAt).toLocaleDateString()
                : ""}
            </span>
          </div>

          {description ? (
            <div className="mt-8">
              <div className="max-w-none text-[17px] leading-8 text-zinc-700 whitespace-pre-line break-words md:text-[18px]">
                {description}
              </div>
            </div>
          ) : (
            <p className="mt-8 text-base leading-7 text-zinc-500">
              No blog description available.
            </p>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogPage;
