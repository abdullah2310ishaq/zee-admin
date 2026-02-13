"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AutomationItem } from "@/types/dashboard";

interface AutomationListProps {
  automations: AutomationItem[];
  className?: string;
}

export function AutomationList({
  automations,
  className,
}: AutomationListProps) {
  const [automationStates, setAutomationStates] = useState<
    Record<string, boolean>
  >(
    automations.reduce(
      (acc, automation) => ({
        ...acc,
        [automation.id]: automation.status === "running",
      }),
      {}
    )
  );

  const toggleAutomation = (automationId: string) => {
    setAutomationStates((prev) => ({
      ...prev,
      [automationId]: !prev[automationId],
    }));
  };

  return (
    <div className={cn("p-4 sm:p-6 lg:p-8", className)}>
      {/* Section Title */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
        Push Notification Automations
      </h2>

      {/* Automation Items */}
      <div className="space-y-4">
        {automations.map((automation) => {
          const isRunning = automationStates[automation.id];

          return (
            <div
              key={automation.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                {/* Icon */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mr-4",
                    automation.iconColor
                  )}
                >
                  <span className="text-white text-sm">
                    {automation.icon === "linkedin" && "in"}
                    {automation.icon === "email" && "⚙️"}
                    {automation.icon === "scheduled" && "📅"}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-medium text-gray-900">
                    {automation.title}
                  </h3>
                  <span
                    className={cn(
                      "text-sm",
                      isRunning ? "text-green-600" : "text-gray-500"
                    )}
                  >
                    {isRunning ? "Running" : "Paused"}
                  </span>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => toggleAutomation(automation.id)}
                className={cn(
                  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer",
                  isRunning ? "bg-green-500" : "bg-gray-300"
                )}
                aria-label={`Toggle ${automation.title}`}
              >
                <span
                  className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    isRunning ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
