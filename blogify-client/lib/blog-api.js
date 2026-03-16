import { strapiClient } from "./strapi";

function buildBlogMutationData(payload) {
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
  const { data } = await strapiClient.get("/api/categories");
  return data;
}

export async function fetchBlogs(categoryDocumentId) {
  const url = categoryDocumentId
    ? `/api/blogs?filters[categories][documentId][$eq]=${encodeURIComponent(
        categoryDocumentId,
      )}&populate=*`
    : "/api/blogs?populate=*";

  const { data } = await strapiClient.get(url);
  return data;
}

export async function fetchBlogById(id) {
  const { data } = await strapiClient.get(`/api/blogs/${id}?populate=*`);
  return data.data;
}

export async function createBlog(payload) {
  const { data } = await strapiClient.post("/api/blogs", buildBlogMutationData(payload));
  return data.data;
}

export async function updateBlog(id, payload) {
  const { data } = await strapiClient.put(`/api/blogs/${id}`, buildBlogMutationData(payload));
  return data.data;
}

export async function deleteBlog(id) {
  await strapiClient.delete(`/api/blogs/${id}`);
}
