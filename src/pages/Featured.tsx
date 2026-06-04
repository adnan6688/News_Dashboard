export default function Featured() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">

        {/* Icon */}
        <div className="text-5xl mb-4">🚀</div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800">
          Featured Section
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mt-2">
          This section will showcase top featured news and highlighted articles soon.
        </p>

        {/* Badge */}
        <div className="mt-4 inline-block px-3 py-1 text-sm bg-amber-100 text-amber-700 rounded-full">
          Coming Soon
        </div>

      </div>
    </div>
  );
}