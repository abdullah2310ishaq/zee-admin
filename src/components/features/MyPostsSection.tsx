"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PostItem {
  id: string;
  title: string;
  content: string;
  status: "published" | "scheduled";
  date: string;
  time: string;
  category: string;
  categoryColor: string;
  image: string;
}

export function MyPostsSection() {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  const posts: PostItem[] = [
    {
      id: "1",
      title: "Want to save time and increase your productivity?",
      content:
        "To save time, increase productivity, and contribute to job growth, here are so...",
      status: "published",
      date: "18/08 TUE",
      time: "10:15",
      category: "Knowledge",
      categoryColor: "bg-green-500",
      image: "📱",
    },
    {
      id: "2",
      title: "Productivity Tips for Remote Workers",
      content:
        "Working from home can be challenging. Here are some proven strategies to boost your productivity and maintain work-life balance...",
      status: "published",
      date: "17/08 MON",
      time: "14:30",
      category: "Tips",
      categoryColor: "bg-blue-500",
      image: "💻",
    },
    {
      id: "3",
      title: "Latest Product Launch ✨🚀",
      content:
        "We're excited to announce the launch of our AI-powered social media management editor! With this magic tool...",
      status: "scheduled",
      date: "19/08 WED",
      time: "12:30",
      category: "News",
      categoryColor: "bg-red-500",
      image: "🚀",
    },
  ];

  return (
    <section>
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Posts</h2>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredPost(post.id)}
            onMouseLeave={() => setHoveredPost(null)}
          >
            {/* Status Tag */}
            <div className="absolute top-4 right-4 z-10">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium text-white",
                  post.status === "published" ? "bg-green-500" : "bg-red-500"
                )}
              >
                {post.status === "published" ? "Published" : "Scheduled"}
              </span>
            </div>

            {/* Hover Overlay */}
            {hoveredPost === post.id && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex items-center justify-center">
                <div className="flex space-x-4">
                  {/* Edit */}
                  <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>

                  {/* Schedule/History */}
                  <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>

                  {/* Preview */}
                  <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
                      />
                    </svg>
                  </button>

                  {/* Delete */}
                  <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors cursor-pointer">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Post Content */}
            <div className="p-6">
              {/* Title */}
              <h3 className="text-sm font-medium text-gray-900 mb-4 line-clamp-3">
                {post.title}
              </h3>

              {/* Image */}
              <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="text-3xl">{post.image}</div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-xs text-gray-500">
                    {post.date} {post.time}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <div
                    className={cn("w-2 h-2 rounded-full", post.categoryColor)}
                  ></div>
                  <span className="text-xs text-gray-500">{post.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
