import Blogs from "./components/Blogs";
import Categories from "./components/Categories";

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
