"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const DUMMY_ITEMS: ContentItem[] = [
  {
    id: "1",
    title: "Want to save time and increase your productivity?",
    description:
      "To save time, increase productivity, and contribute to job growth, here are so...",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=280&fit=crop",
  },
  {
    id: "2",
    title: "Latest Product Launch ✨📢",
    description:
      "We're excited to announce the launch of our AI-pow...",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=280&fit=crop",
  },
];

export function UserGeneratedContentList() {
  const [processed, setProcessed] = useState<Set<string>>(new Set());

  const handleApprove = (id: string) => {
    setProcessed((prev) => new Set(prev).add(id));
  };

  const handleDecline = (id: string) => {
    setProcessed((prev) => new Set(prev).add(id));
  };

  const items = DUMMY_ITEMS.filter((item) => !processed.has(item.id));

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
        No pending user-generated content. All items have been reviewed.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900">User-generated content for approval</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "rounded-2xl border bg-white p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row gap-4 sm:gap-6",
              index === 0 ? "border-red-300" : "border-gray-200"
            )}
          >
            <div className="w-full sm:w-40 lg:w-48 shrink-0 rounded-xl overflow-hidden bg-gray-100 aspect-video sm:aspect-square sm:h-32 lg:h-36">
              <img
                src={item.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <h3 className="font-semibold text-gray-900 line-clamp-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
            </div>
            <div className="flex sm:flex-col gap-2 sm:justify-center shrink-0">
              <button
                type="button"
                onClick={() => handleDecline(item.id)}
                className="px-5 py-2.5 rounded-full border-2 border-red-600 text-red-600 font-medium text-sm hover:bg-red-50 transition-colors cursor-pointer"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => handleApprove(item.id)}
                className="px-5 py-2.5 rounded-full bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition-colors cursor-pointer"
              >
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
