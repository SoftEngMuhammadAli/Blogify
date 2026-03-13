import { fetchBlogs, fetchCategories } from "@/lib/blog-api";
import Link from "next/link";
import Blogs from "./components/blogs/Blogs";
import Categories from "./components/categories/Categories";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [categories, blogs] = await Promise.all([
    fetchCategories(),
    fetchBlogs(category),
  ]);

  return (
    <div className="space-y-10">
      <section className="card flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="page-title">Latest Blogs</h1>
          <p className="page-subtitle">
            Explore posts by category, or manage your content.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/blogs/manage" className="btn-secondary">
            Manage
          </Link>
          <Link href="/blogs/add" className="btn-primary">
            New Post
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section>
        <Categories categories={categories} activeCategory={category} />
      </section>

      {/* Blog List */}
      <section>
        <Blogs blogs={blogs} />
      </section>
    </div>
  );
}
