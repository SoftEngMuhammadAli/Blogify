import React from "react";
import Category from "./Category";

interface CategoryItem {
  id: number;
  documentId: string;
  title: string;
}

interface CategoriesProps {
  categories?: {
    data?: CategoryItem[];
  };
  activeCategory?: string;
}

const Categories = ({ categories, activeCategory }: CategoriesProps) => {
  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-3 w-max">
        <Category title="All" active={!activeCategory} />
        {categories?.data?.map((cat) => (
          <Category
            key={cat.id}
            id={cat.documentId}
            title={cat.title}
            active={activeCategory === cat.documentId}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
