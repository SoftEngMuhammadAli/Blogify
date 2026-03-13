import React from "react";
import BlogCard from "./BlogCard";

interface BlogListItem {
  id: number;
  documentId: string;
  title: string;
  description?: string | null;
  image?: string | null;
}

interface BlogsProps {
  blogs?: {
    data?: BlogListItem[];
  };
}

const Blogs = ({ blogs }: BlogsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
