import { cn } from "@/lib/utils";

export function LastEditedSection() {
  return (
    <section>
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Last Edited</h2>

      {/* Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          {/* Left Side - Content */}
          <div className="flex-1 mr-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Want to save time and increase your productivity?
            </h3>
          </div>

          {/* Right Side - Image and Action Button */}
          <div className="flex flex-col items-end space-y-4">
            {/* Action Button */}
            <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
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
            </button>

            {/* Image */}
            <div className="w-48 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <div className="text-4xl">💻</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
