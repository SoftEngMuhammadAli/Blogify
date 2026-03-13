import DeleteBlogForm from "@/app/components/blogs/DeleteBlogForm";
import { fetchBlogById } from "@/lib/blog-api";
import Link from "next/link";
import { notFound } from "next/navigation";

const DeleteBlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const blog = await fetchBlogById(id);

  if (!blog) notFound();

  return (
    <div className="space-y-6">
      <Link href="/blogs/manage" className="link-primary">
        Back to Manage Blogs
      </Link>
      <DeleteBlogForm blogId={id} title={blog.title} />
    </div>
  );
};

export default DeleteBlogPage;
