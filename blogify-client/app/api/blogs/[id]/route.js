import { deleteBlog, fetchBlogById, updateBlog } from "@/lib/blog-api";
import { getAxiosErrorMessage } from "@/lib/strapi";
import { NextResponse } from "next/server";

function sanitizeCategoryIds(value) {
  if (!Array.isArray(value)) return [];

  return value.filter((item) => typeof item === "string" && item.trim().length > 0);
}

function parseBlogPayload(body) {
  if (!body || typeof body !== "object") return null;

  if (typeof body.title !== "string" || body.title.trim().length === 0) {
    return null;
  }

  return {
    title: body.title,
    description: typeof body.description === "string" ? body.description : "",
    categoryIds: sanitizeCategoryIds(body.categoryIds),
  };
}

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    const blog = await fetchBlogById(id);
    return NextResponse.json({ data: blog });
  } catch (error) {
    return NextResponse.json(
      { error: getAxiosErrorMessage(error, "Failed to fetch blog") },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const payload = parseBlogPayload(body);

    if (!payload) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 },
      );
    }

    const updatedBlog = await updateBlog(id, payload);
    return NextResponse.json({ data: updatedBlog });
  } catch (error) {
    return NextResponse.json(
      { error: getAxiosErrorMessage(error, "Failed to update blog") },
      { status: 500 },
    );
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;
    await deleteBlog(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: getAxiosErrorMessage(error, "Failed to delete blog") },
      { status: 500 },
    );
  }
}
