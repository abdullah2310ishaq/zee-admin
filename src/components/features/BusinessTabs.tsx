"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { BusinessForm } from "./BusinessForm";
import { BusinessList } from "./BusinessList";

type Tab = "add" | "list";

export function BusinessTabs() {
  const [activeTab, setActiveTab] = useState<Tab>("add");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b-2 border-gray-200">
        <nav className="flex gap-4">
          <button
            onClick={() => setActiveTab("add")}
            className={cn(
              "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === "add"
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            Add Business
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={cn(
              "px-4 py-3 text-sm font-medium border-b-2 transition-colors",
              activeTab === "list"
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            )}
          >
            View All Businesses
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "add" && <BusinessForm />}
        {activeTab === "list" && <BusinessList />}
      </div>
    </div>
  );
}

