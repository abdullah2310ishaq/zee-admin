"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/Input";
import { useClickOutside } from "@/hooks/useClickOutside";

interface UserGeneratedHeaderProps {
  onMenuToggle: () => void;
}

export function UserGeneratedHeader({
  onMenuToggle,
}: UserGeneratedHeaderProps) {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(userDropdownRef, () => setIsUserDropdownOpen(false));

  return (
    <header className="flex flex-col lg:flex-row lg:items-center justify-between p-6 lg:p-8 border-b border-gray-200 gap-4">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 border-b-2 border-gray-900 pb-1 w-fit">
        User Generated
      </h1>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:gap-6">
        <div className="w-full sm:w-64 lg:w-80">
          <Input
            placeholder="Search for anything..."
            className="w-full h-12 px-4 bg-red-600 text-white placeholder:text-white/80 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-red-500 cursor-text"
          />
        </div>

        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer self-start"
          aria-label="Menu"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="relative" ref={userDropdownRef}>
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className="flex items-center gap-3 hover:bg-gray-100 rounded-lg p-2 transition-colors cursor-pointer w-full sm:w-auto"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-sm">AM</span>
            </div>
            <div className="hidden md:block text-left">
              <p className="font-medium text-gray-900">Alex meian</p>
              <p className="text-sm text-gray-500">Product manager</p>
            </div>
            <svg
              className={`w-4 h-4 text-gray-500 shrink-0 ${isUserDropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Settings</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Sign out</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
