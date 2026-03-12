import Blogs from "./components/Blogs";
import Categories from "./components/Categories";

export default function Home() {
  return (
    <div>
      {/* Categories Section */}
      <section>
        <Categories />
      </section>

      {/* Blogs Section */}
      <section>
        <div>
          <Blogs />
        </div>
      </section>
    </div>
  );
}
