import React from "react";
import Category from "./Category";

const Categories = () => {
  const categories = [
    "Technology",
    "Programming",
    "Design",
    "AI",
    "Startups",
    "Business",
    "Tutorials",
  ];

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="flex gap-3 w-max">
        {categories.map((cat, index) => (
          <Category key={index} title={cat} />
        ))}
      </div>
    </div>
  );
};

export default Categories;
