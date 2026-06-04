import { Link } from "react-router";

export default function Not_Found() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="max-w-xl text-center">
                <h1 className="text-8xl md:text-9xl font-extrabold text-red-600">
                    404
                </h1>

                <h2 className="mt-4 text-3xl font-bold text-gray-900">
                    Page Not Found
                </h2>

                <p className="mt-4 text-gray-600 text-lg">
                    Oops! The page you're looking for doesn't exist or may have been
                    moved.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                    >
                        Back to Home
                    </Link>

                    <Link
                        to="/news"
                        className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                    >
                        Browse News
                    </Link>
                </div>

                <div className="mt-10">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
                        alt="404 Illustration"
                        className="w-56 mx-auto opacity-90"
                    />
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    © {new Date().getFullYear()} Kemifilani News. All rights reserved.
                </p>
            </div>
        </div>
    );
}