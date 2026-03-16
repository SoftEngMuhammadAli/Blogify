import BlogCard from "./BlogCard";

const Blogs = ({ blogs }) => {
  console.log("blogs======", blogs);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs?.data?.length === 0 && (
        <p className="text-center text-zinc-500">No blogs found</p>
      )}
      {blogs?.data?.map((blog) => {
        return (
          <BlogCard
            key={blog.id}
            id={blog.documentId}
            title={blog.title}
            description={blog.description}
            image={blog.image}
          />
        );
      })}
    </div>
  );
};

export default Blogs;
