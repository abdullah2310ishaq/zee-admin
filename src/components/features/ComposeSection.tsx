export function ComposeSection() {
  return (
    <section className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Notification Title</label>
          <input
            type="text"
            placeholder="Enter the Bussines name"
            className="w-full h-12 px-4 bg-white border-2 border-red-600 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Notification Body</label>
          <textarea
            placeholder="write Description"
            rows={7}
            className="w-full px-4 py-3 bg-white border-2 border-red-600 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 text-sm"
          />
        </div>
        <div className="pt-2 flex justify-end">
          <button className="w-auto h-12 px-6 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors cursor-pointer">
            Send Notifications
          </button>
        </div>
      </div>
    </section>
  );
}
