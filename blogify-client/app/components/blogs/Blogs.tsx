import React from "react";
import BlogCard from "./BlogCard";

const Blogs = ({ blogs }: any) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs?.data?.map((blog: any) => {
        return (
          <BlogCard
            key={blog.id}
            id={blog.documentId}
            title={blog.title}
            description={blog.description}
          />
        );
      })}
    </div>
  );
};

export default Blogs;
