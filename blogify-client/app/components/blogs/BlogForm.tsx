"use client";

import { CategoryItem } from "@/lib/blog-api";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

interface BlogFormProps {
  mode: "create" | "update";
  blogId?: string;
  categories: CategoryItem[];
  initialValues?: {
    title: string;
    description: string;
    categoryIds: string[];
  };
}

const BlogForm = ({
  mode,
  blogId,
  categories,
  initialValues,
}: BlogFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialValues?.categoryIds ?? [],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const heading = useMemo(
    () => (mode === "create" ? "Add Blog" : "Update Blog"),
    [mode],
  );

  function toggleCategory(documentId: string) {
    setSelectedCategories((prev) =>
      prev.includes(documentId)
        ? prev.filter((item) => item !== documentId)
        : [...prev, documentId],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const payload = {
        title,
        description,
        categoryIds: selectedCategories,
      };

      if (mode === "create") {
        await axios.post("/api/blogs", payload);
      } else {
        await axios.put(`/api/blogs/${blogId}`, payload);
      }

      router.push("/blogs/manage");
      router.refresh();
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        setError(
          (requestError.response?.data as { error?: string } | undefined)
            ?.error || "Failed to save blog.",
        );
      } else {
        setError("Failed to save blog.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">{heading}</h1>
        <Link href="/blogs/manage" className="link-primary">
          Back to Manage Blogs
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-semibold">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="input-field"
            placeholder="Write a title"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-semibold">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={8}
            className="input-field"
            placeholder="Write blog content"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold">Categories</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
                style={{ borderColor: "var(--border)" }}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.documentId)}
                  onChange={() => toggleCategory(category.documentId)}
                />
                <span>{category.title}</span>
              </label>
            ))}
          </div>
        </div>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <div className="flex gap-3">
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting
              ? "Saving..."
              : mode === "create"
                ? "Create Blog"
                : "Update Blog"}
          </button>

          <Link href="/blogs/manage" className="btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
