import axios from "axios";

const strapiBaseUrl =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://127.0.0.1:1337";

const strapiToken = process.env.STRAPI_API_TOKEN;

export const strapiClient = axios.create({
  baseURL: strapiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    ...(strapiToken ? { Authorization: `Bearer ${strapiToken}` } : {}),
  },
});

export function getAxiosErrorMessage(
  error: unknown,
  fallback = "Request failed",
) {
  if (axios.isAxiosError(error)) {
    return (
      (error.response?.data as { error?: { message?: string } } | undefined)
        ?.error?.message ||
      error.response?.statusText ||
      error.message ||
      fallback
    );
  }

  if (error instanceof Error) return error.message;

  return fallback;
}
