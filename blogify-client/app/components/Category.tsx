"use client";

import React from "react";

interface CategoryProps {
  title: string;
}

const Category: React.FC<CategoryProps> = ({ title }) => {
  return (
    <button
      className="whitespace-nowrap px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 
      bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 
      text-sm font-medium transition"
    >
      {title}
    </button>
  );
};

export default Category;
