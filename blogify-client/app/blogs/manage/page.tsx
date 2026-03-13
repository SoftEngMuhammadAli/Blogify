import { fetchBlogs } from "@/lib/blog-api";
import Link from "next/link";

const ManageBlogsPage = async () => {
  const blogs = await fetchBlogs();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="page-title">Manage Blogs</h1>
          <p className="page-subtitle">Add, edit, or delete posts.</p>
        </div>

        <div className="flex gap-2">
          <Link href="/" className="btn-primary">
            Home
          </Link>
          <Link href="/blogs/add" className="btn-primary">
            Add Blog
          </Link>
          <Link href="/" className="btn-secondary">
            Back Home
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {blogs.data.length === 0 ? (
          <p className="page-subtitle">No blogs found.</p>
        ) : (
          blogs.data.map((blog) => (
            <article key={blog.id} className="card space-y-3">
              <h2 className="text-lg font-semibold">{blog.title}</h2>
              <p className="line-clamp-2 text-sm text-zinc-600">
                {blog.description || "No description"}
              </p>

              <div className="flex gap-3">
                <Link
                  href={`/blog/${blog.documentId}`}
                  className="link-primary"
                >
                  View
                </Link>
                <Link
                  href={`/blogs/${blog.documentId}/edit`}
                  className="text-sm text-amber-600 hover:underline"
                >
                  Edit
                </Link>
                <Link
                  href={`/blogs/${blog.documentId}/delete`}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </Link>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageBlogsPage;
