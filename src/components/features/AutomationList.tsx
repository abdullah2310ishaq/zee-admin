"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface AutomationListProps {
  className?: string;
}

export function AutomationList({ className }: AutomationListProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <div className={cn("p-4 sm:p-6 lg:p-8", className)}>
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
        Post notifications
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <span className="text-3xl mr-4" aria-hidden>
              🔔
            </span>
            <div>
              <h3 className="font-medium text-gray-900">
                Post notifications for users
              </h3>
              <span
                className={cn(
                  "text-sm",
                  notificationsEnabled ? "text-green-600" : "text-gray-500"
                )}
              >
                {notificationsEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>

          <button
            onClick={() => setNotificationsEnabled((prev) => !prev)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer",
              notificationsEnabled ? "bg-green-500" : "bg-gray-300"
            )}
            aria-label="Toggle post notifications for users"
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                notificationsEnabled ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
