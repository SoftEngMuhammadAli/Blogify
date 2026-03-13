"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteBlogFormProps {
  blogId: string;
  title: string;
}

const DeleteBlogForm = ({ blogId, title }: DeleteBlogFormProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setError("");
    setIsDeleting(true);

    try {
      await axios.delete(`/api/blogs/${blogId}`);
      router.push("/blogs/manage");
      router.refresh();
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        setError(
          (requestError.response?.data as { error?: string } | undefined)
            ?.error || "Failed to delete blog.",
        );
      } else {
        setError("Failed to delete blog.");
      }
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="page-title">Delete Blog</h1>

      <div className="danger-box">
        <p className="text-sm text-zinc-700">
          You are about to delete: <strong>{title}</strong>
        </p>
        <p className="mt-2 text-sm text-red-700">
          This action cannot be undone.
        </p>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex gap-3">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
        >
          {isDeleting ? "Deleting..." : "Delete Blog"}
        </button>
        <Link href="/blogs/manage" className="btn-secondary">
          Cancel
        </Link>
      </div>
    </div>
  );
};

export default DeleteBlogForm;
