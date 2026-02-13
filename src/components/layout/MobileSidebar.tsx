"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SIDEBAR_GRADIENT } from "@/constants/colors";
import { MAIN_MENU_ITEMS, HELP_CENTER } from "@/constants/menu";
import { Button } from "@/components/ui/Button";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function MobileSidebar({
  isOpen,
  onClose,
  className,
}: MobileSidebarProps) {
  const pathname = usePathname();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest("[data-mobile-sidebar]")) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent body scroll
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" />
      )}

      {/* Sidebar */}
      <div
        data-mobile-sidebar
        className={cn(
          "fixed top-0 left-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className
        )}
        style={{ background: SIDEBAR_GRADIENT }}
      >
        <div className="flex flex-col h-full px-6 py-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
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
          </button>

          {/* Logo Section */}
          <div className="flex flex-col items-center mb-12">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-gray-800">Z</span>
            </div>
            <span className="text-white text-lg font-medium">BUDDY</span>
          </div>

          {/* Create New Project Button */}
          <Button
            variant="primary"
            className="w-full mb-8 bg-white text-red-600 hover:bg-gray-100 font-medium cursor-pointer"
          >
            <span className="mr-2">+</span>
            Create new project
          </Button>

          {/* Navigation Menu */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {MAIN_MENU_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href || "/"}
                      onClick={onClose}
                      className={cn(
                        "w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors cursor-pointer",
                        isActive
                          ? "bg-white/20 text-red-100"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <div className="mr-3 w-6 h-6 flex items-center justify-center">
                        {item.icon === "dashboard" && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="7"
                              height="7"
                              fill="#22c55e"
                            />
                            <rect
                              x="14"
                              y="3"
                              width="7"
                              height="7"
                              fill="#ef4444"
                            />
                            <rect
                              x="3"
                              y="14"
                              width="7"
                              height="7"
                              fill="#3b82f6"
                            />
                            <rect
                              x="14"
                              y="14"
                              width="7"
                              height="7"
                              fill="#f59e0b"
                            />
                          </svg>
                        )}
                        {item.icon === "content" && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
                              fill="#d97706"
                            />
                            <path
                              d="M8,12H16V14H8V12M8,16H13V18H8V16Z"
                              fill="#fbbf24"
                            />
                          </svg>
                        )}
                        {item.icon === "business" && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              d="M12,7V3H2V21H22V7H12M6,19H4V17H6V19M6,15H4V13H6V15M6,11H4V9H6V11M6,7H4V5H6V7M10,19H8V17H10V19M10,15H8V13H10V15M10,11H8V9H10V11M10,7H8V5H10V7M20,19H12V17H14V15H12V13H14V11H12V9H20V19M18,11H16V13H18V11M18,15H16V17H18V15Z"
                              fill="#3b82f6"
                            />
                          </svg>
                        )}
                        {item.icon === "users" && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              d="M16,4C18.21,4 20,5.79 20,8C20,10.21 18.21,12 16,12C13.79,12 12,10.21 12,8C12,5.79 13.79,4 16,4M16,14C20.42,14 24,15.79 24,18V20H8V18C8,15.79 11.58,14 16,14M8,4C10.21,4 12,5.79 12,8C12,10.21 10.21,12 8,12C5.79,12 4,10.21 4,8C4,5.79 5.79,4 8,4M8,14C12.42,14 16,15.79 16,18V20H0V18C0,15.79 3.58,14 8,14Z"
                              fill="#6b7280"
                            />
                          </svg>
                        )}
                        {item.icon === "notification" && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              d="M12,22A2,2 0 0,0 14,20H10A2,2 0 0,0 12,22M18,16V11C18,7.93 16.36,5.36 13.5,4.68V4A1.5,1.5 0 0,0 12,2.5A1.5,1.5 0 0,0 10.5,4V4.68C7.63,5.36 6,7.92 6,11V16L4,18V19H20V18L18,16Z"
                              fill="#fbbf24"
                            />
                          </svg>
                        )}
                        {item.icon === "settings" && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
                              fill="#6b7280"
                            />
                          </svg>
                        )}
                      </div>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Help Center Section - Moved to very end */}
          <div className="mt-8">
            <div className="bg-red-600/20 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm">?</span>
                </div>
                <h3 className="text-white font-semibold text-sm">
                  {HELP_CENTER.title}
                </h3>
              </div>
              <p className="text-gray-300 text-xs mb-4 leading-relaxed">
                {HELP_CENTER.description}
              </p>
              <Button
                variant="primary"
                size="sm"
                className="w-full bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                {HELP_CENTER.buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
