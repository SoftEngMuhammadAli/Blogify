import { fetchCategories } from "@/lib/blog-api";
import { getAxiosErrorMessage } from "@/lib/strapi";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await fetchCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: getAxiosErrorMessage(error, "Failed to fetch categories") },
      { status: 500 },
    );
  }
}
