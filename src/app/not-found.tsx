import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-black text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-black text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, we couldnt find the page youre looking for.</p>
        <Link href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-900 to-red-600 text-white rounded-xl font-black hover:scale-105 transition-all">
          Return Home
        </Link>
      </div>
    </div>
  );
}
