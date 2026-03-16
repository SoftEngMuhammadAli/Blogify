import { createBlog, fetchBlogs } from "@/lib/blog-api";
import { getAxiosErrorMessage } from "@/lib/strapi";
import { NextResponse } from "next/server";

function sanitizeCategoryIds(value) {
  if (!Array.isArray(value)) return [];

  return value.filter(
    (item) => typeof item === "string" && item.trim().length > 0,
  );
}

function parseBlogPayload(body) {
  if (!body || typeof body !== "object") return null;

  const payload = body;

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

export async function GET(request) {
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

export async function POST(request) {
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


