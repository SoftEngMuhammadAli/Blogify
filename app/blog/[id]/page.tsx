import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <Link href={"/"}>Back</Link>
      <div className="relative w-full h-96 overflow-hidden rounded-lg mt-5">
        <Image
          className="w-full h-48 object-cover rounded-lg mb-2 border-b border-gray-600"
          src={"/app-assets/vercel.svg"}
          alt={"title"}
          width={500}
          height={500}
        />
      </div>
      <div className="mt-4">
        <h1 className="text-3xl font-semibold">Title</h1>
        <p className="text-gray-600 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quod.
        </p>
        <div className="flex gap-2 mt-2">
          <span className="text-sm">Author</span>
          <span className="text-sm">Date</span>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
