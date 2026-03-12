import React from "react";
import Category from "./Category";

const Categories = () => {
  return (
    <div className="flex gap-6 mb-8">
      <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-full cursor-pointer">
        <div className="flex gap-5">
          <div>
            <Category />
          </div>
          <div>
            <Category />
          </div>
          <div>
            <Category />
          </div>
          <div>
            <Category />
          </div>
          <div>
            <Category />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
