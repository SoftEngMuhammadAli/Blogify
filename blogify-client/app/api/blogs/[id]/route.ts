import {
  BlogMutationPayload,
  deleteBlog,
  fetchBlogById,
  updateBlog,
} from "@/lib/blog-api";
import { getAxiosErrorMessage } from "@/lib/strapi";
import { NextRequest, NextResponse } from "next/server";

function sanitizeCategoryIds(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item): item is string => typeof item === "string" && item.trim().length > 0,
  );
}

function parseBlogPayload(body: unknown): BlogMutationPayload | null {
  if (!body || typeof body !== "object") return null;

  const payload = body as {
    title?: unknown;
    description?: unknown;
    categoryIds?: unknown;
  };

  if (typeof payload.title !== "string" || payload.title.trim().length === 0) {
    return null;
  }

  return {
    title: payload.title,
    description:
      typeof payload.description === "string" ? payload.description : "",
    categoryIds: sanitizeCategoryIds(payload.categoryIds),
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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
