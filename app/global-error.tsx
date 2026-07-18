"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-[#070B14] min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 px-6">
          <div className="text-6xl">⚠️</div>
          <h1 className="text-3xl font-bold text-white font-poppins">Something went wrong</h1>
          <p className="text-gray-400 font-inter max-w-md mx-auto">
            An unexpected error occurred. Please try again or contact support if the issue persists.
          </p>
          {error?.digest && (
            <p className="text-xs text-gray-600">Error ID: {error.digest}</p>
          )}
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-[#16B6B0] text-black font-bold rounded-xl hover:opacity-90 transition"
            >
              Try Again
            </button>
            <a
              href="/"
              className="px-6 py-3 border border-[#1b2335] text-white font-semibold rounded-xl hover:bg-[#0F1624] transition"
            >
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
