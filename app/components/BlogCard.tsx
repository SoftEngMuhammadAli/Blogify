import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogCard = ({ title, description, image }: any) => {
  return (
    <div className="rounded-lg shadow-md p-4 mb-4 cursor-pointer overflow-hidden border border-gray-600 ">
      <Link href={`/blog/${1}`}>
        <div className="blog-image">
          <Image
            className="w-full h-48 object-fit rounded-lg mb-2 border-b border-gray-600"
            src={"/app-assets/vercel.svg"}
            alt={"title"}
            width={500}
            height={500}
          />
        </div>
        <div className="blog-content">
          <div className="blog-title">
            <h2 className="font-size-lg font-semibold mb-2 overflow-hidden text-ellipsis line-clamp-2">
              title of blog
            </h2>
          </div>
          <div className="blog-description overflow-hidden text-ellipsis line-clamp-5">
            description of blog
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogCard;
