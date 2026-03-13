import { BlogMutationPayload, createBlog, fetchBlogs } from "@/lib/blog-api";
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

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category") || undefined;
    const blogs = await fetchBlogs(category);
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json(
      { error: getAxiosErrorMessage(error, "Failed to fetch blogs") },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = parseBlogPayload(body);

    if (!payload) {
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 },
      );
    }

    const createdBlog = await createBlog(payload);
    return NextResponse.json({ data: createdBlog }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: getAxiosErrorMessage(error, "Failed to create blog") },
      { status: 500 },
    );
  }
}
