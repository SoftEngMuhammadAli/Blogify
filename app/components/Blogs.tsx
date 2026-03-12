import React from "react";
import BlogCard from "./BlogCard";

const Blogs = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
      <BlogCard />
    </div>
  );
};

export default Blogs;
