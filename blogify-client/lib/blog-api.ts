import { strapiClient } from "./strapi";

export interface CategoryItem {
  id: number;
  documentId: string;
  title: string;
}

export interface BlogListItem {
  id: number;
  documentId: string;
  title: string;
  description?: string | null;
  createdAt?: string;
  categories?: CategoryItem[];
}

export interface StrapiListResponse<T> {
  data: T[];
}

export interface StrapiSingleResponse<T> {
  data: T | null;
}

export interface BlogMutationPayload {
  title: string;
  description?: string;
  categoryIds?: string[];
}

function buildBlogMutationData(payload: BlogMutationPayload) {
  const categoryIds = Array.isArray(payload.categoryIds)
    ? payload.categoryIds
    : [];

  return {
    data: {
      title: payload.title.trim(),
      description: payload.description?.trim() ?? "",
      categories: categoryIds,
    },
  };
}

export async function fetchCategories() {
  const { data } =
    await strapiClient.get<StrapiListResponse<CategoryItem>>("/api/categories");
  return data;
}

export async function fetchBlogs(categoryDocumentId?: string) {
  const url = categoryDocumentId
    ? `/api/blogs?filters[categories][documentId][$eq]=${encodeURIComponent(
        categoryDocumentId,
      )}&populate=*`
    : "/api/blogs?populate=*";

  const { data } =
    await strapiClient.get<StrapiListResponse<BlogListItem>>(url);
  return data;
}

export async function fetchBlogById(id: string) {
  const { data } = await strapiClient.get<StrapiSingleResponse<BlogListItem>>(
    `/api/blogs/${id}?populate=*`,
  );
  return data.data;
}

export async function createBlog(payload: BlogMutationPayload) {
  const { data } = await strapiClient.post<StrapiSingleResponse<BlogListItem>>(
    "/api/blogs",
    buildBlogMutationData(payload),
  );
  return data.data;
}

export async function updateBlog(id: string, payload: BlogMutationPayload) {
  const { data } = await strapiClient.put<StrapiSingleResponse<BlogListItem>>(
    `/api/blogs/${id}`,
    buildBlogMutationData(payload),
  );
  return data.data;
}

export async function deleteBlog(id: string) {
  await strapiClient.delete(`/api/blogs/${id}`);
}
