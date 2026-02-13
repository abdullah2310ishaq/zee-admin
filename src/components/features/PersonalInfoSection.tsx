"use client";

import { useState, useRef } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

export function PersonalInfoSection() {
  const [accountTypeOpen, setAccountTypeOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [selectedAccountType, setSelectedAccountType] = useState("Regular");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [phoneCode, setPhoneCode] = useState("+44");

  const accountTypeRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useClickOutside(accountTypeRef, () => setAccountTypeOpen(false));
  useClickOutside(languageRef, () => setLanguageOpen(false));

  const accountTypes = ["Regular", "Premium", "Enterprise"];
  const languages = ["English", "Spanish", "French", "German", "Japanese"];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Personal Info</h2>
        <p className="text-sm text-gray-600">
          You can change your personal information settings here.
        </p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                defaultValue="Azusa Nakano"
                className="w-full h-12 pl-10 pr-4 bg-white border-2 border-red-600 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm cursor-text"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Phone Number
            </label>
            <div className="flex items-center space-x-2">
              <div className="relative flex-shrink-0">
                <button
                  type="button"
                  className="flex items-center space-x-2 h-12 px-3 border-2 border-red-600 rounded-xl bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer"
                >
                  <span className="text-lg">🇬🇧</span>
                  <span className="text-sm font-medium">{phoneCode}</span>
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
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
              <div className="relative flex-1">
                <input
                  type="tel"
                  defaultValue="(123)456-9878"
                  className="w-full h-12 px-4 bg-white border-2 border-red-600 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm cursor-text"
                />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                <svg
                  className="w-5 h-5"
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
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full h-12 px-4 bg-white border-2 border-red-600 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm cursor-text"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                defaultValue="elementary221b@gmail.com"
                className="w-full h-12 pl-10 pr-4 bg-white border-2 border-red-600 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm cursor-text"
              />
            </div>
          </div>

          {/* Account Type */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Account Type
            </label>
            <div className="relative" ref={accountTypeRef}>
              <button
                type="button"
                onClick={() => setAccountTypeOpen(!accountTypeOpen)}
                className={cn(
                  "w-full h-12 px-4 border-2 border-red-600 rounded-xl bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer",
                  selectedAccountType ? "text-gray-900" : "text-gray-500"
                )}
              >
                <span>{selectedAccountType || "Select account type"}</span>
                <svg
                  className={cn(
                    "w-5 h-5 transition-transform",
                    accountTypeOpen ? "rotate-180" : "",
                    selectedAccountType ? "text-gray-900" : "text-gray-500"
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
              </button>
              {accountTypeOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-red-600 rounded-xl shadow-lg overflow-hidden">
                  {accountTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setSelectedAccountType(type);
                        setAccountTypeOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer text-sm transition-colors",
                        selectedAccountType === type
                          ? "bg-red-50 text-red-600 font-medium"
                          : "text-gray-700"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Languages
            </label>
            <div className="relative" ref={languageRef}>
              <button
                type="button"
                onClick={() => setLanguageOpen(!languageOpen)}
                className={cn(
                  "w-full h-12 px-4 border-2 border-red-600 rounded-xl bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-red-600 cursor-pointer",
                  selectedLanguage ? "text-gray-900" : "text-gray-500"
                )}
              >
                <span>{selectedLanguage || "Select language"}</span>
                <svg
                  className={cn(
                    "w-5 h-5 transition-transform",
                    languageOpen ? "rotate-180" : "",
                    selectedLanguage ? "text-gray-900" : "text-gray-500"
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
              </button>
              {languageOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-red-600 rounded-xl shadow-lg overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setLanguageOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-left hover:bg-gray-100 cursor-pointer text-sm transition-colors",
                        selectedLanguage === lang
                          ? "bg-red-50 text-red-600 font-medium"
                          : "text-gray-700"
                      )}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
