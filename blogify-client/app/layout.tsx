import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blogify - (Next.Js & Strapi)",
  description: "A modern blog platform built with Next.js and Strapi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen">
          {/* <header className="sticky top-0 z-20 border-b border-blue-100/80 bg-white/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
              <Link href="/" className="text-lg font-black tracking-tight text-zinc-900">
                Blogify
              </Link>
              <nav className="flex items-center gap-2">
                <Link href="/" className="btn-secondary px-3 py-1.5 text-xs sm:text-sm">
                  Home
                </Link>
                <Link
                  href="/blogs/manage"
                  className="btn-primary px-3 py-1.5 text-xs sm:text-sm"
                >
                  Manage Blogs
                </Link>
              </nav>
            </div>
          </header> */}

          <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
