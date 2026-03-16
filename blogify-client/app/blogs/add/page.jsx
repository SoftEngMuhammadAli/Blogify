import { fetchCategories } from "@/lib/blog-api";
import Link from "next/link";
import BlogForm from "@/app/components/blogs/BlogForm";

const AddBlogPage = async () => {
  const categories = await fetchCategories();

  return <BlogForm mode="create" categories={categories.data} />;
};

export default AddBlogPage;
