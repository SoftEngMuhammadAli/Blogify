import Link from "next/link";
import React from "react";

const Category = ({ id, title, active }: any) => {
  return (
    <Link
      href={id ? `/?category=${id}` : "/"}
      className={`whitespace-nowrap px-4 py-2 rounded-full border transition text-sm font-medium ${
        active
          ? "border-blue-600 bg-blue-600 "
          : "border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100"
      }`}
    >
      {title}
    </Link>
  );
};

export default Category;
