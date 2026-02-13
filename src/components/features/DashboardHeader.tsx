"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/useClickOutside";

interface DashboardHeaderProps {
  className?: string;
  onMenuToggle?: () => void;
}

export function DashboardHeader({
  className,
  onMenuToggle,
}: DashboardHeaderProps) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(userDropdownRef, () => setIsUserDropdownOpen(false));

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 sm:p-6 lg:p-8 border-b border-gray-200 gap-4 lg:gap-0",
        className
      )}
    >
      {/* Left Side - Title and Mobile Menu */}
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
      </div>

      {/* Right Side - Search and User Profile */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full lg:w-auto space-y-4 sm:space-y-0 sm:space-x-6">
        {/* Search Bar */}
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full h-12 px-4 bg-red-600 text-white placeholder:text-white/80 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-text"
          />
        </div>

        {/* User Profile */}
        <div className="relative" ref={userDropdownRef}>
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">AM</span>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <span className="text-gray-900 font-medium">Alex melan</span>
                <svg
                  className={cn(
                    "w-4 h-4 ml-2 text-red-500 transition-transform",
                    isUserDropdownOpen && "rotate-180"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-500">Product manager</span>
            </div>
          </button>

          {/* User Dropdown */}
          {isUserDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Help
              </a>
              <hr className="my-2" />
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Sign out
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
