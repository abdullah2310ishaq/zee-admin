import { cn } from "@/lib/utils";

export function ScheduledSection() {
  const scheduledItems = [
    {
      id: 1,
      title: "We're excited to announce the launch of our AI-pow...",
      image: "📱",
    },
    {
      id: 2,
      title: "Social media is a jungle out there",
      image: "📱",
    },
  ];

  return (
    <section>
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Scheduled</h2>

      {/* Scheduled Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scheduledItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start space-x-4">
              {/* Image */}
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="text-2xl">{item.image}</div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-3">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
