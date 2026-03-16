import Link from "next/link";

const Category = ({ id, title, active }) => {
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
