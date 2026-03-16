import Category from "./Category";

const Categories = ({ categories, activeCategory }) => {
  console.log("categories=========", categories);
  console.log("activeCategory=========", activeCategory);
  console.log("categories.data values=======", categories?.data);
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
