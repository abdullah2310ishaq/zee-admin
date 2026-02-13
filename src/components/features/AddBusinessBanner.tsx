import { cn } from "@/lib/utils";

export function AddBusinessBanner() {
  return (
    <div
      className="relative rounded-2xl p-8 lg:p-12 overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #C21C15 0%, #4C50D5 100%)",
      }}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between relative z-10">
        {/* Left Side - Text Content */}
        <div className="flex-1 mb-6 lg:mb-0 lg:mr-8">
          <p className="text-white/80 text-sm mb-2">September 4, 2023</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Add New Bussiness
          </h2>
          <p className="text-white/90 text-base lg:text-lg">
            Always stay updated in your Admin portal
          </p>
        </div>

        {/* Right Side - Illustration Placeholder */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 lg:w-40 lg:h-40 bg-white/20 rounded-full flex items-center justify-center">
            <div className="text-6xl lg:text-7xl">👨‍💼</div>
          </div>
        </div>
      </div>
    </div>
  );
}
