import BlogForm from "@/app/components/blogs/BlogForm";
import { fetchBlogById, fetchCategories } from "@/lib/blog-api";
import { notFound } from "next/navigation";

const EditBlogPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const [categories, blog] = await Promise.all([
    fetchCategories(),
    fetchBlogById(id),
  ]);

  if (!blog) notFound();

  return (
    <BlogForm
      mode="update"
      blogId={id}
      categories={categories.data}
      initialValues={{
        title: blog.title || "",
        description: blog.description || "",
        categoryIds:
          blog.categories?.map((category) => category.documentId) || [],
      }}
    />
  );
};

export default EditBlogPage;
