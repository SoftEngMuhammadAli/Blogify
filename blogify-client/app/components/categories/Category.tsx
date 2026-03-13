import Link from "next/link";
import React from "react";

interface CategoryProps {
  id?: string;
  title: string;
  active: boolean;
}

const Category = ({ id, title, active }: CategoryProps) => {
  return (
    <Link
      href={id ? `/?category=${id}` : "/"}
      className={`chip ${active ? "chip-active" : ""}`}
    >
      {title}
    </Link>
  );
};

export default Category;
