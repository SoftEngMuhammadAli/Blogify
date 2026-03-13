import Blogs from "./components/blogs/Blogs";
import Categories from "./components/categories/Categories";

async function fetchCategories() {
  try {
    const res = await fetch(`http://127.0.0.1:1337/api/categories`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch categories");

    return await res.json();
  } catch (error) {
    console.error("Categories fetch error:", error);
    return { data: [] };
  }
}

async function fetchBlogs(category?: string) {
  try {
    const url = category
      ? `http://127.0.0.1:1337/api/blogs?filters[categories][documentId][$eq]=${category}&populate=*`
      : `http://127.0.0.1:1337/api/blogs?populate=*`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch blogs");

    return await res.json();
  } catch (error) {
    console.error("Blogs fetch error:", error);
    return { data: [] };
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories = await fetchCategories();
  const blogs = await fetchBlogs(category);

  return (
    <div className="space-y-10">
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
