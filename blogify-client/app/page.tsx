import Blogs from "./components/Blogs";
import Categories from "./components/Categories";

async function fetchCategories() {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  };

  const res = await fetch(
    `${process.env.STRAPI_API_TOKEN}/api/categories`,
    options,
  );
  const data = await res.json();
  return data;
}

export default function Home() {
  return (
    <div className="space-y-10">
      {/* Categories */}
      <section>
        <Categories />
      </section>

      {/* Blog List */}
      <section>
        <Blogs />
      </section>
    </div>
  );
}
