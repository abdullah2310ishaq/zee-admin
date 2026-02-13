export function PreviewSection() {
  return (
    <section
      className="rounded-2xl p-6 lg:p-8"
      style={{ background: "linear-gradient(180deg, #C21C15 0%, #4C50D5 100%)" }}
    >
      <h3 className="text-white font-semibold mb-4">Preview</h3>
      <div className="bg-white/95 rounded-xl p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-[280px]">
          <div className="w-full h-40 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
            <div className="text-6xl">✨</div>
          </div>
          <p className="text-center text-sm text-gray-600 mb-4">
            Compose something first to see the preview
          </p>
          <div className="flex justify-center">
            <button className="px-4 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium cursor-pointer">
              Try our template
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
