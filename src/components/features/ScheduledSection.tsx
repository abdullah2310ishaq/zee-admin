import { cn } from "@/lib/utils";

const SCHEDULED_ITEMS = [
  {
    id: "1",
    title: "We're excited to announce the launch of our AI-pow...",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&h=80&fit=crop",
  },
  {
    id: "2",
    title: "Social media is a jungle out there",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=120&h=80&fit=crop",
  },
];

interface ScheduledSectionProps {
  className?: string;
}

export function ScheduledSection({ className }: ScheduledSectionProps) {
  return (
    <section
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden",
        className
      )}
    >
      {/* Card header */}
      <div className="p-5 pb-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">Scheduled</h2>
      </div>

      {/* Rows: each item in a separate row */}
      <div className="divide-y divide-gray-100">
        {SCHEDULED_ITEMS.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
              <img
                src={item.imageUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-700 line-clamp-2 flex-1 min-w-0">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
