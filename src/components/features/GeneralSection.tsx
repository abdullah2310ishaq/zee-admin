"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function GeneralSection() {
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-8">
      {/* Left Side - Section Header */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <h2 className="text-xl font-bold text-gray-900">General</h2>
          <button className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">
            <svg
              className="w-3 h-3 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <p className="text-sm text-gray-600">
          You can change your payment credentials here.
        </p>
      </div>

      {/* Right Side - Toggle Switches in Bordered Box */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        {/* Enable Face ID */}
        <div className="flex items-start justify-between">
          <div className="flex-1 mr-4">
            <h3 className="text-base font-medium text-gray-900 mb-1">
              Enable Face id
            </h3>
            <p className="text-sm text-gray-500">
              Face id will verification will be used everytime
            </p>
          </div>
          <button
            onClick={() => setFaceIdEnabled(!faceIdEnabled)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer flex-shrink-0",
              faceIdEnabled ? "bg-red-600" : "bg-gray-300"
            )}
            aria-label="Toggle Face ID"
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                faceIdEnabled ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>

        {/* Enable Notification */}
        <div className="flex items-start justify-between">
          <div className="flex-1 mr-4">
            <h3 className="text-base font-medium text-gray-900 mb-1">
              Enable Notification
            </h3>
            <p className="text-sm text-gray-500">
              You will be notified when a payment has been made.
            </p>
          </div>
          <button
            onClick={() => setNotificationEnabled(!notificationEnabled)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer flex-shrink-0",
              notificationEnabled ? "bg-red-600" : "bg-gray-300"
            )}
            aria-label="Toggle Notification"
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                notificationEnabled ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
