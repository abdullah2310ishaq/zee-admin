"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function UserProfileSection() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        {/* Left Side - Profile Info */}
        <div className="flex items-center space-x-6 mb-4 md:mb-0">
          {/* Profile Picture */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-2xl">AU</span>
          </div>

          {/* Name and Email */}
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h2 className="text-2xl font-bold text-gray-900">Azunyan U. Wu</h2>
              <span className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded">
                Pro
              </span>
            </div>
            <p className="text-gray-600">elementary221b@gmail.com</p>
          </div>
        </div>

        {/* Right Side - Action Buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
            className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => setIsEditing(false)}
            className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
