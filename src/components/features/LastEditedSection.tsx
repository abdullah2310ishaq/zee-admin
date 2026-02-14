import Link from "next/link";
import { cn } from "@/lib/utils";

interface LastEditedSectionProps {
  className?: string;
}

export function LastEditedSection({ className }: LastEditedSectionProps) {
  return (
    <section className={cn("bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden", className)}>
      {/* Card header: title + action icon */}
      <div className="p-5 pb-0 flex items-start justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">Last Edited</h2>
        <Link
          href="#"
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer shrink-0"
          aria-label="View more"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M17 7H7M17 7V17"
            />
          </svg>
        </Link>
      </div>

      {/* Content: illustration + text */}
      <div className="p-5 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-36 h-28 sm:h-32 rounded-lg bg-gradient-to-br from-sky-100 via-amber-50 to-red-50 flex items-center justify-center shrink-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=160&fit=crop"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed flex-1">
          Want to save time and increase your productivity?
        </p>
      </div>
    </section>
  );
}
