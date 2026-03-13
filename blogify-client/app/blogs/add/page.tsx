import BlogForm from "@/app/components/blogs/BlogForm";
import { fetchCategories } from "@/lib/blog-api";

const AddBlogPage = async () => {
  const categories = await fetchCategories();

  return <BlogForm mode="create" categories={categories.data} />;
};

export default AddBlogPage;
