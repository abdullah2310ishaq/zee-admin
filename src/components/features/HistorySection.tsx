import { cn } from "@/lib/utils";

export function HistorySection() {
  const rows = [
    { name: "Typos Correction", date: "Sat, 20 Apr 2020", time: "12:00Pm", status: "Sent" as const, color: "bg-red-100" },
    { name: "Payment pending", date: "Fri, 19 Apr 2020", time: "12:00Pm", status: "Draft" as const, color: "bg-yellow-100" },
    { name: "Event", date: "Tue, 19 Apr 2020", time: "12:00Pm", status: "Pending" as const, color: "bg-pink-100" },
  ];

  return (
    <section className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">History</h2>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-64 h-10 pl-4 pr-10 rounded-lg bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="h-10 px-3 rounded-lg bg-gray-50 border border-gray-200 text-sm flex items-center space-x-2 cursor-pointer">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>10 May - 20 May</span>
          </button>
        </div>
      </div>

      {/* Header Bar */}
      <div className="grid grid-cols-4 gap-0 rounded-lg overflow-hidden">
        <div className="col-span-4 grid grid-cols-[2fr_1fr_1fr_1fr] bg-red-600 text-white text-sm font-medium">
          <div className="px-4 py-2">Name</div>
          <div className="px-4 py-2">Date</div>
          <div className="px-4 py-2">Time</div>
          <div className="px-4 py-2">Status</div>
        </div>
        {/* Rows */}
        {rows.map((r, i) => (
          <div key={i} className="col-span-4 grid grid-cols-[2fr_1fr_1fr_1fr] items-center bg-white border-b border-gray-100">
            <div className="px-4 py-3 flex items-center space-x-3">
              <span className={cn("w-6 h-6 rounded-full", r.color)} />
              <span className="text-sm text-gray-800">{r.name}</span>
            </div>
            <div className="px-4 py-3 text-sm text-gray-600">{r.date}</div>
            <div className="px-4 py-3 text-sm text-gray-600">{r.time}</div>
            <div className="px-4 py-3">
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  r.status === "Sent" && "bg-green-100 text-green-700",
                  r.status === "Draft" && "bg-green-50 text-green-600",
                  r.status === "Pending" && "bg-red-50 text-red-600"
                )}
              >
                {r.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
